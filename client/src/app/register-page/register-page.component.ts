import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  form: FormGroup
  aSub: Subscription

  constructor(
    private auth:AuthService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(
        null, [Validators.required, Validators.email]
      ),
      password: new FormControl(
        null, [Validators.required, Validators.minLength(6)]
      )
    });
  }

  onSubmit(){
    this.form.disable();
    this.aSub = this.auth.register(this.form.value).subscribe(
      ()=>{
        this.router.navigate(["/login"], {
          queryParams:{
            registered:true
          }
        });
      },
      (err)=>{
        MaterialService.toast(err.error.message);
        console.warn(err);
        this.form.enable();
      }
    );
  }

  ngOnDestroy(){
    if (this.aSub){
      this.aSub.unsubscribe();
    }
  }
}
