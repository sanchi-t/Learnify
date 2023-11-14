import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleTruncate'
})
export class TitleTruncatePipe implements PipeTransform {
  transform(value: string): string {
    // Split the title by the first occurrence of newline character
    const parts = value.split('\r\n');
    return parts[0]; // Return the first part (before the newline)
  }
}
