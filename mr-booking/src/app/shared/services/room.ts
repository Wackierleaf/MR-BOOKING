export interface Room {
  uid?: string;
  name: string;
  seats: number;
  whiteboard?: boolean;
  projector?: boolean;
  description?: string | null;
}
