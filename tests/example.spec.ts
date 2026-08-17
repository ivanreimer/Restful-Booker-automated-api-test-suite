import { test, expect } from '@playwright/test';
import { title } from 'node:process';

test('GET THE POSTS STATUS CODE', async ({ request }) => {
  const response = await request.get('/posts/101');
  const jsonBody ={
      body: "I'm a good and humble person, who wants to learn API automation.",
      id: 101,
      title: 'Iván Reimer Post',
      userId: 1
    }  
  expect(await response.json()).toEqual(jsonBody);
});

test('get started link', async ({ request }) => {
  const response = await request.post('/auth',
      {
        headers:
        {
          'Content-Type': 'application/json'
        },   
        data:
        {
          username: 'admin',
          password: 'password123' 
        }
      }

    );
    const body = await response.json();
    const token = body.token;
    expect(token).toEqual('abc123');
});
