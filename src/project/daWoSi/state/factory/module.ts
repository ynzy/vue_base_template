export interface IModule {
  moduleName: string;
  funName: string;
  params?: {
      [x: string]: any;
  };
}

/*
 * @Author       : zhangyong
 * @Date         : 2023-07-19 17:14:03
 * @Description  :
 */

/**
 * 功能模块父类
 */
export class ModuleTemplate {
  /*Thing物体容器图层，仅限地图项目使用
  把每个模块中创建的物体放到该图层下*/
  thingLayer?: any;
  // 当前模块是否激活
  isActive: boolean = false;

  constructor() {}

  /**
   * 功能预演
   * 执行此方法，可以将功能很好的演示出来
   */
  preview?() {}

  /**
   * 创建
   * 业务初始化的生命周期
   */
  mount(data:any) {}

  /**
   * 显示
   * 业务切换显示的生命周期
   * @return {*}
   */
  show(data:any) {}

  /**
   * 隐藏
   * 业务切换隐藏的生命周期
   * @return {*}
   */
  hide(data:any) {}

  /**
   * 销毁
   * 业务销毁的生命周期
   */
  unmount(data:any) {}
}
