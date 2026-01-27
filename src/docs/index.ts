import { authSwagger } from '../docs/auth.swagger.js'
import { userSwagger } from '../docs/user.swagger.js'

export const docs = {
  tags: [
    ...authSwagger.tags,
    ...userSwagger.tags,
  ],
  paths: {
    ...authSwagger.paths,
    ...userSwagger.paths,
  },
}
