import { Component } from "@angular/core";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html'
})
export class ProductionListComponent {
    pageTitle = 'Product List';
    imageWidth = 50;
    imageMargin: number = 2;
    showImages: boolean = false;
    products: any[] = [
        {
            "productId": 2,
            "productName": "Hot Sneaks",
            "productCode": "HSN-0023",
            "releaseDate": "May 24, 2022",
            "description": "Basketball shoes that make you jump higher and run faster.",
            "price": 144000.07,
            "starRating": 5.0,
            "imageUrl": "assets/images/hot_sneaks.jpg"
        },
        {
            "productId": 3,
            "productName": "Jumper",
            "productCode": "JPR-1234",
            "releaseDate": "July 31, 1980",
            "description": "Nice cool jumper",
            "price": 70.70,
            "starRating": 4.8,
            "imageUrl": "assets/images/jumper.jpg"
        }
    ];

    toggleImages(): void {
        this.showImages = !this.showImages;
    }
}