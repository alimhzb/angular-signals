import {Component, computed, inject, linkedSignal, signal} from '@angular/core';
import {ProductService} from '../product.service';
import {FormsModule} from '@angular/forms';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-product-selection',
  imports: [
    FormsModule,
    CurrencyPipe
  ],
  templateUrl: './product-selection.html',
  styleUrl: './product-selection.css'
})
export class ProductSelection {
  pageTitle = 'Product Selection';
  private productService = inject(ProductService);

  // Reference the resource properties to simplify the code
  products = this.productService.productsResource.value;
  isLoading = this.productService.productsResource.isLoading;
  error = this.productService.productsResource.error;
  errorMessage = computed(() => this.error() ? this.error()?.message : '');

  // Signals used by the template
  selectedProduct = this.productService.selectedProduct;
  quantity = signal(1);
  // quantity = linkedSignal({
  //   source: this.selectedProduct,
  //   computation: p => 1
  // });

  // React to changes and recompute
  total = computed(() => (this.selectedProduct()?.price ?? 0) * this.quantity());
  color = computed(() => this.total() > 200 ? 'green' : 'blue');

  onDecrease() {
    this.quantity.update(q => q <= 0 ? 0 : q - 1);
  }
  onIncrease() {
    this.quantity.update(q => q + 1);
  }

}
