import {Component, OnInit} from '@angular/core';
import {Material} from '../../shared/models/material/material.model';
import {MaterialsService} from '../../shared/services/materials.service';
import {MaterialPage} from '../../shared/models/material/material-page.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-my-materials',
  templateUrl: './my-materials.component.html',
  styleUrls: ['./my-materials.component.css']
})
export class MyMaterialsComponent implements OnInit {
  materials: Material[];
  userId: number;
  routeBack: string;
  messageBack: string;
  materialsName: string;

  constructor(public materialsService: MaterialsService,
              public activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.getUserMaterials();
  }

  getUserMaterials() {
    this.activatedRoute.params
      .subscribe((params) => {
        if (params['userId']) {
          this.userId = params['userId'];
          this.routeBack = `/system/users`;
          this.messageBack = 'Назад к пользователям';
          this.materialsName = 'Материалы пользователя';
        } else {
          this.userId = Number(localStorage.getItem('userId'));
          this.materialsName = 'Мои материалы';
        }
        this.materialsService.getUserMaterials(this.userId)
          .subscribe((materialPage: MaterialPage) => {
            this.materials = materialPage.results;
          });
      });
  }

}
