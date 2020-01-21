import { Component, OnInit } from '@angular/core';
//import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //loginForm: FormGroup;
  credentials = {
    email: '',
    password: ''
  };
  constructor(private authService: AuthService, private router: Router,private alertCtrl: AlertController) { }

  ngOnInit() {
   
  }
  
  login() {
    this.authService.login(this.credentials).subscribe(async res => {
      if (res) {
        this.router.navigateByUrl('/tab/home');
      } else {
        const alert = await this.alertCtrl.create({
          header: 'Login Failed',
          message: 'Wrong credentials.',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }

}
