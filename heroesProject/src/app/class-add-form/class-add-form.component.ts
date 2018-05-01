import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClassService } from '../services/class.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-class-add-form',
  templateUrl: './class-add-form.component.html',
  styleUrls: ['./class-add-form.component.scss']
})
export class ClassAddFormComponent implements OnInit {

  public form: FormGroup;
  weaponTypes = [
    { name: 'hache' },
    { name: 'épée' },
    { name: 'arc' },
    { name: 'baton magique' }
  ];

  userIsLoggedIn: boolean = false;

  constructor(private formBuilder: FormBuilder, private classService: ClassService, private authService: AuthService) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      id: Date.now(),
      name: '',
      force: 0,
      intelligence: 0,
      agilite: 0,
      endurance: 0,
      perception: 0,
      chance: 0,
      vie: 0,
      arme: '',
      description: ""
    });

    this.checkUserIsLoggedIn();
  }


  createClass(classData) {
    const token = JSON.parse(localStorage.getItem('local-data')).token;
    console.log(classData);
    let parseData = {
      id: classData.id,
      name: classData.name,
      attributs: {
        force: classData.force,
        intelligence: classData.intelligence,
        agilite: classData.agilite,
        perception: classData.perception,
        endurance: classData.endurance,
        chance: classData.chance,
        vie: classData.vie
      },
      arme: classData.arme,
      description: classData.description
    };

    this.classService.addClass(parseData, token).subscribe();
    this.form.reset();
  }

  checkUserIsLoggedIn() {
    if (this.authService.userIsLoggedIn()) {
      this.userIsLoggedIn = true;
    }
  }
}
