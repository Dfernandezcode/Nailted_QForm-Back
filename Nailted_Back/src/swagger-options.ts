import { type SwaggerOptions } from "swagger-ui-express";

export const swaggerOptions: SwaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Backend-Nailted API",
      version: "1.0.0",
      description: "CRUD API of Nailted",
      license: {
        name: "MIT",
        url: "http://mit.com",
      },
      contact: {
        name: "Team Backend-Nailted",
        url: "https://github.com/daniruiz000/nailted-form-back",
        email: "TeamB@mail.com",
      },
    },
    server: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/mock/mock.ts"],
};
