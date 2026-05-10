import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlightStatus]',
  standalone: true
})
export class HighlightStatus implements OnInit {   // ← Meilleur nom

  @Input('appHighlightStatus') status: string = '';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.applyHighlight();
  }

  private applyHighlight() {
    let bgColor = '#f3f4f6';      // gris clair par défaut
    let borderColor = '#9ca3af';

    switch (this.status?.trim()) {
      case 'En attente':
        bgColor = '#fef9c3';      // jaune clair
        borderColor = '#eab308';
        break;
      case 'En cours':
        bgColor = '#dbeafe';      // bleu clair
        borderColor = '#3b82f6';
        break;
      case 'Terminé':
        bgColor = '#d1fae5';      // vert clair (corrigé)
        borderColor = '#10b981';
        break;
      default:
        bgColor = '#f3f4f6';
        borderColor = '#9ca3af';
    }

    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', bgColor);
    this.renderer.setStyle(this.el.nativeElement, 'borderLeftColor', borderColor);
    this.renderer.setStyle(this.el.nativeElement, 'borderLeftWidth', '4px');
    this.renderer.setStyle(this.el.nativeElement, 'padding', '12px');
    this.renderer.setStyle(this.el.nativeElement, 'borderRadius', '8px');
    this.renderer.setStyle(this.el.nativeElement, 'marginBottom', '8px');
  }
}
