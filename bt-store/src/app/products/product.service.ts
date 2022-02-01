import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { Observable, tap, throwError } from "rxjs";
import { catchError } from "rxjs";
import { IProduct } from "./product";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productUrl = 'api/products/products.json';

    constructor(private http: HttpClient) {}

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => console.log('All', JSON.stringify(data))),
            catchError(this.handleError)
        );

    }

    private handleError(err: HttpErrorResponse) {
        //log the error
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            // A client-side or network error occurred
            errorMessage = `An error occurred: ${err.error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}