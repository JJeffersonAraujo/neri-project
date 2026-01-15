import { UseBefore } from 'routing-controllers';
import { EnsureAuthMiddleware } from '../../shared/middleware/EnsureAuthMiddleware';

export function EnsureAuth() {
  return UseBefore(EnsureAuthMiddleware);
}
