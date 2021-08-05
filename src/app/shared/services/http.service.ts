import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    private http: HttpClient
  ) {
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status != 500) {
      return throwError(
        error.error || {
          status: error.status,
          message: error.message
        }
      );
    }
    return throwError(
      error.error || {
        status: 500,
        message: 'Internal Server Error'
      }
    );
  }

  buildParameters(params: {
    [param: string]: any
  } = {}) {
    return new HttpParams({
      fromObject: params
    });
  }

  get<T>(url: string, params?: HttpParams): Observable<T> {
    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'json',
      observe: 'response',
      ...(params ? {
        params
      } : undefined)
    }).pipe(
      map((res) => {
        return res.body as T;
      }),
      catchError(error => this.handleError(error))
    );
  }
}
