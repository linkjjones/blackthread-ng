import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { Observable, tap, throwError } from "rxjs";
import { catchError } from "rxjs";
import { IProduct } from "../models/product";
import { environment } from 'src/environments/environment';
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { collection, addDoc } from "firebase/firestore"; 

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productUrl = 'api/products/products.json';
    fsApp = initializeApp(environment.firebase);
    fs = getFirestore(this.fsApp);

    newDoc: IProduct = {
        productId: 100,
        productName: "testItem2",
        productCode: "123-123",
        releaseDate: "2022-02-20",
        description: "this a test 2",
        price: 1234,
        starRating: 1.0,
        imageUrl: ""
    }

    constructor(
        private http: HttpClient) {}

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl).pipe(
            tap(data => console.log('All', JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    async addProduct(): Promise<void> {
        try {
            const docRef = await addDoc(collection(this.fs, "bt-products"), this.newDoc);
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
        }
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