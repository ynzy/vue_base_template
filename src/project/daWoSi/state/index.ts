import { BusinessManager } from "./business"
import { ButtonManager } from "./button"
import { ViewManager } from "./view"

const state = {
  // 状态切换历史
  history: [],
  // 业务状态
  business: {
    activeName: '业务名字',
    mutex: [{
      // 互斥的状态key
      statusKey: 'button',
      activeName: '按钮名字'
    }]
  },
  // 图表状态
  chart: {
    activeName: '图表名字'
  },
  // 视图状态
  view: {
    activeName: '视图名字'
  },
  // 按钮状态
  button: {
    activeName: '按钮名字'
  },
  // 场景状态(2/3D转换)
  // 功能状态(定位)
  // action: {
  //   activeName: '定位'
  // },
  // // 事件状态（点击）
  // event: {
  //   activeName: '点击'
  // }
}

interface changeOptions {
  statusKey: string,
  activeName: string,
  params?: any
}

export class StateManager {
  business: BusinessManager
  button: ButtonManager
  view: ViewManager
  historyList:any[]=[]
  constructor() {
    this.business = new BusinessManager()
    this.button = new ButtonManager()
    this.view = new ViewManager()
  }
  // 推送一条状态
  pushState(data: changeOptions) {
    // 判断statusKey执行对应的类的change方法
    switch (data.statusKey) {
      case 'business':
        this.business.change(data.activeName,data.params)
        break;
      case 'button':
        this.button.change(data.activeName,data.params)
        break;
      case 'view':
        this.view.change(data.activeName,data.params)
        break;
      default:
        break;
    }
    // 保存当前切换状态到历史栈中
    this.historyList.push(data)
  }
  // 回退一个状态
  popState(){ 

  }
}

/**
 * 切换到全景监视业务
 * 切换到园区层级
 * 展示全景监视图表
 * 3D
 *  设置园区视角
 *  显示园区顶牌
 */
const state全景监视 = [
  {
    statusKey:'business',
    activeName:'全景监视',
  },
  {
    statusKey:'level',
    activeName:'campus',
  },
  {
    statusKey:'chart',
    activeName:'全景监视',
  },
  {
    statusKey:'3D',
    activeName:'设置视角',
  },
  {
    statusKey:'3D',
    activeName:'设置顶牌',
  },
]

/**
 * 设置按钮-设备管理
 * 
 * 保留业务、层级状态，销毁其他状态
 * 显示设备管理图表
 * 3D
 *  隐藏园区建筑
 *  虚化墙体
 *  显示楼层顶牌
 * 显示状态按钮
 */
const state设备管理 = [
  {
    statusKey:'preserve',
    children:[
      {
        statusKey:'business',
      },
      {
        statusKey:'level',
      },
    ]
  },
  {
    statusKey:'button',
    activeName:'设备管理',
  },
  {
    statusKey:'chart',
    activeName:'设备管理',
  },
  {
    statusKey:'3D',
    activeName:'隐藏园区建筑',
  },
  {
    statusKey:'3D',
    activeName:'虚化墙体',
  },
  {
    statusKey:'3D',
    activeName:'显示楼层顶牌',
  },
  {
    statusKey:'statusButton',
    activeName:'状态按钮',
  },
]

/**
 * 点击定位
 * b
 * 3D
 *  隐藏其他设备
 *  飞行到具体设备附近
 *  显示设备标题顶牌
 *  显示设备状态模块
 *  显示设备信息顶牌
 * 显示底部设备图表
 */
const state定位 = [
  {
    statusKey:'3D',
    activeName:'隐藏其他设备',
  },
  {
    statusKey:'3D',
    activeName:'飞行到具体设备附近',
  },
  {
    statusKey:'3D',
    activeName:'显示设备标题顶牌',
  },
  {
    statusKey:'3D',
    activeName:'显示设备状态模块',
  },
  {
    statusKey:'3D',
    activeName:'显示设备信息顶牌',
  },
  {
    statusKey:'chart',
    activeName:'显示底部设备图表',
  },
]

/**
 * 视图管理
 * 销毁所有进行中状态
 * 显示一次接线图-屏幕变成两侧
 * 切换到楼层层级
 * 切换3D视角斜铺
 * 显示楼层顶牌
 * 显示设备连线
 * 
 */
const state视图 = [
  {
    statusKey:'destoryAll',
    activeName:'销毁所有状态',
  },
  {
    statusKey:'views',
    activeName:'一次接线图',
  },
  {
    statusKey:'3D',
    activeName:'切换到楼层层级',
  },
  {
    statusKey:'3D',
    activeName:'切换3D视角斜铺',
  },
  {
    statusKey:'3D',
    activeName:'显示楼层顶牌',
  },
  {
    statusKey:'3D',
    activeName:'显示设备连线',
  },
]


export function test() {
  const stateManager = new StateManager()
  const params1:changeOptions = {
    statusKey: 'business',
    activeName: '业务1',
    params: {a:1}
  }
  stateManager.pushState(params1)
  console.log('历史',stateManager.historyList);

  const params2:changeOptions = {
    statusKey: 'button',
    activeName: '按钮1',
    params: {a:1}
  }
  stateManager.pushState(params2)
  console.log('历史',stateManager.historyList);
}

