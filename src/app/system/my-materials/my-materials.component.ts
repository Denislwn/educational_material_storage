import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Material} from '../../shared/models/material/material.model';
import {MaterialsService} from '../../shared/services/materials.service';
import {MaterialPage} from '../../shared/models/material/material-page.model';
import {ActivatedRoute} from '@angular/router';
import {StoreService} from '../../shared/services/store.service';

@Component({
  selector: 'app-my-materials',
  templateUrl: './my-materials.component.html',
  styleUrls: ['./my-materials.component.css']
})
export class MyMaterialsComponent implements OnInit, AfterViewInit {
  materials: Material[];
  userId: number;
  page: number;
  searchText = '';
  searchCategories = '';
  searchFileTypes = '';
  lastPage: boolean;
  isLoad: boolean;
  scrollState = false;
  routeBack: string;
  messageBack: string;
  materialsName: string;
  @ViewChild('materialsList') materialsList;
  pageState = 'USER_MATERIALS';

  constructor(public materialsService: MaterialsService,
              public activatedRoute: ActivatedRoute,
              public storeService: StoreService) {
  }

  ngOnInit() {
    this.getUserMaterials();
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
          this.getUserMaterialsFromService();
        } else {
          this.getUserMaterialsFromServer();
        }
      });
  }

  getUserId(userId: string) {
    if (userId) {
      this.userId = Number(userId);
      this.routeBack = `/system/users`;
      this.messageBack = 'Назад к пользователям';
      this.materialsName = 'Материалы пользователя';
    } else {
      this.userId = Number(localStorage.getItem('userId'));
      this.materialsName = 'Мои материалы';
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
    this.materials = this.storeService.userMaterials;
    this.page = this.storeService.materialPage;
    this.lastPage = this.storeService.materialLastPage;
    this.searchText = this.storeService.userSearchTextFilterMaterials;
    this.searchCategories = this.storeService.materialCategories;
    this.searchFileTypes = this.storeService.materialFileTypes;
    this.scrollState = true;
    this.storeService.storeUserMaterialReset();
  }

  onScroll() {

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

  checkLastPage(nextPage: string) {
    if (nextPage === null) {
      this.lastPage = true;
    } else {
      this.lastPage = false;
    }
    this.isLoad = false;
  }

}
