import { Pipe, PipeTransform } from '@angular/core';
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
