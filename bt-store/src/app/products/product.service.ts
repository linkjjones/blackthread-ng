import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { Observable, Subscription, tap, throwError } from "rxjs";
import { catchError } from "rxjs";
import { IProduct } from "../models/product";
import { environment } from 'src/environments/environment';
import { initializeApp } from "firebase/app"
import { collection, getFirestore } from "firebase/firestore"
import { getDocs, addDoc } from "firebase/firestore"; 
import { JsonFormData } from "../models/json-form-data";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productUrl = 'api/products/products.json';
    fsApp = initializeApp(environment.firebase);
    fs = getFirestore(this.fsApp);
    formDataSub!: Subscription;
    public formData!: JsonFormData;
    errorMessage: string = '';
    public productData: any = [];

    constructor(private http: HttpClient) {
            this.formDataSub = this.getFormData().subscribe({
                next: (data: any) => {
                    this.formData = data;
                },
                error: (err: any) => this.errorMessage = err
            });
    }

    // getProducts(): Observable<IProduct[]> {
    //     return this.http.get<IProduct[]>(this.productUrl);
    // }

    getProductsAll = new Promise(async (resolve) => {
        const querySnapshot = await getDocs(collection(this.fs, "bt-products"));
        querySnapshot.forEach((doc) => {
            this.productData.push(doc.data());
        });
        resolve(this.productData);
    })

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

    async addProduct(formEntryData?: any): Promise<string> {
        console.log(formEntryData);
        let msg = "Error adding document: ";
        try {
            // cleanup data
            const formEntryDataClean: any = {};
            Object.assign(formEntryDataClean, formEntryData);
            this.castValuesToProperType(formEntryDataClean);
            // send data to firestore
            const docRef = await addDoc(collection(this.fs, "bt-products"), formEntryDataClean);
            msg = "Document written with ID: ", docRef;
          } catch (e) {
            msg += e;
        }
        console.log(msg);
        return msg;
    }

    // Cast values to correct type based on formData
    castValuesToProperType(o: any) {
        if (o){
            for (let [key, value] of Object.entries(o)) {
                let controls = this.formData.controls;
                let controlType = controls.find(obj => obj.name === key)?.type;
                if (controlType === 'number' && value != ''){
                    o[key] = parseFloat(o[key]);
                }
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
        return throwError(() => new Error(errorMessage));
    }
}