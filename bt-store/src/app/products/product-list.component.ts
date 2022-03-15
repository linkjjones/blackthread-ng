import { HttpClient } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { JsonFormData } from "../models/json-form-data";
import { IProduct } from "../models/product";
import { ProductService } from "./product.service";

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
    
    pageTitle = 'Product List';
    imageWidth = 50;
    imageMargin: number = 2;
    showImage: boolean = true;
    errorMessage: string = '';
    productSub!: Subscription;
    formDataSub!: Subscription;
    private _listFilter: string = '';
    public formData!: JsonFormData;
    
    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];

    constructor(
        private productService: ProductService,
        private http: HttpClient
    ) {}

    ngOnInit(): void {
        // get product data
        this.getProductData();
        // get form data
        this.getFormData();
    }

    getProductData(): void {
        this.productSub = this.productService.getProducts().subscribe({
            next: (products: any) => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error: (err: any) => this.errorMessage = err
        });
    }

    getFormData(): void {
        this.formDataSub = this.productService.getFormData().subscribe({
            next: (data: any) => {
                this.formData = data;
            },
            error: (err: any) => this.errorMessage = err
        });
    }

    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        // console.log('in setter: ', value);
        this.filteredProducts = this.performFilter(value);
    }

    ngOnDestroy(): void {
        this.productSub.unsubscribe();
    }
    
    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLowerCase();
        return this.products.filter((product: IProduct) => 
            product.productName.toLowerCase().includes(filterBy));
    }

    toggleImages(): void {
        this.showImage = !this.showImage;
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List ' + message;
    }

    addProduct(): void {
        this.productService.addProduct();
    }
}