import { AirDateTime, AirDictionaryArray, AirModel, Alias, Default, Dictionary, FieldName, ToModel, Type, getDictionary, type IJson, ToJson } from "airpower";



enum UserStatus {
  ENABLED = 1,
  DISABLED = 2,
  UNVALID = 3
}
const UserStatusDictionary = AirDictionaryArray.create([
  {key: UserStatus.ENABLED, label: "已启用"},
  {key: UserStatus.DISABLED, label: "已禁用"},
  {key: UserStatus.UNVALID, label: "待验证"},
])

class UserInfo extends AirModel{
  @Default(28)
  @Type(Number)
  age!: number
  
  @Default("男")
  sex!: string

  @Default("中国杭州")
  @Alias("local") location!: string
}


class User extends AirModel{
  @Alias("username") 
  nickname!: string

  @Default("这个人很懒，一句话也没留下")
  bio!: string

  @Type(UserInfo)
  userInfo!: UserInfo

  @Type(Number)
  num!: number

  @Dictionary(UserStatusDictionary) 
  status!: UserStatus
  
  @ToModel((json: IJson)=>{ // 参数为原始对象
    console.log(json.lastLoginTime);
    // return AirDateTime.formatFromMilliSecond(json.lastLoginTime)
    return '格式化时间戳'
  })
  @ToJson((user: User)=>{ // 参数为类的实例对象
    // return AirDateTime.getMilTimeStamp(user.lastLoginTime)
    return '转成json前格式化'
  })
  lastLoginTime!: number
}

let json = {
  "username": "Hamm",
  num: "60",
  // bio: "xxx12",
  status: 2,
  lastLoginTime: 1711598057992, // 毫秒时间戳
  "userInfo": {
    "age": "20",
    local: "世界"
  }
}

const user = User.fromJson(json)

// const dict = getDictionary(User, "status") // 获取不到
const dict = getDictionary(User.prototype, 'status')
console.log('获取状态字典',dict);
console.log('获取一个字典',dict?.get(UserStatus.ENABLED));

const res = ref<User>(user)
console.log('ref',res.value);
res.value.bio = '我给这个字段加了值'
console.log('user',user.toJson());


// const userModel = new User()
// console.log(userModel.toJson());

