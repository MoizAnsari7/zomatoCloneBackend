// Role Decorator to specify the allowed roles for a route
import { SetMetadata } from '@nestjs/common';
import { Role } from '../roles.enum';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
