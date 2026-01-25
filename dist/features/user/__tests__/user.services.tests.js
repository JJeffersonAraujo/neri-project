import swaggerJsdoc from 'swagger-jsdoc';
export const swaggerConfig = swaggerJsdoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Saúde',
            version: '1.0.0'
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer'
                }
            }
        }
    },
    apis: ['./src/features/**/routes/*.ts']
});
//# sourceMappingURL=user.services.tests.js.map