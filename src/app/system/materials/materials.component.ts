import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Material} from '../../shared/models/material/material.model';
import {MaterialsService} from '../../shared/services/materials.service';
import {MaterialPage} from '../../shared/models/material/material-page.model';
import {Subject} from 'rxjs/Subject';
import {CategoryService} from '../../shared/services/category.service';
import {Category} from '../../shared/models/category/category.model';
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
  searchText = '';
  searchCategories = '';
  searchFileTypes = '';
  page: number;
  isPhone = false;
  isLoad: boolean;
  lastPage: boolean;
  scrollState = false;
  pageState = 'MATERIALS';
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
    this.storeService.storeMaterialReset();
  }

  getServerMaterials() {
    this.page = 1;
    this.isLoad = true;
    this.materialsService.getMaterials(this.page)
      .subscribe((materialPage: MaterialPage) => {
        this.materials = materialPage.results;
        this.checkLastPage(materialPage.next_page);
      }, (err) => {
        console.log(err);
      });
  }

  getServiceMaterials() {
    this.materials = this.storeService.materials;
    this.page = this.storeService.materialPage;
    this.lastPage = this.storeService.materialLastPage;
    this.searchText = this.storeService.searchTextFilterMaterials;
    this.searchFileTypes = this.storeService.materialFileTypes;
    this.searchCategories = this.storeService.materialCategories;
    this.scrollState = true;
    this.isLoad = false;
  }

  subOnInputSearchField() {
    this.termMaterial$
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe((term) => {
        this.searchText = term;
        const url = this.getUrlForFilterMaterials();
        this.getFilterMaterials(url);
      });
  }

  filterByCategories(categories: string) {
    this.searchCategories = categories;
    const url = this.getUrlForFilterMaterials();
    this.getFilterMaterials(url);
  }

  filterByTypes(types: string) {
    this.searchFileTypes = types;
    const url = this.getUrlForFilterMaterials();
    this.getFilterMaterials(url);
  }

  getUrlForFilterMaterials() {
    let url = 'materials/?';
    if (this.searchText) {
      url = `materials/search/?text=${this.searchText}&`;
    }
    if (this.searchCategories) {
      url += `${this.searchCategories}`;
    }
    if (this.searchFileTypes) {
      url += this.searchFileTypes;
    }
    return url;
  }

  getFilterMaterials(url: string) {
    this.isLoad = true;
    this.page = 1;
    this.lastPage = false;
    this.materialsService.getFilterMaterials(url)
      .subscribe((materialPage: MaterialPage) => {
        this.materials = materialPage.results;
        this.checkLastPage(materialPage.next_page);
      });
  }

  onScroll() {
    if (this.searchText || this.searchFileTypes || this.searchCategories) {
      this.getFilterNextMaterialPage();
    } else {
      this.getNextMaterialPage();
    }
  }

  getNextMaterialPage() {
    if (!this.isLoad && !this.lastPage) {
      this.isLoad = true;
      this.page += 1;
      this.materialsService.getMaterials(this.page)
        .subscribe((materialPage: MaterialPage) => {
          this.materials = this.materials.concat(materialPage.results);
          this.checkLastPage(materialPage.next_page);
        });
    }
  }

  getFilterNextMaterialPage() {
    if (!this.isLoad && !this.lastPage) {
      this.isLoad = true;
      this.page += 1;
      const url = this.getUrlForFilterMaterials() + `page=${this.page}`;
      this.materialsService.getFilterMaterials(url)
        .subscribe((materialPage: MaterialPage) => {
          this.materials = this.materials.concat(materialPage.results);
          this.checkLastPage(materialPage.next_page);
        });
    }
  }

  clickOnMaterial() {
    this.storeService.materials = this.materials;
    this.storeService.materialLastPage = this.lastPage;
    this.storeService.materialPage = this.page;
    this.storeService.searchTextFilterMaterials = this.searchText;
    this.storeService.pageState = this.pageState;
    this.storeService.materialsListScroll = this.materialsList.nativeElement.scrollTop;
    this.storeService.materialFileTypes = this.searchFileTypes;
    this.storeService.materialCategories = this.searchCategories;
    // if (!this.isPhone) {
    //   this.storeService.materialsListScroll = this.materialsList.nativeElement.scrollTop;
    // } else {
    //   this.storeService.materialsListScroll = document.getElementsByTagName('html')[0].scrollTop;
    // }
  }

  checkLastPage(nextPage: string) {
    if (nextPage === null) {
      this.lastPage = true;
    } else {
      this.lastPage = false;
    }
    this.isLoad = false;
  }
}
