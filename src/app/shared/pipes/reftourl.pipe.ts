import { Pipe, PipeTransform, inject } from '@angular/core';
import { StorageService } from 'src/app/firebase/storage.service';

@Pipe({
  name: 'reftourl'
})
export class ReftourlPipe implements PipeTransform {

  storageService: StorageService = inject(StorageService);

  async transform(ref: string) {
    if (ref.search('http') == 0) {
      return ref;
    }
    const url = await this.storageService.getDownloadURL(ref);
    console.log('transform url -> ', url);
    return url;
  }

  

}
