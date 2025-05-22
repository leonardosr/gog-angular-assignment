import { HttpInterceptorFn } from '@angular/common/http';
import { delay } from 'rxjs';

export const testDelayInterceptor: HttpInterceptorFn = (req, next) => {
  //Add a small delay to every HTTP request to simulate a server response
  return next(req).pipe(delay(150));
};
