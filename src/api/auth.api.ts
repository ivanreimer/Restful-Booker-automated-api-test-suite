import { ApiClient } from './client';

export class AuthApi {
  constructor(private client: ApiClient) {}

  async login(username: string, password: string) {
    return await this.client.post('/auth', {
      username,
      password,
    });
  }
}