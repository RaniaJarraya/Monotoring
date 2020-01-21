import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';
import { Tokens } from '../auth/models/tokens';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  user;
  firstName ='';
  lastName ='';
  email ='';
  levelPermission ='';
  picture;
  picture1;
  jwt='';
  id;
  constructor(private authService: AuthService,  private router: Router,private token:Tokens,private sanitizer:DomSanitizer) { }

  ngOnInit() {
    
     
     console.log(this.token.userId)
     //this.jwt =this.authService.token;
     //console.log(this.jwt)
     this.authService.getUserProfile().subscribe(
       res => {
         console.log(res)
         this.firstName=res['firstName'] ;
         this.lastName=res['lastName'] ;
         this.email=res['email'] ;
         this.picture=res['url'];
        //console.log(this.picture);
        this.picture1="data:image/png;base64,"+this.picture;
       },
       err => { 
         console.log(err);
         
       }
     );
  }

  transform(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.picture1);
}

  logout() {

    this.authService.logout().subscribe(success => {
      if (success) {
        this.router.navigate(['/']);
      }
    });
  }

} 
