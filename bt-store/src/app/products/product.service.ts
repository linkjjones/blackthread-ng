import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http"
import { Observable, of, Subscriber, Subscription, tap, throwError } from "rxjs";
import { catchError } from "rxjs";
import { IProduct } from "../models/product";
import { environment } from 'src/environments/environment';
import { initializeApp } from "firebase/app"
import { getFirestore, collection, query, where, getDocs, QuerySnapshot, snapshotEqual } from "firebase/firestore"
import { addDoc, doc, onSnapshot } from "firebase/firestore"; 
import { JsonFormData } from "../models/json-form-data";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private productUrl = 'api/products/products.json';
    fsApp = initializeApp(environment.firebase);
    fs = getFirestore(this.fsApp);
    formDataSub!: Subscription;
    productDataSub!: Subscription;
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

        // subscribe to firestore collection
        
    }
    
    getFormData(): Observable<FormData> {
        return this.http.get<FormData>('/assets/product-form.json');
    }
        
    // getProductsAll(): Observable<any[]> {
    //     const q = query(collection(this.fs, "bt-products"));
    //     const unsub = onSnapshot(q, (querySnapshot) => {
    //         const products: any = [];
    //         products.forEach((product: any) => {
    //             products.push(product.data())
    //         });
    //         this.productData = products;
    //     });
    //     return new Observable(subscriber => {
    //         subscriber.next(this.productData);
    //     });
    // }

    allProducts = new Observable((observer) => {
        const q = query(collection(this.fs, "bt-products"));
        onSnapshot(q,(snapshot) => {
            let products: any = [];
            snapshot.docs.forEach((doc) => {
                products.push({...doc.data(), id: doc.id });
            });
            this.productData = products;
            observer.next(this.productData);
        });
    });


    // getProducts(): Observable<IProduct[]> {
        //     return this.http.get<IProduct[]>(this.productUrl);
    // }

    // getProductsAll = new Promise(async (resolve) => {
    //     const querySnapshot = await getDocs(collection(this.fs, "bt-products"));
    //     querySnapshot.forEach((doc) => {
    //         this.productData.push(doc.data());
    //     });
    //     resolve(this.productData);
    // })

    // use pipe to console log the data
    // getProducts(): Observable<IProduct[]> {
    //     return this.http.get<IProduct[]>(this.productUrl)
    //         .pipe(tap(data => console.log('All', JSON.stringify(data))),
    //         catchError(this.handleError)
    //     );
    // }

    async addProduct(formEntryData?: any): Promise<string> {
        // console.log(formEntryData);
        let msg = "Error adding document: ";
        try {
            // cleanup data
            const formEntryData: any = {};
            Object.assign(formEntryData, formEntryData);
            this.castValuesToProperType(formEntryData);
            // send data to firestore
            const docRef = await addDoc(collection(this.fs, "bt-products"), formEntryData);
            // this.getProductsAll;
            msg = "Document written with ID: ", docRef;
          } catch (e) {
            msg += e;
        }
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