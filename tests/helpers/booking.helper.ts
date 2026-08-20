import { expect } from '@playwright/test';
import { BookingsApi } from '../../src/api/bookings.api';
import { Booking, BookingWithId } from '../../src/types/booking.types';

export async function createBookingAndReturnBody(
  bookingsApi: BookingsApi,
  booking: Booking
): Promise<BookingWithId> {
  const response = await bookingsApi.createBooking(booking);

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body).toHaveProperty('bookingid');
  expect(typeof body.bookingid).toBe('number');

  return body;
}