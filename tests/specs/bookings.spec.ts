import {bookingTest, expect} from '../fixtures/api.fixture';
import { booking } from '../fixtures/booking-data';

bookingTest('Get all bookings', async ({ bookingsApi }) => {

  const response = await bookingsApi.getAllBookings();

  expect(response.status()).toBe(200);

  const body = await response.json();

  console.log(body);
});
bookingTest('Get one booking',async ({bookingsApi})=> {

    const response = await bookingsApi.getBookingById(20);

    expect(response.status()).toBe(200);

    const body = await response.json();

    console.log(body);

});
bookingTest('Create booking', async ({ bookingsApi }) => {

  const response = await bookingsApi.createBooking(booking);

  expect(response.status()).toBe(200);

  const body = await response.json();

  console.log(body);
});
