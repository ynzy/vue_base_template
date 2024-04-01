export class ButtonManager {
  list=[
    {
      name: '按钮1',
      active: false,
      mount: ()=>{
        console.log('点击了按钮1');
      },
      unMount: () => {
        console.log('取消点击按钮1');
      }
    },
    {
      name: '按钮2',
      active: false,
      mount: ()=>{
        console.log('点击了按钮2');
      },
      unMount: () => {
        console.log('取消点击按钮2');
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