import { authTest , expect } from "../fixtures/api.fixture";
import { getRequiredEnv } from "../helpers/env.helper";


authTest('Success login', async ({ authApi }) => {
    const username = getRequiredEnv('ADMIN_USERNAME');
    const password = getRequiredEnv('ADMIN_PASSWORD');  
    const response = await authApi.login(username, password);
    expect(response.status()).toBe(200);
    const body = await response.json();

    expect(body).toHaveProperty('token');
    expect(typeof body.token).toBe('string');
    expect(body.token.length).toBeGreaterThan(0);
});
