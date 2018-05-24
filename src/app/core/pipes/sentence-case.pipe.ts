import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sentenceCase'
})
export class SentenceCasePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (typeof value === 'string') {
      if (value.length) {
        return `${value[0].toUpperCase()}${value.slice(1)}`;
      } else {
        return value;
      }
    } else {
      throw new Error('Sentence Case pipe requires the input to be string');
    }
  }

}
