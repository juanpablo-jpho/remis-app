import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from 'src/app/firebase/firestore.service';
import { Models } from 'src/app/models/models';
import { InteractionService } from '../../../services/interaction.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categoria-detail',
  templateUrl: './categoria-detail.component.html',
  styleUrls: ['./categoria-detail.component.scss'],
})
export class CategoriaDetailComponent  implements OnInit {

  private firestoreService: FirestoreService = inject(FirestoreService);
  private interactionService: InteractionService = inject(InteractionService);
  categoria = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>(''),
  });

  categoriaExist: Models.Tienda.Category;

  constructor(private router: Router,
              private route: ActivatedRoute) { 
                this.getQueryParams();
              }

  ngOnInit() {}

  async save() {
    if (this.categoria.valid) {
      try {
        await this.interactionService.showLoading('Guardando...');
        const data = this.categoria.value;
        console.log('data -> ', data);
        const path = Models.Tienda.pathCategories;
        // crear regla en la base de datos
        if (this.categoriaExist) {
          await this.firestoreService.updateDocument(`${path}/${this.categoriaExist.id}`, data);
        } else {
          await this.firestoreService.createDocument(path, data)
        }
        this.interactionService.dismissLoading();
        this.interactionService.showToast('Guardado con éxito');
        // navegadar de vuelta a la página de categorias
        this.router.navigate(['/backoffice/ajustes/categorias'])
      } catch (error) {
        // capturar el error -> pero mostrar en la consola para saber que sucedió
        console.error(error)
        this.interactionService.dismissLoading();
        this.interactionService.presentAlert('Error', 'No se pudo guardar')
      }
    }
  }

  getQueryParams() {
    this.route.queryParams.subscribe( (query: any) => {
        if (query.id) {
          this.loadCategory(query.id)
        }
    });
  }

  async loadCategory(id: string) {
    await this.interactionService.showLoading('Cargando...');
    const path = Models.Tienda.pathCategories;
    const response = await this.firestoreService.getDocument<Models.Tienda.Category>(`${path}/${id}`)
    this.interactionService.dismissLoading();
    if (response.exists()) {
      this.categoriaExist = response.data();
      this.categoria.setValue({
        name: this.categoriaExist.name,
        description: this.categoriaExist.description
      })
    }
    
  }

}
