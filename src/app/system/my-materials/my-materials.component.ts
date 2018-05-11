import {Component, OnInit} from '@angular/core';
import {Material} from '../../shared/models/book/material.model';
import {MaterialsService} from '../../shared/services/materials.service';
import {MaterialPage} from '../../shared/models/book/material-page.model';

@Component({
  selector: 'app-my-materials',
  templateUrl: './my-materials.component.html',
  styleUrls: ['./my-materials.component.css']
})
export class MyMaterialsComponent implements OnInit {
  materials: Material[];

  constructor(public materialsService: MaterialsService) {
  }

  ngOnInit() {
    this.getUserMaterials();
  }

  getUserMaterials() {
    this.materialsService.getUserMaterials(localStorage.getItem('userId'))
      .subscribe((materialPage: MaterialPage) => {
        this.materials = materialPage.results;
      });
  }

}
