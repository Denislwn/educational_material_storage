import {Injectable} from '@angular/core';
import {Material} from '../models/material/material.model';

@Injectable()
export class StoreService {
  materials: Material[];
  userMaterials: Material[];
  lastPage: boolean;
  page: number;
  materialsListScroll: number;

  storeReset() {
    this.materials = null;
    this.lastPage = null;
    this.page = null;
  }
}
