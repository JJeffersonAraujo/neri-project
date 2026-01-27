export const IdParamSchema = {
  name: 'id',
  in: 'path',
  required: true,
  description: 'ID do recurso',
  schema: {
    type: 'number',
    example: 1,
  },
}
