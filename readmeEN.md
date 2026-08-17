# 🧪 Restful Booker - API Automation Testing

A comprehensive **API automation testing project** built with **Playwright and TypeScript**. This suite demonstrates best practices in API test automation, authentication handling, and REST response validation.

> **Note**: This is an educational portfolio project. We use [Restful Booker](https://restful-booker.herokuapp.com/) as our example API.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Core Concepts](#core-concepts)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## 📝 Overview

### What is Restful Booker?

[Restful Booker](https://restful-booker.herokuapp.com/) is a sample REST API that simulates a hotel booking system. It allows us to practice real-world API testing with:

- ✅ JWT Token Authentication
- ✅ Full CRUD Operations
- ✅ Error Handling & Edge Cases
- ✅ JSON Response Validation
- ✅ HTTP Status Code Management

### Project Goals

This project demonstrates:

1. **Robust API Automation** with Playwright
2. **Authentication Management** (login & JWT tokens)
3. **Professional Testing Patterns**
4. **Comprehensive Response Validation**
5. **TypeScript Best Practices** (Clean Code, DRY, KISS)

---

## 🔧 Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x (or yarn/pnpm)
- Basic knowledge of:
  - REST APIs (GET, POST, PUT, DELETE)
  - TypeScript
  - Testing & Assertions

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/ivanreimer/Restful-Booker-automated-api-test-suite.git
cd Restful-Booker-automated-api-test-suite
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Playwright Browsers (Optional for API testing only)

```bash
npx playwright install
```

> **Note**: For pure API testing, browsers aren't required, but we include them for future flexibility.

---

## ⚙️ Configuration

### Environment Variables

Copy the `.env.example` file and rename it to `.env`:

```bash
cp .env.example .env
```

Then edit it with your values:

```env
# API Base URL
BASE_URL=https://restful-booker.herokuapp.com

# Admin Credentials (for authentication)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=password123

# Timeouts (in milliseconds)
REQUEST_TIMEOUT=5000
```

> ⚠️ **Security**: Never commit `.env` with real credentials. Git is already configured with `.gitignore`.

---

## 🚀 Usage

### Run All Tests

```bash
npm test
```

### Run Specific Test Files

```bash
# Only authentication tests
npm test -- auth.spec.ts

# Only CRUD booking tests
npm test -- bookings-crud.spec.ts

# Specific spec file
npm test -- tests/specs/bookings.spec.ts
```

### Watch Mode (Development)

```bash
npm run test:watch
```

### Debug Mode (With Inspector)

```bash
npm run test:debug
```

### View HTML Report

```bash
npm run test:report
```

### Run in Headless Mode

```bash
npm test -- --reporter=html
```

---

## 🏗️ Project Structure

```
Restful-Booker-automated-api-test-suite/
├── src/
│   ├── api/
│   │   ├── client.ts              # Base HTTP client (request abstraction)
│   │   ├── auth.api.ts            # Authentication endpoints
│   │   └── bookings.api.ts        # CRUD operations for bookings
│   ├── types/
│   │   └── booking.types.ts       # TypeScript interfaces and types
│   └── utils/
│       ├── validators.ts          # Validation functions
│       └── helpers.ts             # Utility functions
├── tests/
│   ├── specs/
│   │   ├── auth.spec.ts           # Authentication tests
│   │   ├── bookings.spec.ts       # Read (GET) tests
│   │   └── bookings-crud.spec.ts  # CREATE, UPDATE, DELETE tests
│   └── fixtures/
│       ├── booking-data.ts        # Reusable test data
│       └── auth.fixture.ts        # Authentication setup
├── .env.example                   # Environment variables template
├── .gitignore
├── playwright.config.ts           # Playwright configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json
├── readmeES.md                    # Spanish version
├── readmeEN.md                    # This file
└── README.md                      # Links to both READMEs
```

---

## 🎯 Core Concepts

### 1. JWT Token Authentication

**What is it?** A system where we authenticate first and receive a token, which we include in subsequent requests.

**Flow:**
```
1. POST /auth (login) → receive token
2. Store token in class instance
3. Include Authorization header in future requests
```

**Why it matters:** Simulates real-world API authentication.

**Implementation:**
```typescript
// Step 1: Login and get token
const loginResponse = await auth.login('admin', 'password123');
const token = loginResponse.token;

// Step 2: Use token in subsequent requests
bookingsAPI.setToken(token);
const bookings = await bookingsAPI.getBookings();
```

---

### 2. Base API Client Pattern

**Why?** Avoid repeating headers, authentication, and request logic in every method.

**Benefits:**
- ✅ DRY (Don't Repeat Yourself)
- ✅ Centralized changes
- ✅ Consistent error handling

```typescript
// ❌ WITHOUT pattern (repeated code)
async getBooking(id: number) {
  const response = await fetch(`${BASE_URL}/booking/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', ... }
  });
  return response.json();
}

// ✅ WITH pattern (reusable)
async getBooking(id: number) {
  return this.request('GET', `/booking/${id}`);
}
```

---

### 3. Response Validation

**What do we validate?**

1. **HTTP Status Codes** (200, 201, 400, 401, 404, etc.)
2. **JSON Structure** (expected properties exist)
3. **Data Types** (string, number, boolean, etc.)
4. **Specific Values** (comparing concrete values)

**Example:**
```typescript
test('Booking response has correct structure', async () => {
  const response = await bookingsAPI.getBooking(1);
  
  // 1. Validate status
  expect(response.status).toBe(200);
  
  // 2. Validate structure
  expect(response.body).toHaveProperty('firstname');
  expect(response.body).toHaveProperty('lastname');
  
  // 3. Validate types
  expect(typeof response.body.totalprice).toBe('number');
  expect(typeof response.body.firstname).toBe('string');
  
  // 4. Validate values
  expect(response.body.totalprice).toBeGreaterThan(0);
  expect(response.body.firstname).not.toBe('');
});
```

---

### 4. Edge Cases

**What are they?** Extreme or incorrect situations we test.

**Examples:**
```typescript
// Negative ID
await bookingsAPI.getBooking(-1);

// Non-existent ID
await bookingsAPI.getBooking(999999);

// Missing required fields
await bookingsAPI.createBooking({ lastname: 'Pérez' }); // missing firstname

// Invalid values
await bookingsAPI.createBooking({ 
  firstname: '', // empty string
  totalprice: -100 // negative number
});
```

**Why it matters:** Finds bugs other tests miss.

---

### 5. Fixtures (Test Setup)

**What are they?** Data and configuration we reuse across multiple tests.

**Advantages:**
- ✅ No repeated setup
- ✅ Cleaner tests
- ✅ Centralized test data

```typescript
// fixtures/booking-data.ts
export const validBookingData = {
  firstname: 'John',
  lastname: 'Smith',
  totalprice: 150,
  depositpaid: true,
  bookingdates: {
    checkin: '2024-01-15',
    checkout: '2024-01-20'
  }
};

// tests/specs/bookings.spec.ts
test('Create booking', async () => {
  const response = await bookingsAPI.createBooking(validBookingData);
  expect(response.status).toBe(200);
});
```

---

## 💡 Practical Examples

### Example 1: Complete Authentication Test

```typescript
import { test, expect } from '@playwright/test';
import { AuthAPI } from '../api/auth.api';

test.describe('Authentication', () => {
  let authAPI: AuthAPI;

  test.beforeEach(() => {
    authAPI = new AuthAPI();
  });

  test('Valid login returns token', async () => {
    const response = await authAPI.login(
      process.env.ADMIN_USERNAME!,
      process.env.ADMIN_PASSWORD!
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(typeof response.body.token).toBe('string');
    expect(response.body.token.length).toBeGreaterThan(0);
  });

  test('Invalid credentials return 403', async () => {
    const response = await authAPI.login('admin', 'wrong_password');
    expect(response.status).toBe(403);
  });
});
```

### Example 2: Complete CRUD Test

```typescript
test.describe('Bookings CRUD', () => {
  let bookingId: number;
  const newBooking = {
    firstname: 'Carlos',
    lastname: 'González',
    totalprice: 200,
    depositpaid: false,
    bookingdates: {
      checkin: '2024-02-01',
      checkout: '2024-02-05'
    }
  };

  test('CREATE - Create booking', async () => {
    const response = await bookingsAPI.createBooking(newBooking);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('bookingid');
    expect(response.body.booking.firstname).toBe(newBooking.firstname);
    
    bookingId = response.body.bookingid;
  });

  test('READ - Get booking by ID', async () => {
    const response = await bookingsAPI.getBooking(bookingId);
    
    expect(response.status).toBe(200);
    expect(response.body.firstname).toBe(newBooking.firstname);
    expect(response.body.totalprice).toBe(newBooking.totalprice);
  });

  test('UPDATE - Update booking', async () => {
    const updatedData = { ...newBooking, firstname: 'Miguel' };
    const response = await bookingsAPI.updateBooking(bookingId, updatedData);
    
    expect(response.status).toBe(200);
    expect(response.body.firstname).toBe('Miguel');
  });

  test('DELETE - Delete booking', async () => {
    const response = await bookingsAPI.deleteBooking(bookingId);
    
    expect(response.status).toBe(201);
  });
});
```

### Example 3: Edge Cases Test

```typescript
test.describe('Bookings - Edge Cases', () => {
  
  test('Cannot create booking without firstname', async () => {
    const invalidBooking = {
      lastname: 'Pérez',
      totalprice: 100,
      depositpaid: true,
      bookingdates: { checkin: '2024-01-01', checkout: '2024-01-05' }
    };
    
    const response = await bookingsAPI.createBooking(invalidBooking);
    expect(response.status).toBe(400); // Bad Request
  });

  test('Cannot use negative price', async () => {
    const invalidBooking = {
      firstname: 'John',
      lastname: 'Doe',
      totalprice: -50, // Negative
      depositpaid: true,
      bookingdates: { checkin: '2024-01-01', checkout: '2024-01-05' }
    };
    
    const response = await bookingsAPI.createBooking(invalidBooking);
    expect(response.status).toBe(400);
  });

  test('Get non-existent booking returns 404', async () => {
    const response = await bookingsAPI.getBooking(999999);
    expect(response.status).toBe(404);
  });
});
```

---

## 🐛 Troubleshooting

### "Cannot find module 'playwright'"
```bash
npm install
npx playwright install
```

### "Request timeout"
Increase timeout in `.env`:
```env
REQUEST_TIMEOUT=10000  # 10 seconds
```

### "Unauthorized 401"
Verify that:
1. Credentials in `.env` are correct
2. Token is being passed correctly in headers
3. Token hasn't expired

### "Test hangs/freezes"
Add timeout in `playwright.config.ts`:
```typescript
test.setTimeout(30000); // 30 seconds
```

---

## 🤝 Contributing

This is an educational project open to improvements. To contribute:

1. Fork the repository
2. Create a branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m 'Add feature X'`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

### Areas for improvement:
- [ ] Performance/Load testing
- [ ] Retry logic for failed requests
- [ ] Enhanced reporting
- [ ] Slack/Email integration
- [ ] Parallel test execution
- [ ] Improved CI/CD with GitHub Actions

---

## 📄 License

This project is licensed under the **MIT License**. See [LICENSE](./LICENSE) for details.

---

## 📚 Useful Resources

- [Official Restful Booker Documentation](https://restful-booker.herokuapp.com/apidoc/index.html)
- [Playwright API Testing Guide](https://playwright.dev/docs/api-testing)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [REST API Best Practices](https://restfulapi.net/)
- [JSON Web Tokens (JWT)](https://jwt.io/)

---

## 👨‍💻 Author

**Iván Reimer**  
QA Automation Engineer SSR | Quilmes, Buenos Aires 🇦🇷

📧 [ivanreimer1@gmail.com](mailto:ivanreimer1@gmail.com)  
🔗 [GitHub](https://github.com/ivanreimer) | [LinkedIn](https://linkedin.com/in/ivanreimer)

---

**⭐ If you find this useful, don't forget to leave a star on GitHub!**

---

> **Last Updated**: August 2026  
> **Status**: 🚧 Work in Progress (Educational Project)
