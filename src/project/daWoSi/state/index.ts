import { state全景监视, state设备管理 } from "./data";

class StateManager {
  historyList: never[];
  currentLogicInstance: StateLogic;
  constructor() {
      this.historyList = []; // 保存历史状态的数组
      this.currentLogicInstance = null; // 当前执行逻辑的实例
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
          // 销毁上一个状态的逻辑实例
          if (previousLogicInstance) {
              await previousLogicInstance.unmount();
          }
          // 创建当前状态的逻辑实例
          const newLogicInstance = new StateLogic(newState);
          await newLogicInstance.mount();
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
  constructor(state) {
      this.state = state;
      this.actionInstances = []; // 保存每个动作对应的实例
  }

  // 异步创建方法
  async mount() {
      for (const action of this.state) {
          const actionInstance = new ActionLogic(action);
          await actionInstance.mount();
          this.actionInstances.push(actionInstance);
      }
  }

  // 异步销毁方法
  async unmount() {
      for (const actionInstance of this.actionInstances) {
          await actionInstance.unmount();
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

// 示例用法
const stateManager = new StateManager();

// 示例：切换状态
stateManager.changeState(state全景监视)
  .then(result => console.log(result))
  .catch(error => console.error(error));

stateManager.changeState(state设备管理)
  .then(result => console.log(result))
  .catch(error => console.error(error));
console.log(stateManager.historyList);
