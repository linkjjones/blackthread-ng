import { ConditionalExpr } from '@angular/compiler';
import {
	Component,
	Input,
	Output,
	OnInit,
	SimpleChanges,
	OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { jsonFormControls, JsonFormData } from 'src/app/models/json-form-data';
import { IProduct } from '../../models/product';
import { ProductService } from '../product.service';

@Component({
	templateUrl: './product-detail.component.html',
	styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
	// Form Data
	@Input() jsonFormData!: JsonFormData;
	@Input() productData!: any;
	public productForm: FormGroup = this.fb.group({})

	pageTitle: string = 'Product Detail';
	product: IProduct | undefined;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private fb: FormBuilder,
		private productService: ProductService) { }

	ngOnInit(): void {
		// read in the route parameter
		const id = this.route.snapshot.paramMap.get('id');
		console.log(id);
		// TODO: get firestore doc using id
		if (id != null || undefined) {
			this.pageTitle = 'Add New Product';
		} else {
			this.pageTitle = `Edit id: ${id}`;
		}
	}

	ngOnChanges(changes: SimpleChanges) {
		// When the data is loaded via the http request, the input will change
		if (!changes['jsonFormData'].firstChange) {
			this.createForm(this.jsonFormData.controls);
		}

		// When product data is pushed via productData
		if (!changes['productData'].currentValue) {
			console.log('adding selected product to form fields.');
			console.log(this.productData);
		}
	}
	
	createForm(controls: jsonFormControls[]) {
		for (const control of controls) {
			const validatorsToAdd = [];
			
			for (const [key, value] of Object.entries(control.validators)) {
				switch (key) {
					case 'min':
						validatorsToAdd.push(Validators.min(value));
						break;
						case 'max':
							validatorsToAdd.push(Validators.max(value));
							break;
							case 'required':
								if (value) {
									validatorsToAdd.push(Validators.required);
								}
								break;
					case 'requiredTrue':
						if (value) {
							validatorsToAdd.push(Validators.requiredTrue);
						}
						break;
					case 'email':
						if (value) {
							validatorsToAdd.push(Validators.email);
						}
						break;
						case 'minLength':
							validatorsToAdd.push(Validators.minLength(value));
						break;
						case 'maxLength':
							validatorsToAdd.push(Validators.maxLength(value));
							break;
							case 'pattern':
								validatorsToAdd.push(Validators.pattern(value));
						break;
						case 'nullValidator':
							if (value) {
							validatorsToAdd.push(Validators.nullValidator);
						}
						break;
						default:
						break;
					}
			}
			
			control
			this.productForm.addControl(
				control.name,
				this.fb.control(control.value, validatorsToAdd)
			);
		}
	}

	onSubmit() {
		formEntryData: { };
		// const formEntryData = this.productForm.value;
		if (this.productForm.valid) {
			this.productService.addProduct(this.productForm.value);
			this.productForm.reset();
		} else {
			alert("There is an anvalid input. Try again.");
		}
	}

	onBack(): void {
		this.router.navigate(['/products']);
	}
}
