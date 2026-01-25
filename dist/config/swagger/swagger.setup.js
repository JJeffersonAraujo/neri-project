import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" with { type: "json" };
export function setupSwagger(app) {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
//# sourceMappingURL=swagger.setup.js.map