import { HttpClient } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { JsonFormData } from "../../models/json-form-data";
import { faTrashCan, faEdit } from "@fortawesome/free-regular-svg-icons";
import { ProductService } from "../product.service";
import { doc } from "firebase/firestore";

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
    editIcon = faEdit;
    trashIcon = faTrashCan;

    pageTitle = 'Product List';
    imageWidth = 50;
    imageMargin: number = 2;
    showImage: boolean = true;
    errorMessage: string = '';@
    formDataSub!: Subscription;
    productDataSub!: Subscription;
    private _listFilter: string = '';
    public formData!: JsonFormData;
    public selectedProduct!: any;
    filteredProducts$: any[] = [];
    products: any[] = [];

    constructor(
        private _productService: ProductService,
        private http: HttpClient,
    ) {}

    ngOnInit(): void {
        // get form data
        this.getFormData();
        // get product data
        this.getProductData();
    }

    getFormData(): void {
        this.formDataSub = this._productService.getFormData().subscribe({
            next: (data: any) => {
                this.formData = data;
            },
            error: (err: any) => this.errorMessage = err
        });
    }

    getProductData(): void {
        this.productDataSub = this._productService.allProducts.subscribe({
            next: (data: any) => {
                this.products = data;
                this.filteredProducts$ = this.products;
            },
            error: (err: any) => this.errorMessage = err
        });
    }

    get listFilter(): string {
        return this._listFilter;
    }

    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts$ = this.performFilter(value);
    }

    performFilter(filterBy: string): any[] {
        filterBy = filterBy.toLowerCase();
        return this.products.filter((product: any) => 
        product.productName.toLowerCase().includes(filterBy));
    }
    
    toggleImages(): void {
        this.showImage = !this.showImage;
    }
    
    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List' + message;
    }

    onEditClicked(product: any): void {
        this.pageTitle = 'Edit: ' + product.productName;
    }

    onDeleteClicked(productId: string): void {
        this.pageTitle = 'Delete: ' + productId;
    }

    ngOnDestroy(): void {
        this.formDataSub.unsubscribe();
    }
}