import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiClient {
  constructor(private request: APIRequestContext) {}

  async get(endpoint: string): Promise<APIResponse> {
    return await this.request.get(endpoint);
  }

  async post(endpoint: string, data?: object): Promise<APIResponse> {
    return await this.request.post(endpoint, {
      data,
    });
  }

  async put(endpoint: string, data?: object): Promise<APIResponse> {
    return await this.request.put(endpoint, {
      data,
    });
  }

  async patch(endpoint: string, data?: object): Promise<APIResponse> {
    return await this.request.patch(endpoint, {
      data,
    });
  }

  async delete(endpoint: string): Promise<APIResponse> {
    return await this.request.delete(endpoint);
  }
}