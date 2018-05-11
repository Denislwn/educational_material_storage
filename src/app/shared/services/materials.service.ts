import {Injectable} from '@angular/core';
import {BaseApi} from '../base/base-api';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {BookPage} from '../models/book/book-page.model';
import {NewMaterial} from '../models/book/new-material.model';
import {Material} from '../models/book/material.model';

@Injectable()
export class MaterialsService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getMaterials(page: number): Observable<Material[]> {
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
    finalData = formData;
    return this.post(`materials/`, finalData);
  }

  getFilterMaterials(text: string): Observable<BookPage> {
    return this.get(`books/search/?text=${text}`);
  }

  addToFavorites(materialId: number): Observable<Object> {
    return this.post(`books/${materialId.toString()}/take/`);
  }

  removeFromFavorites(materialId: number): Observable<Object> {
    return this.post(`books/${materialId.toString()}/remove/`);
  }

  removeMaterial(materialId: number): Observable<Object> {
    return this.delete(`books/${materialId.toString()}/`);
  }
}
