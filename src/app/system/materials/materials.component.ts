import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Material} from '../../shared/models/material/material.model';
import {MaterialsService} from '../../shared/services/materials.service';
import {MaterialPage} from '../../shared/models/material/material-page.model';
import {Subject} from 'rxjs/Subject';
import {CategoryService} from '../../shared/services/category.service';
import {Category} from '../../shared/models/category/category.model';
import {NgForm} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {StoreService} from '../../shared/services/store.service';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.css']
})
export class MaterialsComponent implements OnInit, AfterViewInit {
  materials: Material[] = [];
  categories: Category[];
  termMaterial$ = new Subject<string>();
  page: number;
  isPhone = false;
  isLoad: boolean;
  lastPage: boolean;
  scrollState = false;
  @ViewChild('materialsList') materialsList;

  constructor(private materialsService: MaterialsService,
              private activatedRoute: ActivatedRoute,
              private categoryService: CategoryService,
              private storeService: StoreService) {
  }

  ngOnInit() {
    if (document.getElementsByTagName('html')[0].clientWidth < 768) {
      this.isPhone = true;
    } else {
      this.isPhone = false;
    }
    this.getMaterials();
    this.getCategories();
    this.subOnInputSearchField();
  }

  ngAfterViewInit(): void {
    if (this.scrollState) {
      if (!this.isPhone) {
        this.materialsList.nativeElement.scrollTop = this.storeService.materialsListScroll;
      } else {
        document.getElementsByTagName('html')[0].scrollTop = this.storeService.materialsListScroll;
      }
    }
    this.scrollState = false;
  }

  getMaterials() {
    this.isLoad = true;
    if (this.storeService.materials) {
      this.getServiceMaterials();
    } else {
      this.getServerMaterials();
    }
    this.storeService.storeReset();
  }

  getCategories() {
    if (this.categoryService.categories) {
      this.categories = this.categoryService.categories;
    } else {
      this.getServerCategories();
    }
  }

  getServerMaterials() {
    this.page = 1;
    this.lastPage = false;
    this.materialsService.getMaterials(this.page)
      .subscribe((materialPage: MaterialPage) => {
        this.materials = materialPage.results;
        if (materialPage.next_page === null) {
          this.lastPage = true;
        }
        this.isLoad = false;
      }, (err) => {
        console.log(err);
      });
  }

  getServiceMaterials() {
    this.materials = this.storeService.materials;
    this.page = this.storeService.page;
    this.lastPage = this.storeService.lastPage;
    this.scrollState = true;
    this.isLoad = false;
  }

  subOnInputSearchField() {
    this.termMaterial$
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe((term) => {
        this.search(term);
      });
  }

  search(text: string) {
    if (text !== '') {
      this.page = 1;
      this.isLoad = true;
      this.lastPage = false;
      this.materialsService.getFilterMaterials(text)
        .subscribe((materialPage: MaterialPage) => {
          this.materials = materialPage.results;
          if (materialPage.next_page === null) {
            this.lastPage = true;
          }
        });
    } else {
      this.getServerMaterials();
    }
  }

  getServerCategories() {
    this.categoryService.getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        this.categoryService.categories = this.categories;
      }, (err) => {
        console.log(err);
      });
  }

  filterByCategories(form: NgForm) {
    const dict = Object.entries(form.form.value);
    let searchCategories = '';
    for (let i = 0; i < dict.length; i++) {
      if (dict[i][1] === true) {
        searchCategories += 'category=' + dict[i][0];
        if (i !== dict.length - 1) {
          searchCategories += '&';
        }
      }
    }
    this.isLoad = true;
    this.page = 1;
    this.categoryService.getFilterMaterialsByCategories(searchCategories)
      .subscribe((materialPage: MaterialPage) => {
        this.materials = materialPage.results;
        if (materialPage.next_page === null) {
          this.lastPage = true;
        }
        this.isLoad = false;
      });
  }

  onScroll() {
    this.getNextMaterialPage();
  }

  getNextMaterialPage() {
    if (!this.isLoad && !this.lastPage) {
      this.isLoad = true;
      this.page += 1;
      this.materialsService.getMaterials(this.page)
        .subscribe((materialPage: MaterialPage) => {
          this.materials = this.materials.concat(materialPage.results);
          if (materialPage.next_page === null) {
            this.lastPage = true;
          }
          this.isLoad = false;
        });
    }
  }

  clickOnMaterial() {
    this.storeService.materials = this.materials;
    this.storeService.lastPage = this.lastPage;
    this.storeService.page = this.page;
    if (!this.isPhone) {
      this.storeService.materialsListScroll = this.materialsList.nativeElement.scrollTop;
    } else {
      this.storeService.materialsListScroll = document.getElementsByTagName('html')[0].scrollTop;
    }
  }
}