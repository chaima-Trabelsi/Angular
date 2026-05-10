// src/app/directives/show-error.directive.ts
import { Directive, Input, ViewContainerRef, TemplateRef, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appShowError]',
  standalone: true
})
export class ShowErrorDirective implements OnInit, OnDestroy {

  // 2. Inputs pour recevoir le contrôle et le type d'erreur
  @Input('appShowError') control!: AbstractControl | null;
  @Input() errorType!: string;

  // Alias pour supporter la syntaxe *appShowError="control; errorType: 'required'"
  @Input('appShowErrorErrorType') set setErrorType(value: string) {
    this.errorType = value;
  }

  private statusSubscription!: Subscription;
  private hasError = false;

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}

  ngOnInit(): void {
    if (!this.control || !this.errorType) {
      console.warn('ShowErrorDirective: control et errorType sont requis');
      return;
    }

    // 3. S'abonner aux changements de statut du contrôle
    this.statusSubscription = this.control.statusChanges.subscribe(() => {
      this.updateView();
    });

    // Vérification initiale
    this.updateView();
  }

  private updateView(): void {
    const shouldShow = this.shouldShowError();

    if (shouldShow && !this.hasError) {
      // Afficher le template
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasError = true;
    } else if (!shouldShow && this.hasError) {
      // Effacer le template
      this.viewContainer.clear();
      this.hasError = false;
    }
  }

  private shouldShowError(): boolean {
    if (!this.control || !this.control.touched) {
      return false;
    }
    return this.control.hasError(this.errorType);
  }

  ngOnDestroy(): void {
    // Nettoyer l'abonnement pour éviter les fuites mémoire
    if (this.statusSubscription) {
      this.statusSubscription.unsubscribe();
    }
  }
}
