import { Pipe, PipeTransform } from '@angular/core';

// https://stackoverflow.com/a/4339144
function decodeEntities(s) {
    let str,
        temp = document.createElement('p');
    temp.innerHTML = s;
    str = temp.textContent || temp.innerText;
    temp = null;
    return str;
}

@Pipe({
    name: 'htmlToPlainText',
})
export class HtmlToPlainTextPipe implements PipeTransform {
    transform(value: string, ...args: unknown[]): string {
        return value ? decodeEntities(value) : '';
    }
}
