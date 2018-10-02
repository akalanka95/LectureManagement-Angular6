import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import {Router} from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
   credential = {'username': '' , 'password' : ''};
   isloggedIn = false;
   error = true;

  constructor(private loginService: LoginService,
              private router: Router ) { }

  onSubmit() {
      this.error = true;
    console.log('Getting done ');
    console.log(this.credential.username );
    console.log(this.credential.password );
    this.loginService.sendCredential(this.credential.username, this.credential.password).subscribe(
      (res: Response) => {
          this.error = true;
        localStorage.setItem('xAuthToken', JSON.stringify(res));
        this.isloggedIn = true;
          this.router.navigate(['/dashboard']);
      },
      error => {
        console.log(error);
        this.error = false;

      }
    );
  }
  ngOnInit() {
    /*this.loginService.checkSession().subscribe(
      res => {
        this.isloggedIn = true;
        console.log('Sucess');
      },
      error => {
        this.isloggedIn = false;
        console.log(error);
      }
    );*/
  }

}
