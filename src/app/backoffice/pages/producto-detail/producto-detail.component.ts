import { Component, OnInit, inject } from '@angular/core';
import { QuerySnapshot } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from 'src/app/firebase/firestore.service';
import { StorageService } from 'src/app/firebase/storage.service';
import { Models } from 'src/app/models/models';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-producto-detail',
  templateUrl: './producto-detail.component.html',
  styleUrls: ['./producto-detail.component.scss'],
})
export class ProductoDetailComponent  implements OnInit {


  private firestoreService: FirestoreService = inject(FirestoreService);
  private interactionService: InteractionService = inject(InteractionService);
  private storageService: StorageService = inject(StorageService);

  product = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>(''),
    price: new FormControl<number>(null, [Validators.required]),
    enlacePermanente: new FormControl<string>('', [Validators.required]),
    images: new FormControl<string[]>([]),
    category: new FormControl<string>(null, [Validators.required])
  });

  categories: QuerySnapshot<Models.Tienda.Category>;

  productExist: Models.Tienda.Product;

  images: File[] = [];

  constructor(private router: Router,
    private route: ActivatedRoute) { 
      this.getQueryParams();
      this.loadCategories();
  }



  ngOnInit() {}

  async save() {
    console.log('this.product.valid -> ', this.product.valid);
    if (this.product.valid) {
      try {
        await this.interactionService.showLoading('Guardando...');
        // subir imagenes
        await this.saveImages();
        const data = this.product.value;
        console.log('data -> ', data);
        const path = Models.Tienda.pathProducts;
        const category = this.categories.docs.find( category => category.data().id == data.category );
        data.category = category.data() as any;

        // crear regla en la base de datos
        if (this.productExist) {
          await this.firestoreService.updateDocument(`${path}/${this.productExist.id}`, data);
        } else {
          await this.firestoreService.createDocument(path, data)
        }
        this.interactionService.dismissLoading();
        this.interactionService.showToast('Guardado con éxito');
        // navegadar de vuelta a la página de categorias
        // this.router.navigate(['/backoffice/ajustes/productos'])
      } catch (error) {
        // capturar el error -> pero mostrar en la consola para saber que sucedió
        console.error(error)
        this.interactionService.dismissLoading();
        this.interactionService.presentAlert('Error', 'No se pudo guardar')
      }
    }
  }

  async loadCategories() {
    const path = Models.Tienda.pathCategories;
    this.categories = await this.firestoreService.getDocuments(path)
  }

  getQueryParams() {
    this.route.queryParams.subscribe( (query: any) => {
        if (query.id) {
          this.loadProduct(query.id)
        }
    });
  }

  async loadProduct(id: string) {
    await this.interactionService.showLoading('Cargando...');
    const path = Models.Tienda.pathProducts;
    const response = await this.firestoreService.getDocument<Models.Tienda.Product>(`${path}/${id}`)
    this.interactionService.dismissLoading();
    if (response.exists()) {
      this.productExist = response.data();
      console.log(' this.productExist -> ',  this.productExist);
      this.product.setValue({
        name: this.productExist.name,
        description: this.productExist.description,
        price: this.productExist.price,
        enlacePermanente: this.productExist.enlacePermanente ? this.productExist.enlacePermanente : '',
        category: this.productExist.category.id,
        images: this.productExist.images
      })
    }
    
  }

  async viewPreview(input: HTMLInputElement) {
    if (input.files.length) {
        for (let index = 0; index < input.files.length; index++) {
          const image = input.files.item(index);
          this.images.push(image);
        }
        console.log('viewPreview files -> ', this.images);
    }
  }

  remove(index: number) {
    this.images.splice(index, 1);
  }

  async saveImages() {
    // agregar reglas en storage
    const path = Models.Tienda.folderProducts;
    const images = this.product.controls.images.value;
    for (let index = 0; index < this.images.length; index++) {
      const image = this.images[index];
      const response = await this.storageService.uploadFile(path, image.name, image);
      const url = await this.storageService.getDownloadURL(response.ref.fullPath);
      images.push(url)
    }
    this.product.controls.images.setValue(images);
    this.images = [];
  }

  async deleteImage(url: string, index: number) {
    const response = await this.interactionService.presentAlert('Importante', 
        '¿Seguro que desea eliminar esta imagen?','Cancelar', 'Eliminar');
    if (response) {
      try {
        await this.interactionService.showLoading('Eliminando...');
        await this.storageService.deleteFile(url);
        // eliminar manualmente del formulario
        const images = this.product.controls.images.value;
        images.splice(index, 1);
        const updateDoc = { images }
        const path = Models.Tienda.pathProducts;
        await this.firestoreService.updateDocument(`${path}/${this.productExist.id}`, updateDoc)
        this.interactionService.dismissLoading();
      } catch (error) {
        console.error(error);
        this.interactionService.presentAlert('Error', 'No se pudo eliminar');
      }
    }

  }

  

}
