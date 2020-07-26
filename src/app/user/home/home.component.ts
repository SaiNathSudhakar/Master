import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { User } from '../../user';
import {ActivatedRoute, Params, Router} from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private _userService:UserService,
    private router: Router
   ) { }
  users:any;
  ngOnInit() {
    this.getUsers();
  }
  getUsers(){
     this._userService
        .getUsers()
        .subscribe(users => {
          console.log(users['members']);
          this.users = users['members'];
      } )
  }
  getCalender(user:User) {
    //localStorage.setItem("userData",JSON.stringify(user));
  localStorage.setItem("userData", JSON.stringify(user));
  console.log(JSON.parse(localStorage.getItem("userData")));
  //console.log(JSON.stringify(user['activity_periods']));
  this.router.navigate(['calender']);
  }
}
