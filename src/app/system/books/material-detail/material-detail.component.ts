import {Component, OnInit} from '@angular/core';
import {Material} from '../../../shared/models/book/material.model';
import {MaterialsService} from '../../../shared/services/materials.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-material-detail',
  templateUrl: './material-detail.component.html',
  styleUrls: ['./material-detail.component.css']
})
export class MaterialDetailComponent implements OnInit {
  material: Material;
  electedMessage = 'Добавить в избранное';
  deleteButton = false;
  showDeleteDialog = false;
  deleteObj: {title: string, message: string};
  routeBack: string;
  messageBack: string;
  subOnToElected: Subscription;
  subOnFromElected: Subscription;
  subOnRemoveBook: Subscription;

  constructor(private booksService: MaterialsService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.getBook();
  }

  getBook() {
    this.activatedRoute.params
      .subscribe((params) => {
        this.getBackUrl();
        this.booksService.getMaterialById(params['book_id'])
          .subscribe((book: Material) => {
            this.material = book;
            this.checkUserRights();
            if (this.material.elected) {
              this.electedMessage = 'Убрать из избранного';
            }
          });
      });
  }

  getBackUrl () {
    if (this.activatedRoute.snapshot.url[0].path === 'books') {
      this.routeBack = '/system/books';
      this.messageBack = 'Назад к книгам';
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
    this.subOnToElected = this.booksService.addToFavorites(this.material.id)
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
    this.subOnFromElected = this.booksService.removeFromFavorites(this.material.id)
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
    this.subOnRemoveBook = this.booksService.removeMaterial(this.material.id)
      .subscribe(() =>  {
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

}
