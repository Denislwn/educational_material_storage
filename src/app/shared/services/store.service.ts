import {Injectable} from '@angular/core';
import {Material} from '../models/material/material.model';
import {User} from '../models/user/user.model';

@Injectable()
export class StoreService {
  pageState: string;

  materialPage: number;
  materialLastPage: boolean;
  materialsListScroll: number;

  materials: Material[];
  searchTextFilterMaterials: string;
  materialFileTypes: string;
  materialCategories: string;

  userMaterials: Material[];
  userSearchTextFilterMaterials: string;
  userMaterialFileTypes: string;
  userMaterialCategories: string;
  userName: string;

  users: User[];
  usersListScroll: number;
  userPage: number;
  userLastPage: boolean;
  userRolesFilter: string;
  searchTextFilterUsers: string;

  storeMaterialReset() {
    this.materials = null;
    this.materialLastPage = null;
    this.materialPage = null;
  }

  storeUserReset() {
    this.users = null;
    this.userLastPage = null;
    this.userPage = null;
  }

  storeUserMaterialReset() {
    this.userMaterials = null;
    this.materialLastPage = null;
    this.materialPage = null;
  }
}
