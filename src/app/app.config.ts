import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { testDelayInterceptor } from 'src/interceptors/test-delay.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([testDelayInterceptor]),
    )
  ]
};
