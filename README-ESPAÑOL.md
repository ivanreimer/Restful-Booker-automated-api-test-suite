# 🧪 Restful Booker - API Automation Testing

Un proyecto de **testing automatizado de APIs** usando **Playwright con TypeScript**. Demostramos buenas prácticas en automatización de pruebas, manejo de autenticación, y validación de respuestas REST.

> **Nota**: Este es un proyecto educativo para portafolio. Usamos [Restful Booker](https://restful-booker.herokuapp.com/) como API de ejemplo.

---

## 📋 Tabla de Contenidos

- [Descripción](#descripción)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Conceptos Clave](#conceptos-clave)
- [Ejemplos](#ejemplos)
- [Troubleshooting](#troubleshooting)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

---

## 📝 Descripción

### ¿Qué es Restful Booker?

[Restful Booker](https://restful-booker.herokuapp.com/) es una API REST de ejemplo que simula un sistema de reservas de hoteles. Nos permite practicar testing de APIs reales con:

- ✅ Autenticación mediante tokens JWT
- ✅ Operaciones CRUD completas
- ✅ Manejo de errores y casos edge
- ✅ Validación de respuestas JSON
- ✅ Manejo de estados HTTP

### Objetivo del Proyecto

Este proyecto demuestra:

1. **Automatización robusta de APIs** con Playwright
2. **Gestión de autenticación** (login y tokens JWT)
3. **Patrones de testing** profesionales
4. **Validaciones exhaustivas** de respuestas
5. **Buenas prácticas** en TypeScript (Clean Code, DRY, KISS)

---

## 🔧 Requisitos Previos

- **Node.js** >= 18.x
- **npm** >= 9.x (o yarn/pnpm)
- Conocimiento básico de:
  - APIs REST (GET, POST, PUT, DELETE)
  - TypeScript
  - Testing y assertions

---

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/ivanreimer/Restful-Booker-automated-api-test-suite.git
cd Restful-Booker-automated-api-test-suite
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Instalar navegadores de Playwright (opcional para API testing)

```bash
npx playwright install
```

> **Nota**: Para testing puro de APIs no necesitamos navegadores, pero los incluimos por flexibilidad futura.

---

## ⚙️ Configuración

### Variables de Entorno

Copia el archivo `.env.example` y renómbralo a `.env`:

```bash
cp .env.example .env
```

Luego edítalo con tus valores:

```env
# API Base URL
BASE_URL=https://restful-booker.herokuapp.com

# Credenciales (para autenticación)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=password123

# Timeouts (en milisegundos)
REQUEST_TIMEOUT=5000
```

> ⚠️ **Seguridad**: Nunca commitees `.env` con credenciales reales. Git ya tiene configurado `.gitignore`.

---

## 🚀 Uso

### Ejecutar Todos los Tests

```bash
npm test
```

### Ejecutar Tests Específicos

```bash
# Solo tests de autenticación
npm test -- auth.spec.ts

# Solo tests de CRUD de reservas
npm test -- bookings-crud.spec.ts

# Un archivo de spec específico
npm test -- tests/specs/bookings.spec.ts
```

### Modo Watch (Desarrollo)

```bash
npm run test:watch
```

### Modo Debug (Con inspector)

```bash
npm run test:debug
```

### Ver Reporte HTML

```bash
npm run test:report
```

### Ejecutar en Modo Headless

```bash
npm test -- --reporter=html
```

---

## 🏗️ Estructura del Proyecto

```
Restful-Booker-automated-api-test-suite/
├── src/
│   ├── api/
│   │   ├── client.ts              # Cliente HTTP base (abstracción de requests)
│   │   ├── auth.api.ts            # Métodos de autenticación
│   │   └── bookings.api.ts        # Métodos de CRUD de reservas
│   ├── types/
│   │   └── booking.types.ts       # Interfaces y tipos TypeScript
│   └── utils/
│       ├── validators.ts          # Funciones de validación
│       └── helpers.ts             # Funciones auxiliares
├── tests/
│   ├── specs/
│   │   ├── auth.spec.ts           # Tests de login y tokens
│   │   ├── bookings.spec.ts       # Tests de lectura (GET)
│   │   └── bookings-crud.spec.ts  # Tests de CREATE, UPDATE, DELETE
│   └── fixtures/
│       ├── booking-data.ts        # Datos de prueba reutilizables
│       └── auth.fixture.ts        # Setup de autenticación
├── .env.example                   # Template de variables
├── .gitignore
├── playwright.config.ts           # Configuración de Playwright
├── tsconfig.json                  # Configuración TypeScript
├── package.json
├── README-ESPAÑOL.md              # Este archivo
├── README.md                      # Versión en inglés
└── README.md                      # Link a los dos READMEs
```

---

## 🎯 Conceptos Clave

### 1. Autenticación por Tokens JWT

**¿Qué es?** Un sistema donde primero hacemos login y obtenemos un token, que luego incluimos en requests posteriores.

**Flujo:**
```
1. POST /auth (login) → recibimos token
2. Guardamos el token en la clase
3. Incluimos Authorization header en requests posteriores
```

**Por qué es importante:** Simula autenticación real en APIs profesionales.

**Implementación:**
```typescript
// Paso 1: Login
const loginResponse = await auth.login('admin', 'password123');
const token = loginResponse.token;

// Paso 2: Usar token en requests posteriores
bookingsAPI.setToken(token);
const bookings = await bookingsAPI.getBookings();
```

---

### 2. Patrón de Cliente Base (APIClient)

**¿Por qué?** Evitar repetir headers, autenticación, y lógica de requests en cada método.

**Beneficios:**
- ✅ DRY (Don't Repeat Yourself)
- ✅ Cambios centralizados
- ✅ Manejo consistente de errores

```typescript
// ❌ SIN patrón (repetimos código)
async getBooking(id: number) {
  const response = await fetch(`${BASE_URL}/booking/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', ... }
  });
  return response.json();
}

// ✅ CON patrón (reutilizamos)
async getBooking(id: number) {
  return this.request('GET', `/booking/${id}`);
}
```

---

### 3. Validaciones en Respuestas

**¿Qué validamos?**

1. **Código de estado HTTP** (200, 201, 400, 401, 404, etc.)
2. **Estructura JSON** (que existan las propiedades esperadas)
3. **Tipos de datos** (string, number, boolean, etc.)
4. **Valores específicos** (comparar valores concretos)

**Ejemplo:**
```typescript
test('Respuesta de booking tiene estructura correcta', async () => {
  const response = await bookingsAPI.getBooking(1);
  
  // 1. Validar status
  expect(response.status).toBe(200);
  
  // 2. Validar estructura
  expect(response.body).toHaveProperty('firstname');
  expect(response.body).toHaveProperty('lastname');
  
  // 3. Validar tipos
  expect(typeof response.body.totalprice).toBe('number');
  expect(typeof response.body.firstname).toBe('string');
  
  // 4. Validar valores
  expect(response.body.totalprice).toBeGreaterThan(0);
  expect(response.body.firstname).not.toBe('');
});
```

---

### 4. Casos Edge (Casos Límite)

**¿Qué son?** Situaciones extremas o incorrectas que probamos.

**Ejemplos:**
```typescript
// ID negativo
await bookingsAPI.getBooking(-1);

// ID inexistente (muy grande)
await bookingsAPI.getBooking(999999);

// Campos obligatorios faltantes
await bookingsAPI.createBooking({ lastname: 'Pérez' }); // falta firstname

// Valores inválidos
await bookingsAPI.createBooking({ 
  firstname: '', // string vacío
  totalprice: -100 // número negativo
});
```

**¿Por qué importa?** Encontramos bugs que otros testes no encuentran.

---

### 5. Fixtures (Setup de Tests)

**¿Qué son?** Datos y configuración que reutilizamos en múltiples tests.

**Ventajas:**
- ✅ No repetimos setup
- ✅ Tests más limpios
- ✅ Datos centralizados

```typescript
// fixtures/booking-data.ts
export const validBookingData = {
  firstname: 'Juan',
  lastname: 'Pérez',
  totalprice: 150,
  depositpaid: true,
  bookingdates: {
    checkin: '2024-01-15',
    checkout: '2024-01-20'
  }
};

// tests/specs/bookings.spec.ts
test('Crear reserva', async () => {
  const response = await bookingsAPI.createBooking(validBookingData);
  expect(response.status).toBe(200);
});
```

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Test Completo de Autenticación

```typescript
import { test, expect } from '@playwright/test';
import { AuthAPI } from '../api/auth.api';

test.describe('Authentication', () => {
  let authAPI: AuthAPI;

  test.beforeEach(() => {
    authAPI = new AuthAPI();
  });

  test('Login con credenciales válidas retorna token', async () => {
    const response = await authAPI.login(
      process.env.ADMIN_USERNAME!,
      process.env.ADMIN_PASSWORD!
    );

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(typeof response.body.token).toBe('string');
    expect(response.body.token.length).toBeGreaterThan(0);
  });

  test('Login con credenciales inválidas retorna 403', async () => {
    const response = await authAPI.login('admin', 'password_incorrecto');
    expect(response.status).toBe(403);
  });
});
```

### Ejemplo 2: Test de CRUD Completo

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

  test('CREATE - Crear reserva', async () => {
    const response = await bookingsAPI.createBooking(newBooking);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('bookingid');
    expect(response.body.booking.firstname).toBe(newBooking.firstname);
    
    bookingId = response.body.bookingid;
  });

  test('READ - Obtener reserva por ID', async () => {
    const response = await bookingsAPI.getBooking(bookingId);
    
    expect(response.status).toBe(200);
    expect(response.body.firstname).toBe(newBooking.firstname);
    expect(response.body.totalprice).toBe(newBooking.totalprice);
  });

  test('UPDATE - Actualizar reserva', async () => {
    const updatedData = { ...newBooking, firstname: 'Miguel' };
    const response = await bookingsAPI.updateBooking(bookingId, updatedData);
    
    expect(response.status).toBe(200);
    expect(response.body.firstname).toBe('Miguel');
  });

  test('DELETE - Eliminar reserva', async () => {
    const response = await bookingsAPI.deleteBooking(bookingId);
    
    expect(response.status).toBe(201);
  });
});
```

### Ejemplo 3: Test de Casos Edge

```typescript
test.describe('Bookings - Edge Cases', () => {
  
  test('No permite crear booking sin firstname', async () => {
    const invalidBooking = {
      lastname: 'Pérez',
      totalprice: 100,
      depositpaid: true,
      bookingdates: { checkin: '2024-01-01', checkout: '2024-01-05' }
    };
    
    const response = await bookingsAPI.createBooking(invalidBooking);
    expect(response.status).toBe(400); // Bad Request
  });

  test('No permite precio negativo', async () => {
    const invalidBooking = {
      firstname: 'Juan',
      lastname: 'Pérez',
      totalprice: -50, // Negativo
      depositpaid: true,
      bookingdates: { checkin: '2024-01-01', checkout: '2024-01-05' }
    };
    
    const response = await bookingsAPI.createBooking(invalidBooking);
    expect(response.status).toBe(400);
  });

  test('Obtener booking con ID inexistente retorna 404', async () => {
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
Aumenta el timeout en `.env`:
```env
REQUEST_TIMEOUT=10000  # 10 segundos
```

### "Unauthorized 401"
Verifica que:
1. Las credenciales en `.env` son correctas
2. El token se está pasando correctamente en los headers
3. El token no ha expirado

### "Test hangs/congelado"
Agrega timeout en `playwright.config.ts`:
```typescript
test.setTimeout(30000); // 30 segundos
```

---

## 🤝 Contribuciones

Este es un proyecto educativo abierto a mejoras. Si querés contribuir:

1. Fork el repositorio
2. Crea una rama: `git checkout -b feature/mi-feature`
3. Commit tus cambios: `git commit -m 'Agrego feature X'`
4. Push: `git push origin feature/mi-feature`
5. Abre un Pull Request

### Áreas para mejorar:
- [ ] Tests de performance/carga
- [ ] Implementar retry logic para requests fallidos
- [ ] Reportes más detallados
- [ ] Integración con Slack/email
- [ ] Tests paralelos
- [ ] CI/CD mejorado con GitHub Actions

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**. Ver [LICENSE](./LICENSE) para más detalles.

---

## 📚 Recursos Útiles

- [Documentación oficial Restful Booker](https://restful-booker.herokuapp.com/apidoc/index.html)
- [Guía de Playwright API Testing](https://playwright.dev/docs/api-testing)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Best Practices en REST APIs](https://restfulapi.net/)
- [JSON Web Tokens (JWT)](https://jwt.io/)

---

## 👨‍💻 Autor

**Iván Reimer**  
QA Automation Engineer SSR | Quilmes, Buenos Aires 🇦🇷

📧 [ivanreimer1@gmail.com](mailto:ivanreimer1@gmail.com)  
🔗 [GitHub](https://github.com/ivanreimer) | [LinkedIn](https://linkedin.com/in/ivan-reimer)

---

**⭐ Si te parece útil, no olvides dejar una estrella en GitHub!**

---

> **Última actualización**: Agosto 2026  
> **Estado**: 🚧 En construcción (proyecto educativo)
