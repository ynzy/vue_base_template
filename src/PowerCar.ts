import { AirModel, Alias, Default } from "airpower";

export class PowerCar extends AirModel {
  @Default("HY001（浙A96B97+浙ADX21")
  @Alias('车牌') unitCarLicense: string

  @Default("HY001")
  unitName: string

  @Default("HY001")
  unitCode: string

  @Default("王伟test")
  driver: string

  @Default("13758170634")
  phoneNumber: string
  
  @Default("国网浙江杭州市萧山区供电公司")
  company: string
  
  @Default("运行")
  status: string
  
  @Default(120.268768)
  longitude: number
  
  @Default(30.112167)
  latitude: number
  
  @Default("xxx")
  @Alias('carType') type: string
}

