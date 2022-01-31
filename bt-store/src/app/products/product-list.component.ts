import { Component } from "@angular/core";
import { IProduct } from "./product";
import { ProductService } from "./product.service";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductionListComponent {
constructor(private productService: ProductService) {}

    pageTitle = 'Product List';
    imageWidth = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    
    private _listFilter: string = '';
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        console.log('in setter: ', value);
        this.filteredProducts = this.performFilter(value);
    }

    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];

    ngOnInit(): void {
        this.listFilter = '';
        // get data
        this.products = this.productService.getProducts();
        this.filteredProducts = this.products;
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
}