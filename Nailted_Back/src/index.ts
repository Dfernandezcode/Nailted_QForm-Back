import { app } from "./server/index";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "./swagger-options";

const PORT = 3000;
export const appInstance = app.listen(PORT, () => {
  console.log(`Server levantado en el puerto ${PORT}`);
});

// Swagger
const specs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
