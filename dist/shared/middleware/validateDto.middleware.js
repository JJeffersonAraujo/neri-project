export function validateDto(schema) {
    return (req, res, next) => {
        const parsed = schema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                message: 'Erro de validação',
                errors: parsed.error.format()
            });
        }
        req.body = parsed.data;
        next();
    };
}
