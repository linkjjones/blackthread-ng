import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { Observable, tap, throwError } from "rxjs";
import { catchError } from "rxjs";
import { IProduct } from "../models/product";
import { environment } from 'src/environments/environment';
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { collection, addDoc } from "firebase/firestore"; 
import { JsonFormData } from "../models/json-form-data";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productUrl = 'api/products/products.json';
    fsApp = initializeApp(environment.firebase);
    fs = getFirestore(this.fsApp);

    constructor(
        private http: HttpClient) {}

    getProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(this.productUrl);
    }

    // use pipe to console log the data
    // getProducts(): Observable<IProduct[]> {
    //     return this.http.get<IProduct[]>(this.productUrl)
    //         .pipe(tap(data => console.log('All', JSON.stringify(data))),
    //         catchError(this.handleError)
    //     );
    // }

    getFormData(): Observable<FormData> {
        return this.http.get<FormData>('/assets/product-form.json');
    }

    async addProduct(formEntryData?: any): Promise<void> {
        try {
            // cleanup data
            const formEntryDataClean: any = {};
            Object.assign(formEntryDataClean, formEntryData);
            this.castValuesToProperType(formEntryDataClean);
            // send data to firestore
            const docRef = await addDoc(collection(this.fs, "bt-products"), formEntryDataClean);
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    // TODO: read in json file to find correct type for casting
    castValuesToProperType(o: any) {
        // const formData = this.http.get<FormData>('/assets/product-form.json');
        // console.log('from castValuesToProperType: {0}', formData);
        if (o){
            for (let [key, value] of Object.entries(o)) {
                // let controls[] = formData.controls;
                
            }
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