import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToolsService } from '../services/tools.service';
import { User } from '../DTO/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  user;
  isModeEdit: boolean = false;
  userEmail = null;
  userName = null;
  userPassword = null;
  userConfirmPassword = null;
  oneErrorDetect: boolean = false;
  errorMessage: string;

  constructor(private authService: AuthService, private toolService: ToolsService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    if (this.authService.userIsLoggedIn()) {
      const localToken = JSON.parse(localStorage.getItem('local-data'));
      let tmpuser = this.authService.decodeToken(localToken.token);
      this.user = new User(tmpuser.id, tmpuser.name, tmpuser.email, null, null);
      this.userEmail = this.user.email;
      this.userName = this.user.name;
      this.userPassword = this.user.password;
      console.log('user', this.user)
    }
  }

  edit(data) {
    this.isModeEdit = true;
    console.log(data);
  }

  saveNewData() {
    let tmpUserForSave = {email: '', name: '', password: '', confirm: ''};
    if (this.toolService.dataIsDifferent(this.user, this.userEmail, 'email')) {
      tmpUserForSave.email = this.userEmail;
    } else {
      tmpUserForSave.email = this.user.email;
    }
    if (this.toolService.dataIsDifferent(this.user, this.userName, 'name')) {
      tmpUserForSave.name = this.userName;
    } else {
      tmpUserForSave.name = this.user.name;
    }
    if (this.toolService.stringIsNotEmptyOrNull(this.userPassword)) {
      tmpUserForSave.password = this.userPassword;
    } else {
      tmpUserForSave.password = null;
    }
    if (this.toolService.stringIsNotEmptyOrNull(this.userConfirmPassword)) {
      tmpUserForSave.confirm = this.userConfirmPassword;
    } else {
      tmpUserForSave.confirm = null;
    }
    if (this.userPassword !== this.userConfirmPassword) {
      this.oneErrorDetect = true;
      this.errorMessage = "Les mots de passe ne correspondent pas"
    }
    console.log(tmpUserForSave);
  }

}
