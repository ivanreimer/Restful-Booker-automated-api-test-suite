import {bookingTest, expect} from '../fixtures/api.fixture';
import { booking } from '../fixtures/booking-data';
import { createBookingAndReturnBody } from '../helpers/booking.helper';

bookingTest('Get all bookings', async ({ bookingsApi }) => {

  const response = await bookingsApi.getAllBookings();

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(Array.isArray(body)).toBeTruthy();

  expect(body.length).toBeGreaterThan(0);

  expect(body[0]).toHaveProperty('bookingid');

  expect(typeof body[0].bookingid).toBe('number');
});

bookingTest('Create booking', async ({ bookingsApi }) => {
  const createdBooking = await createBookingAndReturnBody(bookingsApi,booking); 
  expect(createdBooking).toHaveProperty('booking');
  expect(createdBooking.booking.firstname).toBe(booking.firstname);
  expect(createdBooking.booking.lastname).toBe(booking.lastname);
  expect(createdBooking.booking.totalprice).toBe(booking.totalprice);
  expect(createdBooking.booking.depositpaid).toBe(booking.depositpaid);
  expect(createdBooking.booking.bookingdates.checkin).toBe(booking.bookingdates.checkin);
  expect(createdBooking.booking.bookingdates.checkout).toBe(booking.bookingdates.checkout);
  expect(createdBooking.booking.additionalneeds).toBe(booking.additionalneeds);
});


bookingTest('Get one booking', async ({ bookingsApi }) => {
  const createdBooking = await createBookingAndReturnBody(bookingsApi, booking);

  const response = await bookingsApi.getBookingById(createdBooking.bookingid);

  expect(response.status()).toBe(200);

  const body = await response.json();
  
  expect(body.firstname).toBe(booking.firstname);
  expect(body.lastname).toBe(booking.lastname);
  expect(body.totalprice).toBe(booking.totalprice);
  expect(body.depositpaid).toBe(booking.depositpaid);
});