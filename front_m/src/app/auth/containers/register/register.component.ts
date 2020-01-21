import { Component, OnInit } from '@angular/core';
//import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
//import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
 // registerForm: FormGroup;

  credentials = {
    firstName:'',
    lastName:'',
    email: '',
    password: '',
    permesionLevel: '',
    url:''
  };
  url='';
  url1='';
  base64textString: string;
  constructor(private authService: AuthService ,private sanitizer:DomSanitizer, private router: Router) { }

  ngOnInit() {
   
  }

    register() {
      this.authService.register(this.credentials).subscribe(success => {
        if (success) {
          this.router.navigate(['/']);
        }
      }), (err) => {
        console.error(err);
      };
    }
    transform(){
      return this.sanitizer.bypassSecurityTrustResourceUrl(this.url1);}
    readUrl(evt) {
      var files = evt.target.files;
      var file = files[0];
  
    if (files && file) {
        var reader = new FileReader();
  
        reader.onload = (event:any) => {
         
          var binaryString = event.target.result;
          this.url = event.target.result;
          this.base64textString= btoa(binaryString);
         // console.log(btoa(binaryString));
          this.credentials.url=this.base64textString;
          this.url1="data:image/png;base64,"+this.base64textString;
          //console.log(this.url1)
      }
  
        reader.readAsBinaryString(file);
    }
   }
   _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
           this.base64textString= btoa(binaryString);
           console.log(btoa(binaryString));
   }
  }


