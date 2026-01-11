import { Component, Input, OnChanges, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-markdown-renderer',
  standalone: true,
  template: `
    <div class="prose prose-invert prose-blue max-w-none text-right" dir="rtl" [innerHTML]="safeHtml"></div>
  `
})
export class MarkdownRendererComponent implements OnChanges {
  @Input() content = '';
  safeHtml: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) {}

  async ngOnChanges() {
    if (this.content) {
      const html = await marked.parse(this.content);
      // In a real app, use sanitizer.sanitize(SecurityContext.HTML, html) but for demo functionality with styling classes:
      this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(html as string);
    }
  }
}
