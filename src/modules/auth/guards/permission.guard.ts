import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import e from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';

const PermissionGuard = (permission: string): Type<CanActivate> => {
  class PermissionGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest<any>();
      const user = request.user;
      if (user && user.isFullPermission) {
        return true;
      }
      if(!user || !user.permissions) {
        return false
      }
      const result =  user?.permissions.includes(permission);
      return result
    }
  }

  return mixin(PermissionGuardMixin);
};

export default PermissionGuard;
