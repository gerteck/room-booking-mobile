// services/api.test.ts
import { fetchRooms } from './api';
import { Room } from '../types/Room';

describe('fetchRooms', () => {
  it('should fetch rooms data successfully', async () => {
    const mockData: Room[] = [
      {
        name: 'Kopi-O',
        capacity: '8',
        level: '7',
        availability: {
          "08:00": "1",
          "08:30": "1",
          "09:00": "0",
          "09:30": "0",
          "10:00": "0",
          "10:30": "0",
          "11:00": "0",
          "11:30": "0",
          "12:00": "0",
          "12:30": "0",
          "13:00": "0",
          "13:30": "0",
          "14:00": "1",
          "14:30": "1",
          "15:00": "0",
          "15:30": "0",
          "16:00": "0",
          "16:30": "0",
          "17:00": "0",
          "17:30": "0",
          "18:00": "0",
          "18:30": "0",
          "19:00": "0",
          "19:30": "0"
        }
      }
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    ) as jest.Mock;

    const rooms = await fetchRooms(new Date());
    expect(rooms).toEqual(mockData);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should handle network error', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('Network error'))
    ) as jest.Mock;

    await expect(fetchRooms(new Date())).rejects.toThrow('Network error');
  });
});