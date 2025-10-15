import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'markdown',
  standalone: true
})
export class MarkdownPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    if (!value) return '';
    // Basic Markdown to HTML conversion
    // let html = value
      // .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      // .replace(/^###\s*(.*)$/gm, '<i><strong>$1</strong></i>')// Bold
      // .replace(/\n/g, '<br>') // Line breaks
      // .replace(/^- (.*?)$/gm, '<li>$1</li>') // Bullet points
      // .replace(/(<li>.*?<\/li>)/g, '<ul>$1</ul>'); // Wrap lists

      let html = value
  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
  .replace(/^###\s*(.*)$/gm, '<i><strong>$1</strong></i>') // Header style
  .replace(/\n/g, '<br>') // Line breaks
  .replace(/^- (.*?)$/gm, '<li>$1</li>') // Bullet points
  .replace(/(<li>.*?<\/li>)/g, '<ul>$1</ul>') // Wrap lists
  // Markdown-style links [text](url)
  // .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2"  target="_blank" >$1</a>')


  .replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    '<a href="$2" onclick="window.open(\'$2\', \'_blank\', \'noopener,noreferrer\'); return false;">$1</a>'
  )
  // Plain URLs
  // .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" >$1</a>');

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
