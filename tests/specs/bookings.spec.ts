import {test, expect} from '../fixtures/api.fixtures';
import { booking } from '../fixtures/booking-data';

test('Get all bookings', async ({ bookingsApi }) => {

  const response = await bookingsApi.getAllBookings();

  expect(response.status()).toBe(200);

  const body = await response.json();

  console.log(body);
});
test('Get one booking',async ({bookingsApi})=> {

    const response = await bookingsApi.getBookingById(1);

    expect(response.status()).toBe(200);

    const body = await response.json();

    console.log(body);

});
test('Create booking', async ({ bookingsApi }) => {

  const response = await bookingsApi.createBooking(booking);

  expect(response.status()).toBe(200);

  const body = await response.json();

  console.log(body);
});