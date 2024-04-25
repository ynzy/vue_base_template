import { ChartManager } from "./ChartManager";
import { BusinessManager } from "./BusinessManager";
import { ButtonManager } from "./ButtonManager";
import { state全景监视, state设备管理 } from "./data";

export class StateManager {
  historyList: any[] = []; // 保存历史状态的数组
  currentLogicInstance: StateLogic | null = null;
  business: BusinessManager;
  button: ButtonManager;
  chart: ChartManager;
  constructor() {
    this.business = new BusinessManager()
    this.button = new ButtonManager()
    this.chart = new ChartManager()
  }

  // 推送一个状态到历史列表
  pushState(state) {
    this.historyList.push(state);
  }

  // 回退一个状态
  popState() {
    return this.historyList.pop();
  }

  // 改变状态并执行对应的逻辑
  async changeState(newState) {
    try {
      // 获取上一个状态的逻辑实例
      const previousLogicInstance = this.currentLogicInstance;
      //1、 如果当前状态有preserve，从上一个状态取出对应的数据作为当前状态数据(缓存数据)，上一个状态其他数据执行unmount
      const cachedData = [];
      for (const state of newState) {
        // 如果当前状态有preserve，从上一个状态取出对应的数据作为当前状态数据(缓存数据)
        if (state.statusKey === 'preserve' && previousLogicInstance) {
          const preservedChildren = state.children.map(child => {
            const state = previousLogicInstance.states.find(prevState => prevState.statusKey === child.statusKey);
            state.isCache = true;
            return state;
          });
          cachedData.push(...preservedChildren.filter(child => child));
        }
      }

      // 创建当前状态的逻辑实例
      const newLogicInstance = new StateLogic(this, newState);

      // 执行当前状态的创建方法
      await newLogicInstance.mount();

      //2、 将preserve的状态替换为（缓存数据）
      if (cachedData !== null) {
        newState = newState.filter(state => state.statusKey !== 'preserve'); // 移除当前状态中的 preserve 属性
        newState.push(...cachedData); // 将缓存数据添加到当前状态中
      }

      // 更新当前逻辑实例
      this.currentLogicInstance = newLogicInstance;
      // 将状态添加到历史列表
      this.pushState(newState);
      return '状态切换完成';
    } catch (error) {
      console.error('状态切换失败:', error);
      return '状态切换失败';
    }
  }
}

// 执行逻辑的类
class StateLogic {
  stateManager: any;
  states: any;
  actionInstances: any[] = []; // 保存每个动作对应的实例
  constructor(stateManager: any, states: any) {
    this.stateManager = stateManager
    this.states = states;
  }

  // 异步创建方法
  async mount(states:any) {
    states = states || this.states;
    for (const state of states) {
      const actIns = this.stateManager[state.statusKey]
      if (actIns) {
        actIns.mount(state)
        this.actionInstances.push(actIns)
      }
    }
  }

  // 异步销毁方法
  async unmount(states:any) {
    states = states || this.states;
    for (const state of this.states) {
      const actIns = this.stateManager[state.statusKey]
      if (actIns) {
        actIns.unmount(state)
      }
    }
  }
}

// 单个动作的执行逻辑类
class ActionLogic {
  constructor(action) {
    this.action = action;
  }

  // 异步创建方法
  async mount() {
    // 根据实际情况定义
    console.log(`Mounting logic for action: ${this.action.statusKey}`);
  }

  // 异步销毁方法
  async unmount() {
    // 根据实际情况定义
    console.log(`Unmounting logic for action: ${this.action.statusKey}`);
  }
}

export const test = async () => {
  // 示例用法
  const stateManager = new StateManager();

  // 示例：切换状态
  const res = await stateManager.changeState(state全景监视)
  console.log(res);


  const res1 = await stateManager.changeState(state设备管理)
  console.log(res1);
  console.log(stateManager.historyList);
}
