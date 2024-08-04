import { Component, OnInit, inject } from '@angular/core';
import { FirestoreService } from 'src/app/firebase/firestore.service';
import { Models } from 'src/app/models/models';
import { InteractionService } from 'src/app/services/interaction.service';
import { Observable } from 'rxjs';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'app-home-store',
  templateUrl: './home-store.component.html',
  styleUrls: ['./home-store.component.scss'],
})
export class HomeStoreComponent  implements OnInit {

  private firestoreService: FirestoreService = inject(FirestoreService);

  categories$: Observable<Models.Tienda.Category[]>;
  categorySelected: string;

  products: QueryDocumentSnapshot<Models.Tienda.Product>[];
  numItems: number = 8;
  enableMore: boolean = true;


  constructor() { 
    this.loadCategories();
  }

  ngOnInit() {}

  loadCategories() {
    const path = Models.Tienda.pathCategories;
    this.categories$ = this.firestoreService.getDocumentsChanges(path);
    this.categories$.subscribe( res => {
      if (!this.categorySelected && res) {
        this.categorySelected = res[0].id;
        console.log('this.categorySelected -> ', this.categorySelected);
        this.loadProducts();
      }
    });
  }

  segmentChanged() {
    console.log('segmentChanged -> ', this.categorySelected);
    this.products = [];
    this.loadProducts()
  }

  async loadProducts() {
    console.log('loadProducts');
    const path = Models.Tienda.pathProducts;
    const extras: Models.Firestore.extrasQuery = {
      limit: this.numItems,
      // orderParam: 'date',
      // directionSort: 'desc'
    }

    if (this.products) {
      const last = this.products[ this.products.length - 1 ];
      extras.startAfter = last
    }

    // crear regla - crear indice
    const res = await this.firestoreService.getDocumentsQuery<Models.Tienda.Product>(path, 
      [['category.id', '==', this.categorySelected]], extras);

      console.log('loadProducts res -> ', res.size);
      
      if (res.size) {
        if (this.products) {
          this.products.push(...res.docs);
        } else {
          this.products = res.docs;
        }
      }
  
      if (res.size == this.numItems) {
        this.enableMore = true;
      } else {
        this.enableMore = false;
      }
  }

  async loadMore(event: any) {
    console.log('loadMore');
    await this.loadProducts();
    event.target.complete();
  }

}
