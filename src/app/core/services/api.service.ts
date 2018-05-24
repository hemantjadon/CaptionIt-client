import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ApiResponseSchema } from '../../shared/schema/api-response';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
  private readonly apiUrl = 'http://localhost:8000/api/';

  private httpOptions = {
    headers: new HttpHeaders()
  };

  constructor(
    private http: HttpClient
  ) { }

  public getCaption(img: Blob): Observable<ApiResponseSchema> {
    const image = { i: 1 };
    const imgExt = img.type.split('/')[1];
    const imgFile =
      new File([img], `user_img.${imgExt}`, { lastModified: Date.now(), type: img.type });
    const formData = new FormData();
    formData.append('image', imgFile);
    return this.http.post<ApiResponseSchema>(this.apiUrl, formData, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
