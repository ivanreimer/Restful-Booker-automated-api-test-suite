import { ApiClient } from './client';
import {Booking} from '../types/booking.types';

export class BookingsApi {
  constructor(private client: ApiClient) {}

  async getAllBookings() {
    return await this.client.get('/booking');
  }

  async getBookingById(id: number) {
    return await this.client.get(`/booking/${id}`);
  }

  async createBooking(booking: Booking) {
    return await this.client.post('/booking', booking);
  }
}