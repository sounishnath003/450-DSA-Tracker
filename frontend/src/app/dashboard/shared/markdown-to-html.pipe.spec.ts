import { MarkdownToHtmlPipe } from './markdown-to-html.pipe';

describe('MarkdownToHtmlPipe', () => {
  it('create an instance', () => {
    const pipe = new MarkdownToHtmlPipe();
    expect(pipe).toBeTruthy();
  });
});
