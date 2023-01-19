import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {

  public msgError!: string;

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService ){};
  
  public formAuth: FormGroup = this.formBuilder.group({
    email:['', [Validators.required, Validators.email]],
    pass: ['', [Validators.required]]
  })

  ngOnInit(): void {}

  public submitForm(){
    if(this.formAuth){
        this.authService.sign({
          email: this.formAuth.value.email,
          pass: this.formAuth.value.pass
        }).subscribe({
          next: (res) => res,
          error: (e) => (this.msgError = e),
        })
    }
  }
}
