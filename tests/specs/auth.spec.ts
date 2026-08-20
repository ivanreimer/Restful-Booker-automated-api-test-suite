import { authTest , expect } from "../fixtures/api.fixture";

authTest('Success login', async ({ authApi }) => {
    const response = await authApi.login('admin', 'password123');
    expect(response.status()).toBe(200);
});
