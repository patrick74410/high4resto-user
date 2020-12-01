import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HtmlToPlainTextPipe } from './html-to-plain-text.pipe';

@NgModule({
    declarations: [HtmlToPlainTextPipe],
    imports: [CommonModule],
    exports: [HtmlToPlainTextPipe],
})
export class PipesModule {}
