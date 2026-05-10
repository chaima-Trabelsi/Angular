import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { passwordStrengthValidator, matchPasswordValidator, emailExistsValidator } from '../custom-validators';
import { UserService } from '../services/UserService';
import { ShowErrorDirective } from '../directives/show-error';
import { ValidationService } from '../services/validation';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,ShowErrorDirective],
  templateUrl: './contact-form.html',
  styleUrls: ['./contact-form.css']
})
export class ContactFormComponent implements OnInit {
  contactForm!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private userService: UserService,public validationService: ValidationService 
      // Injection du service
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['',
        [Validators.required, Validators.email],  // Validateurs synchrones
        [emailExistsValidator(this.userService)]  // Validateur asynchrone
      ],
      telephone: ['', [Validators.pattern('0[1-9][0-9]{8}')]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, passwordStrengthValidator()]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: matchPasswordValidator('password', 'confirmPassword') }); // 5. Validateur au niveau du FormGroup
  }

  // Getters
  get nom() { return this.contactForm.get('nom'); }
  get prenom() { return this.contactForm.get('prenom'); }
  get email() { return this.contactForm.get('email'); }
  get telephone() { return this.contactForm.get('telephone'); }
  get message() { return this.contactForm.get('message'); }
  get password() { return this.contactForm.get('password'); }
  get confirmPassword() { return this.contactForm.get('confirmPassword'); }

  onSubmit(): void {
    if (this.contactForm.valid) {
      console.log('Formulaire soumis :', this.contactForm.value);
    }
  }
}
