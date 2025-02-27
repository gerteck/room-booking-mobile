import { Room, RoomAvailability } from "@/types/Room";

// Fetch Room Data
const API_URL = "https://gist.githubusercontent.com/yuhong90/7ff8d4ebad6f759fcc10cc6abdda85cf/raw/463627e7d2c7ac31070ef409d29ed3439f7406f6/room-availability.json";

export const fetchRooms = async (): Promise<Room[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};
