import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/firebase/firestore.service';
import { Models } from 'src/app/models/models';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss'],
})
export class ProductoComponent  implements OnInit {

  private firestoreService: FirestoreService = inject(FirestoreService);
  private userService: UserService = inject(UserService);
  @Input() product: Models.Tienda.Product;
  title: string;
  roles: Models.Auth.Roles;

  constructor(private route: ActivatedRoute,
    private router: Router) { 

    const data = this.router.getCurrentNavigation().extras.state as any;
    if (data?.product) {
      console.log('data -> ', data);
      this.router.navigate([], {state: null, replaceUrl: true});
      this.product = data?.product;
      this.title = this.product.name;
    } else {
      this.getParam();
    }
    this.getRol();
    
  }

  ngOnInit() {}

  getParam() {
    this.route.params.subscribe( (params: any) => {
       if (params.enlace) {
          console.log('getParam -> ', params.enlace);
          this.loadProduct(params.enlace)
       }
    });
  }

  async loadProduct(enlace: string) {
    const path = Models.Tienda.pathProducts;
    const extras: Models.Firestore.extrasQuery = {
      limit: 1
    }
    const response = await this.firestoreService.getDocumentsQuery<Models.Tienda.Product>(`${path}`, 
      [['enlacePermanente', '==', enlace]], extras);
    console.log('loadProduct response -> ', response.size);
    
    if (response.size) {
      this.product = response.docs[0].data();
      console.log(' this.product -> ',  this.product);
      this.title = this.product.name;
    }
  }

  async getRol() {
    const user = await this.userService.getState();
    if (user) { 
      this.roles = await this.userService.getRol()
      console.log('getRol -> ', this.roles);
    }
  }

  editProduct() {
    this.router.navigate(['/backoffice/ajustes/producto-detalle'], { queryParams: {id: this.product.id}});
  }

}
