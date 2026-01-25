export function LogExecution() {
    return function (_target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            const start = Date.now();
            try {
                const result = originalMethod.apply(this, args);
                // Caso o método seja async
                if (result instanceof Promise) {
                    return result.finally(() => {
                        const time = Date.now() - start;
                        console.log(`[${propertyKey}] executado em ${time}ms`);
                    });
                }
                // Caso seja sync
                const time = Date.now() - start;
                console.log(`[${propertyKey}] executado em ${time}ms`);
                return result;
            }
            catch (error) {
                const time = Date.now() - start;
                console.log(`[${propertyKey}] falhou em ${time}ms`);
                throw error;
            }
        };
    };
}
//# sourceMappingURL=LogExecution.js.map