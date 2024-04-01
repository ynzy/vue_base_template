// dom
// 互斥
// 图表按页面去做

/**
 * 切换到全景监视业务
 * 切换到园区层级
 * 展示全景监视图表
 * 3D
 *  设置园区视角
 *  显示园区顶牌
 */
export const state全景监视 = [
  {
    statusKey: 'business',
    activeName: '全景监视',
  },
  // {
  //   statusKey: 'level',
  //   activeName: 'campus',
  // },
  {
    statusKey: 'chart',
    activeName: '全景监视',
  },
  // {
  //   statusKey: '3D',
  //   activeName: '设置视角',
  // },
  // {
  //   statusKey: '3D',
  //   activeName: '设置顶牌',
  // },
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
export const state设备管理 = [
  {
    statusKey: 'preserve',
    children: [
      {
        statusKey: 'business',
      },
      // {
      //   statusKey: 'level',
      // },
    ]
  },
  {
    statusKey: 'button',
    activeName: '设备管理',
  },
  {
    statusKey: 'chart',
    activeName: '设备管理',
  },
  // {
  //   statusKey: '3D',
  //   activeName: '隐藏园区建筑',
  // },
  // {
  //   statusKey: '3D',
  //   activeName: '虚化墙体',
  // },
  // {
  //   statusKey: '3D',
  //   activeName: '显示楼层顶牌',
  // },
  // {
  //   statusKey: 'statusButton',
  //   activeName: '状态按钮',
  // },
]

/**
 * 点击定位
 * 
 * 3D
 *  隐藏其他设备
 *  飞行到具体设备附近
 *  显示设备标题顶牌
 *  显示设备状态模块
 *  显示设备信息顶牌
 * 显示底部设备图表
 */
export const state定位 = [
  {
    statusKey: '3D',
    activeName: '隐藏其他设备',
  },
  {
    statusKey: '3D',
    activeName: '飞行到具体设备附近',
  },
  {
    statusKey: '3D',
    activeName: '显示设备标题顶牌',
  },
  {
    statusKey: '3D',
    activeName: '显示设备状态模块',
  },
  {
    statusKey: '3D',
    activeName: '显示设备信息顶牌',
  },
  {
    statusKey: 'chart',
    activeName: '显示底部设备图表',
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
export const state视图 = [
  {
    statusKey: 'destroyAll',
    activeName: '销毁所有状态',
  },
  {
    statusKey: 'views',
    activeName: '一次接线图',
  },
  {
    statusKey: '3D',
    activeName: '切换到楼层层级',
  },
  {
    statusKey: '3D',
    activeName: '切换3D视角斜铺',
  },
  {
    statusKey: '3D',
    activeName: '显示楼层顶牌',
  },
  {
    statusKey: '3D',
    activeName: '显示设备连线',
  },
]