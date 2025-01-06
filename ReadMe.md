# Full Stack Todo App

## Setup

1. Clone the repository:

   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies for both backend and client:

   ```sh
   yarn install
   cd client
   yarn install
   cd ..
   ```

3. Copy the example environment file and make necessary changes:

   ```sh
   cp .env.example .env
   ```

4. Update the `.env` file with your database configuration and other required environment variables.

## Running the Application

### Development

To run the application in development mode:

```sh
yarn dev
```

### Build

To build the application:

```sh
yarn build
```

### Production

To start the application in production mode:

```sh
yarn start
```

### Testing

To run tests:

```sh
yarn test
```

To run tests in watch mode:

```sh
yarn test:watch
```

To check test coverage:

```sh
yarn test:coverage
```
