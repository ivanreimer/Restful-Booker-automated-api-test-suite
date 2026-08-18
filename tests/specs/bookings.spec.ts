import { test, expect } from '@playwright/test';
import { ApiClient } from '../../src/api/client';
import { BookingsApi } from '../../src/api/bookings.api';
import { booking} from '../fixtures/booking-data';

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

  const response = await bookingsApi.createBooking(booking);

  expect(response.status()).toBe(200);

  const body = await response.json();

  console.log(body);
});