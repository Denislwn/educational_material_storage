import {Injectable} from '@angular/core';
import {BaseApi} from '../base/base-api';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {MaterialPage} from '../models/book/material-page.model';
import {NewMaterial} from '../models/book/new-material.model';

@Injectable()
export class MaterialsService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getMaterials(page: number): Observable<MaterialPage> {
    return this.get(`materials/?page=${page.toString()}`);
  }

  getMaterialById(materialId: number) {
    return this.get(`materials/${materialId.toString()}/`);
  }

  createMaterial(material: NewMaterial): Observable<Object> {
    let finalData;
    const formData = new FormData();
    formData.append('name', material.name);
    formData.append('type', '1');
    formData.append('author', material.author);
    formData.append('categories', material.categories);
    formData.append('file', material.file[0]);
    formData.append('is_open', material.is_open);
    finalData = formData;
    return this.post(`materials/`, finalData);
  }

  getFilterMaterials(text: string): Observable<MaterialPage> {
    return this.get(`materials/search/?text=${text}`);
  }

  addToFavorites(materialId: number): Observable<Object> {
    return this.post(`materials/${materialId.toString()}/add/`);
  }

  removeFromFavorites(materialId: number): Observable<Object> {
    return this.post(`materials/${materialId.toString()}/remove/`);
  }

  removeMaterial(materialId: number): Observable<Object> {
    return this.delete(`materials/${materialId.toString()}/`);
  }

  getUserMaterials(userId: string): Observable<MaterialPage> {
    return this.get(`materials/?user=${userId}`);
  }

  addToQuickToolBar(materialId: number): Observable<Object> {
    return this.post(`materials/${materialId.toString()}/quick_toolbar/`);
  }

  removeFromQuickToolBar(materialId: number): Observable<Object> {
    return this.post(`materials/${materialId.toString()}/remove_quick_toolbar/`);
  }
}