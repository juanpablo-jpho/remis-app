import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Models } from 'src/app/models/models';

@Component({
  selector: 'app-item-product',
  templateUrl: './item-product.component.html',
  styleUrls: ['./item-product.component.scss'],
})
export class ItemProductComponent  implements OnInit {

  @Input() product: Models.Tienda.Product 

  constructor(private router: Router) { }

  ngOnInit() {}

  gotoProduct() {
    this.router.navigate(['/store/item', this.product.enlacePermanente], {state: {product: this.product}})

  }

}
