import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { marked } from 'marked';

@Pipe({
  name: 'markdownToHtml',
})
export class MarkdownToHtmlPipe implements PipeTransform {
  transform(value: string): string {
    const parsed_markdown = marked(value, {
      sanitizer(html) {
        return html;
      },
    });
    return parsed_markdown;
  }
}

@Pipe({ name: 'safeHTML' })
export class SafeHTMLPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(text: string, ...args: any[]) {
    return this.sanitizer.bypassSecurityTrustHtml(text);
  }
}
