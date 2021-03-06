import {Component, OnInit} from '@angular/core';
import {Material} from '../../../shared/models/material/material.model';
import {MaterialsService} from '../../../shared/services/materials.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Folder} from '../../../shared/models/folder/folder.name';
import {MaterialComment} from '../../../shared/models/comment/material-comment.model';
import {StoreService} from '../../../shared/services/store.service';

@Component({
  selector: 'app-material-detail',
  templateUrl: './material-detail.component.html',
  styleUrls: ['./material-detail.component.css']
})
export class MaterialDetailComponent implements OnInit {
  material: Material;
  folders: Folder[] = [];
  comments: MaterialComment[];
  electedMessage = 'Добавить в мои материалы';
  quickToolBarMessage = 'Добавить на панель быстрого доступа';
  showAddToFolderDialog = false;
  deleteButton = false;
  editButton = false;
  showEditDialog = false;
  showDeleteDialog = false;
  deleteObj: { title: string, message: string };
  routeBack: string;
  messageBack: string;
  subOnToElected: Subscription;
  subOnFromElected: Subscription;
  subOnRemoveBook: Subscription;

  constructor(private materialsService: MaterialsService,
              private activatedRoute: ActivatedRoute,
              private storeService: StoreService) {
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
            this.getCommentsThisMaterial();
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

  getCommentsThisMaterial() {
    this.materialsService.getMaterialComments(this.material.id)
      .subscribe((commentPage: MaterialComment[]) => {
        this.comments = commentPage;
      });
  }

  getBackUrl() {
    if (this.activatedRoute.snapshot.url[0].path === 'materials') {
      this.routeBack = '/system/materials';
      this.messageBack = 'Назад к материалам';
    } else if (this.activatedRoute.snapshot.url[0].path === 'users') {
      this.routeBack = `/system/users/${this.activatedRoute.snapshot.params['userId']}`;
      this.messageBack = 'Назад к пользователю';
    } else if (this.activatedRoute.snapshot.url[0].path === 'my_materials') {
      this.routeBack = `/system/my_materials`;
      this.messageBack = 'Назад к моим материалам';
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
        this.electedMessage = 'Убрать из моих материалов';
      }, (err) => {
        console.log(err);
      }, () => {
        this.subOnToElected.unsubscribe();
      });
  }

  fromElected() {
    this.subOnFromElected = this.materialsService.removeFromFavorites(this.material.id)
      .subscribe((responce) => {
        this.getFoldersThisMaterial();
        this.material.elected = false;
        this.electedMessage = 'Добавить в мои материалы';
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
        this.material.deleted = true;
        this.getFoldersThisMaterial();
        this.material.elected = false;
        if (this.storeService.materials) {
          this.storeService.materials = this.getNewMaterialsList(this.storeService.materials);
        } else if (this.storeService.userMaterials) {
          this.storeService.userMaterials = this.getNewMaterialsList(this.storeService.userMaterials);
        }
      }, (err) => {
        console.log(err);
      }, () => {
        this.subOnRemoveBook.unsubscribe();
      });
  }

  getNewMaterialsList(arr: Material[]) {
    return arr.filter((storeMaterial) => {
      if (this.material.id !== storeMaterial.id) {
        return storeMaterial;
      }
    });
  }

  removeMaterialFromFolder(folderId: number) {
    this.materialsService.removeMaterialFromFolder(this.material.id, folderId)
      .subscribe(() => {
        this.folders = this.folders.filter(folder => {
          if (folder.id !== folderId) {
            return folder;
          }
        });
      });
  }

  checkUserRights() {
    const userRole = Number(localStorage.getItem('userRole'));
    const userId = Number(localStorage.getItem('userId'));
    if (userRole === 4 || userRole === 3 || userId === this.material.owner.id) {
      this.deleteButton = true;
    }
    if (userId === this.material.owner.id) {
      this.editButton = true;
    }
  }

  checkButtonsState() {
    if (this.material.elected) {
      this.electedMessage = 'Убрать из моих материалов';
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

  sendComment(comment: string) {
    this.materialsService.sendComment(this.material.id, {text: comment})
      .subscribe((requestComment: MaterialComment) => {
        this.comments.push(requestComment);
      });
  }

  removeComment(commentId: number) {
    this.materialsService.removeComment(this.material.id, commentId)
      .subscribe(() => {
        this.getCommentsThisMaterial();
      });
  }

  openEditDialog() {
    this.showEditDialog = true;
  }

  successEditMaterial(editMaterial: Material) {
    this.material = editMaterial;
    this.showEditDialog = false;
  }
}
