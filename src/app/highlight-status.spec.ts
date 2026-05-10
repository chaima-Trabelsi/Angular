import { HighlightStatus } from './highlight-status';
import { ElementRef, Renderer2 } from '@angular/core';

describe('HighlightStatus', () => {
  it('should create an instance', () => {
    // Créer des mocks pour ElementRef et Renderer2
    const mockElementRef = {} as ElementRef;
    const mockRenderer = {} as Renderer2;

    const directive = new HighlightStatus(mockElementRef, mockRenderer);
    expect(directive).toBeTruthy();
  });
});
