import { test as base } from '@playwright/test';
import { ApiClient } from '../../src/api/client';
import { BookingsApi } from '../../src/api/bookings.api';

type ApiFixtures = {
  bookingsApi: BookingsApi; 
};

export const test = base.extend<ApiFixtures>({
  bookingsApi: async ({ request }, use) => {
    const client = new ApiClient(request);

    const bookingsApi = new BookingsApi(client);

    await use(bookingsApi);
  },
});

export { expect } from '@playwright/test';