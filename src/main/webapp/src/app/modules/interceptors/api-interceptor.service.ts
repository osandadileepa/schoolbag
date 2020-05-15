import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

export const BASE_PATH: string = environment.basePath;

/***
 * interceptor service to inject base path api requests
 *
 * @author Osanda Wedamulla
 */

@Injectable()
export class ApiInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const requestUrl: string = req.url;

    if (requestUrl.startsWith('assets')) {
      return next.handle(req);
    }

    // Skip if base URL contains
    if (requestUrl.includes(BASE_PATH)) {
      return next.handle(req);
    }

    // Skip if base URL is there
    if (requestUrl.startsWith(BASE_PATH)) {
      return next.handle(req);
    }

    const apiReq = req.clone({
      url: `${BASE_PATH}${req.url}`
    });

    return next.handle(apiReq);
  } // intercept()

} // ApiInterceptorService {}
