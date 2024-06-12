import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filetourl'
})
export class FiletourlPipe implements PipeTransform {

  transform(file: File | any): string {
    if (typeof file == 'string') {
      if (file.search('http') == 0) {
        return file;
      }
    }
    return URL.createObjectURL(file);
  }

}
