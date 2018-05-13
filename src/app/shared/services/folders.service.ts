import {BaseApi} from '../base/base-api';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Folder} from '../models/folder/folder.name';
import {FolderPage} from '../models/folder/folder-page.model';

@Injectable()
export class FoldersService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getFolders(userId: number): Observable<Folder[]> {
    return this.get(`folders/?user=${userId.toString()}`);
  }

  getNestedFolders(parentId: number): Observable<FolderPage> {
    return this.get(`folders/${parentId.toString()}/`);
  }

  addNewFolder(url: string, newFolder: Object): Observable<Folder> {
    return this.post(url, newFolder);
  }

  editFolder(folderId: number, folder: Object): Observable<Folder> {
    return this.patch(`folders/${folderId.toString()}/`, folder);
  }

  removeFolder(folderId: number): Observable<Object> {
    return this.delete(`folders/${folderId.toString()}/`);
  }
}
