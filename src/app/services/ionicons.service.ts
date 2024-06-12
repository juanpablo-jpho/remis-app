import { Injectable } from '@angular/core';
import { addIcons } from 'ionicons';
import * as all  from 'ionicons/icons';

import { home, logoIonic, balloon } from 'ionicons/icons';

@Injectable({
  providedIn: 'root'
})
export class IoniconsService {
 
  constructor() { }

  loadListIcons() {
    addIcons({ home, logoIonic, balloon,   });
  }

  loadAllIcons() {
    addIcons(all);
  }

}
