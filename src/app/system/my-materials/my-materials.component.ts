import {Component, OnInit} from '@angular/core';
import {Material} from '../../shared/models/book/material.model';
import {MaterialsService} from '../../shared/services/materials.service';
import {MaterialPage} from '../../shared/models/book/material-page.model';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-my-materials',
  templateUrl: './my-materials.component.html',
  styleUrls: ['./my-materials.component.css']
})
export class MyMaterialsComponent implements OnInit {
  materials: Material[];
  routeBack: string;
  messageBack: string;

  constructor(public materialsService: MaterialsService,
              public activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.getUserMaterials();
  }

  getUserMaterials() {
    this.activatedRoute.params
      .subscribe((params) => {
        let userId;
        if (params['userId']) {
          userId = params['userId'];
          this.routeBack = `/system/users`;
          this.messageBack = 'Назад к пользователям';
        } else {
          userId = localStorage.getItem('userId');
        }
        this.materialsService.getUserMaterials(userId)
          .subscribe((materialPage: MaterialPage) => {
            this.materials = materialPage.results;
          });
      });
  }

}
