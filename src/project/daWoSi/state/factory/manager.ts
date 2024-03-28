import type { IModule } from './module'

export interface Item {
  id: string
  name: string
  moduleList: IModule[]
}

// 是否缓存业务模块功能
export interface moduleControlType {
  /* 如果状态是 true 则缓存所有模块，在exclude里的不缓存，
  如果是 false 则不缓存任何模块，在exclude里的缓存 */
  cache: boolean;
  exclude: string[]; // 排除名单
}

export class Manager {
  current: Item | null = null;
  list: Item[] = [];
  moduleControl: moduleControlType = {
    cache: true,
    exclude: []
  };
  constructor() {}
  /**
   * 初始化方法
   */
  init(data: any) { }
  /**
       * 创建事件
       * @param eventName 事件名称
       * @param data 事件数据
       * @private
       */
  private emitter(eventName: string, data: any) { }
  /**
     * 事件监听
     * @param eventName
     * @param callback
     */
  on(eventName: string, callback: (T: any) => void) {}
  /**
   * 切换状态方法
   */
  change(data: any) {}
}