import { authSwagger } from '../../docs/auth.swagger.js'
import { userSwagger } from '../../docs/user.swagger.js'
import { jornadaSwagger } from '../swagger/jornada.swagger.js'
import { routeSwagger } from '../swagger/route.swagger.js'

export const tags = [
  ...authSwagger.tags,
  ...userSwagger.tags,
  ...jornadaSwagger.tags,
  ...routeSwagger.tags,
]

export const paths = {
  ...authSwagger.paths,
  ...userSwagger.paths,
  ...jornadaSwagger.paths,
  ...routeSwagger.paths,
}
