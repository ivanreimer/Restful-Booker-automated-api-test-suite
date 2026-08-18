import { Booking } from '../../src/types/booking.types';

export const booking: Booking = {
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