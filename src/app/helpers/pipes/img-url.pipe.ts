import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'imgUrl',
})
export class ImgUrlPipe implements PipeTransform {
  transform(value: string | null): string | null {
    if (!value) return null;
    const BASE_URL = 'https://icherniakov.ru/yt-course/';
    return BASE_URL + value;
  }
}
