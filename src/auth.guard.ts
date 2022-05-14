import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    let count = 0;
    if (request.cookies && request.cookies['count'])
      count = request.cookies['count'];
    else console.log(request.cookies);
    if (count > 5)
      return false;
    let midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    let expire = midnight.getTime() - new Date().getTime();
    response.cookie('count', +count + 1, { maxAge: expire });
    return true;
  }
}
