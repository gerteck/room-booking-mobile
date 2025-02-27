interface RoomAvailability {
    [timeSlot: string]: "0" | "1";
  }
  
interface Room {
    name: string;
    capacity: string;
    level: string;
    availability: RoomAvailability;
}

export type { Room, RoomAvailability };
