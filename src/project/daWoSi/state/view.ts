export class ViewManager {
  list=[
    {
      name: '视图1',
      active: false,
      mount: ()=>{
        console.log('点击了视图1');
      },
      unMount: () => {
        console.log('取消点击视图1');
      }
    },
    {
      name: '视图2',
      active: false,
      mount: ()=>{
        console.log('点击了视图2');
      },
      unMount: () => {
        console.log('取消点击视图2');
      }
    }
  ]
  activeName!: string
  constructor(){

  }
  change(name:string){
    this.list.forEach(item=>{
      if(item.name==name){
        item.active=true
        this.activeName=name
      }else{
        item.active=false
      }
    })
  }
}