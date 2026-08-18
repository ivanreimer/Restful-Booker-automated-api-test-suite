import { test, expect } from '@playwright/test';
import { ApiClient } from '../../src/api/client';
import { BookingsApi } from '../../src/api/bookings.api';
import { Booking } from '../../src/types/booking.types';

test('Get all bookings', async ({ request }) => {

  const client = new ApiClient(request);

  const bookingsApi = new BookingsApi(client);

  const response = await bookingsApi.getAllBookings();

  expect(response.status()).toBe(200);

  const body = await response.json();

  console.log(body);
});
test('Get one booking',async ({request})=> {
    const client = new ApiClient(request);

    const bookingsApi = new BookingsApi(client);

    const response = await bookingsApi.getBookingById(1);

    expect(response.status()).toBe(200);

    const body = await response.json();

    console.log(body);

});
test('Create booking', async ({ request }) => {

  const client = new ApiClient(request);

  const bookingsApi = new BookingsApi(client);

  const booking: Booking = {
    firstname: 'Jim',
    lastname: 'Brown',
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: '2026-08-17',
      checkout: '2026-08-20',
    },
    additionalneeds: 'Breakfast',
  };

  const response = await bookingsApi.createBooking(booking);

  expect(response.status()).toBe(200);

  const body = await response.json();

  console.log(body);
});