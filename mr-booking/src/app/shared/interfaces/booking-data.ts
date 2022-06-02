import {User} from "./user";

export interface BookingData {
  uid?: string
  date: Date | string
  start: Date | string
  end: Date | string
  roomId: string
  creatorId: string
  creatorName: string
  eventDescription: string
  roomName: string
  participantsIds: User[]
}
