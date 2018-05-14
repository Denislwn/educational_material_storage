import {Component, OnInit} from '@angular/core';
import {Material} from '../../../shared/models/material/material.model';
import {MaterialsService} from '../../../shared/services/materials.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Folder} from '../../../shared/models/folder/folder.name';

@Component({
  selector: 'app-material-detail',
  templateUrl: './material-detail.component.html',
  styleUrls: ['./material-detail.component.css']
})
export class MaterialDetailComponent implements OnInit {
  material: Material;
  folders: Folder[];
  electedMessage = 'Добавить в избранное';
  quickToolBarMessage = 'Добавить на панель быстрого доступа';
  showAddToFolderDialog = false;
  deleteButton = false;
  showDeleteDialog = false;
  deleteObj: { title: string, message: string };
  routeBack: string;
  messageBack: string;
  subOnToElected: Subscription;
  subOnFromElected: Subscription;
  subOnRemoveBook: Subscription;

  constructor(private materialsService: MaterialsService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.getMaterial();
  }

  getMaterial() {
    this.activatedRoute.params
      .subscribe((params) => {
        this.getBackUrl();
        this.materialsService.getMaterialById(params['materialId'])
          .subscribe((book: Material) => {
            this.material = book;
            this.getFoldersThisMaterial();
            this.checkUserRights();
            this.checkButtonsState();
          });
      });
  }

  getFoldersThisMaterial() {
    if (this.material.elected) {
      this.materialsService.getMaterialFolders(this.material.id)
        .subscribe((folders: Folder[]) => {
          this.folders = folders;
        });
    }
  }

  getBackUrl() {
    if (this.activatedRoute.snapshot.url[0].path === 'materials') {
      this.routeBack = '/system/materials';
      this.messageBack = 'Назад к книгам';
    } else if (this.activatedRoute.snapshot.url[0].path === 'users') {
      this.routeBack = `/system/users/${this.activatedRoute.snapshot.params['userId']}`;
      this.messageBack = 'Назад к пользователю';
    } else if (this.activatedRoute.snapshot.url[0].path === 'my_materials') {
      this.routeBack = `/system/my_materials`;
      this.messageBack = 'Назад к моим книгам';
    } else {
      this.routeBack = '/system/user_info';
      this.messageBack = 'Назад к профилю';
    }
  }

  toElectedButton() {
    if (this.material.elected) {
      this.fromElected();
    } else {
      this.toElected();
    }
  }

  toElected() {
    this.subOnToElected = this.materialsService.addToFavorites(this.material.id)
      .subscribe((responce) => {
        this.material.elected = true;
        this.electedMessage = 'Убрать из избранного';
      }, (err) => {
        console.log(err);
      }, () => {
        this.subOnToElected.unsubscribe();
      });
  }

  fromElected() {
    this.subOnFromElected = this.materialsService.removeFromFavorites(this.material.id)
      .subscribe((responce) => {
        this.material.elected = false;
        this.electedMessage = 'Добавить в избранное';
      }, (err) => {
        console.log(err);
      }, () => {
        this.subOnFromElected.unsubscribe();
      });
  }

  openDeleteDialog() {
    const message = `книгу "${this.material.name}"`;
    this.deleteObj = {title: 'книги', message: message};
    this.showDeleteDialog = true;
  }

  removeBook() {
    this.subOnRemoveBook = this.materialsService.removeMaterial(this.material.id)
      .subscribe(() => {
        alert('Книга успешно удалена!');
      }, (err) => {
        console.log(err);
      }, () => {
        this.subOnRemoveBook.unsubscribe();
      });
  }

  checkUserRights() {
    const userRole = Number(localStorage.getItem('userRole'));
    const userId = Number(localStorage.getItem('userId'));
    if (userRole === 4 || userId === this.material.owner.id) {
      this.deleteButton = true;
    }
  }

  checkButtonsState() {
    if (this.material.elected) {
      this.electedMessage = 'Убрать из избранного';
    }
    if (this.material.quick_toolbar) {
      this.quickToolBarMessage = 'Удалить из панели быстрого доступа';
    }
  }

  toQuickToolbarButton() {
    if (this.material.quick_toolbar) {
      this.removeFromQuickToolBar();
    } else {
      this.addToQuickToolbar();
    }
  }

  addToQuickToolbar() {
    this.materialsService.addToQuickToolBar(this.material.id)
      .subscribe(() => {
        this.material.quick_toolbar = true;
        this.quickToolBarMessage = 'Удалить из панели быстрого доступа';
      });
  }

  removeFromQuickToolBar() {
    this.materialsService.removeFromQuickToolBar(this.material.id)
      .subscribe(() => {
        this.material.quick_toolbar = false;
        this.quickToolBarMessage = 'Добавить на панель быстрого доступа';
      });
  }

  openAddToFolderDialog() {
    this.showAddToFolderDialog = true;
  }

  addMaterialToFolder() {
    this.getFoldersThisMaterial();
  }
}
