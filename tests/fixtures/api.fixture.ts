import { test as base } from '@playwright/test';
import { ApiClient } from '../../src/api/client';
import { BookingsApi } from '../../src/api/bookings.api';
import {AuthApi} from '../../src/api/auth.api'
type Client = {
  client: ApiClient; 
};

export const apiTest = base.extend<Client>({
    client : async ({ request }, use) => {
    const apiClient = new ApiClient(request);

    await use(apiClient);
  },
});

type BookingApiFixture = {
  bookingsApi : BookingsApi;
}

export const bookingTest = apiTest.extend<BookingApiFixture>({
  bookingsApi : async ({client}, use) => {
    const bookingsApi = new BookingsApi(client); 
    await use(bookingsApi);
  }
});

type AuthApiFixture = {
  authApi: AuthApi;
};

export const authTest = bookingTest.extend<AuthApiFixture>({
  authApi: async ({ client }, use) => {

    const authApi = new AuthApi(client);

    await use(authApi);
  },
});

export { expect } from '@playwright/test';

