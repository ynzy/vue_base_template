export enum LifeCycleEnum {
  mount ='mount',
  unmount= 'unmount',
}

export class BaseManager {
  name: string = 'BaseManager';
  lifeCycle: LifeCycleEnum | '' = ''; // 执行的生命周期
  constructor() {

  }
  mount(data:any){
    this.lifeCycle = LifeCycleEnum.mount;
    console.log(`执行【${this.name}】【${data.activeName}】的mount方法`);
  }
  unmount(data:any){
    this.lifeCycle = LifeCycleEnum.unmount;
    console.log(`执行【${this.name}】【${data.activeName}】的unmount方法`);
  }
}