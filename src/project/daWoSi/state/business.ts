export class BusinessManager {
  list=[
    {
      name: '业务1',
      active: false,
      mount: ()=>{
        console.log('点击了业务1');
      },
      unMount: () => {
        console.log('取消点击业务1');
      }
    },
    {
      name: '业务2',
      active: false,
      mount: ()=>{
        console.log('点击了业务2');
      },
      unMount: () => {
        console.log('取消点击业务2');
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