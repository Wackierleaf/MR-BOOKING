import {NumberHelper} from "./validators";

export class TimeHelper {

  public static getDateObjectFromTimeStr(date: Date, timeStr: string) {
    const dateClone = new Date(date.getTime())
    dateClone.setHours(NumberHelper.Parse(timeStr.split(':'), 0))
    dateClone.setMinutes(NumberHelper.Parse(timeStr.split(':'), 1))
    return dateClone
  }
}
