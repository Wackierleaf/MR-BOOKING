import {FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";
import {BookingData} from "../interfaces/booking-data";
import {TimeHelper} from "./TimeHelper";

export class NumberHelper {
  static Parse(arr: string[], index: number): number {
    if (!arr || index < 0 || arr.length <= index) {
      return NaN;
    }
    return parseInt(arr[index].replace(/[^\x00-\x7F]/g, ""))
  }
}

function timeStringToMinutes(timeString: string): number | null {
  if (!timeString) {
    return null
  }

  const splittedStr = timeString.split(':')
  return NumberHelper.Parse(splittedStr, 0) * 60 + NumberHelper.Parse(splittedStr, 1)
}

export function dateRangeValidator(startFieldName: string = 'start', endFieldName: string = 'end'): ValidatorFn {
  // @ts-ignore
  return (form: FormGroup): ValidationErrors | null => {
    const start: number | null = timeStringToMinutes(form.get(startFieldName)?.value)
    const end: number | null = timeStringToMinutes(form.get(endFieldName)?.value)
    if (start && end) {
      const isRangeValid = (end - start > 0)
      return isRangeValid ? null : {timeRange: true}
    }

    return null
  }
}

export function checkIsTimePeriodFree(reservations: BookingData[],
  startFieldName: string = 'start', dateFieldName: string = 'date'): ValidatorFn {
  // @ts-ignore
  return (form: FormGroup): ValidationErrors | null => {
    if (form?.value[dateFieldName] && form?.value[startFieldName] && reservations.length > 0) {
      const date = form.value[dateFieldName]
      const startTime = TimeHelper.getDateObjectFromTimeStr(date, form.value[startFieldName])
      const isPeriodFree = reservations.every(el => el.end < startTime)
      return isPeriodFree ? null : {periodIsNotFree: true}
    }
    return null
  }
}
