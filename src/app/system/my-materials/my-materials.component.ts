import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Material} from '../../shared/models/material/material.model';
import {MaterialsService} from '../../shared/services/materials.service';
import {MaterialPage} from '../../shared/models/material/material-page.model';
import {ActivatedRoute} from '@angular/router';
import {StoreService} from '../../shared/services/store.service';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-my-materials',
  templateUrl: './my-materials.component.html',
  styleUrls: ['./my-materials.component.css']
})
export class MyMaterialsComponent implements OnInit, AfterViewInit {
  materials: Material[];
  userId: number;
  headerMaterials: string;
  page: number;
  termMaterial$ = new Subject<string>();
  searchText = '';
  searchCategories = '';
  searchFileTypes = '';
  lastPage: boolean;
  isLoad: boolean;
  scrollState = false;
  routeBack: string;
  messageBack: string;
  refreshFolders = false;
  inFolder = false;
  @ViewChild('materialsList') materialsList;
  pageState = 'USER_MATERIALS';

  constructor(public materialsService: MaterialsService,
              public activatedRoute: ActivatedRoute,
              public storeService: StoreService) {
  }

  ngOnInit() {
    this.getUserMaterials();
    this.subOnInputSearchField();
  }

  ngAfterViewInit(): void {
    if (this.scrollState) {
      this.materialsList.nativeElement.scrollTop = this.storeService.materialsListScroll;
    }
    this.scrollState = false;
  }

  getUserMaterials() {
    this.activatedRoute.params
      .subscribe((params) => {
        this.getUserId(params['userId']);
        if (this.storeService.userMaterials) {
          console.log('userMaterials');
          this.getUserMaterialsFromService();
        } else {
          console.log('server');
          this.getUserMaterialsFromServer();
        }
        this.storeService.storeUserMaterialReset();
      });
  }

  getUserId(userId: string) {
    if (userId && Number(localStorage.getItem('userId') !== userId)) {
      this.userId = Number(userId);
      this.routeBack = `/system/users`;
      this.messageBack = 'Назад к пользователям';
      this.headerMaterials = `Материалы пользователя `;
      if (this.storeService.userName) {
        this.headerMaterials += this.storeService.userName;
      }
    } else {
      this.userId = Number(localStorage.getItem('userId'));
      this.headerMaterials = 'Мои материалы';
    }
  }

  getUserMaterialsFromServer() {
    this.page = 1;
    this.isLoad = true;
    this.materialsService.getUserMaterials(this.userId)
      .subscribe((materialPage: MaterialPage) => {
        this.materials = materialPage.results;
        this.checkLastPage(materialPage.next_page);
      });
  }

  getUserMaterialsFromService() {
    console.log(this.storeService.userMaterials);
    this.materials = this.storeService.userMaterials;
    this.page = this.storeService.materialPage;
    this.lastPage = this.storeService.materialLastPage;
    this.searchText = this.storeService.userSearchTextFilterMaterials;
    this.searchCategories = this.storeService.materialCategories;
    this.searchFileTypes = this.storeService.materialFileTypes;
    this.scrollState = true;
    this.refreshFolders = true;
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
    let url = `materials/?user=${this.userId}&`;
    if (this.searchText) {
      url = `materials/search/?user=${this.userId}&text=${this.searchText}&`;
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
    if (!this.inFolder || (this.searchText || this.searchCategories || this.searchFileTypes)) {
      this.isLoad = true;
      this.page = 1;
      this.lastPage = false;
      this.materialsService.getFilterMaterials(url)
        .subscribe((materialPage: MaterialPage) => {
          this.materials = materialPage.results;
          this.checkLastPage(materialPage.next_page);
        });
    } else {
      this.refreshFolders = true;
    }
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

  clickOnBook() {
    this.storeService.userMaterials = this.materials;
    this.storeService.materialLastPage = this.lastPage;
    this.storeService.materialPage = this.page;
    this.storeService.userSearchTextFilterMaterials = this.searchText;
    this.storeService.pageState = this.pageState;
    this.storeService.materialsListScroll = this.materialsList.nativeElement.scrollTop;
    this.storeService.materialCategories = this.searchCategories;
    this.storeService.materialFileTypes = this.searchFileTypes;
  }

  getNestedMaterials(nestedMaterials: Material[]) {
    if (nestedMaterials === null) {
      this.getUserMaterials();
      this.inFolder = false;
    } else {
      this.refreshFolders = false;
      this.inFolder = true;
      this.lastPage = true;
      this.materials = nestedMaterials;
    }
  }

  checkLastPage(nextPage: string) {
    if (nextPage === null) {
      this.lastPage = true;
    } else {
      this.lastPage = false;
    }
    this.isLoad = false;
  }

  getShowButton() {
    if (this.userId === Number(localStorage.getItem('userId'))) {
      return true;
    } else {
      return false;
    }
  }

}
