import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StoreService} from '../../services/store.service';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css']
})
export class SearchFieldComponent implements OnInit {
  text: string;
  @Input() pageName;
  @Input() searchState: string;
  @Output() out = new EventEmitter<string>();

  constructor(private storeService: StoreService) {
  }

  ngOnInit() {
    if (this.searchState === 'USERS' && this.storeService.searchTextFilterUsers) {
      this.text = this.storeService.searchTextFilterUsers;
      this.storeService.searchTextFilterUsers = null;
    } else if (this.searchState === 'MATERIALS' && this.storeService.searchTextFilterMaterials) {
      this.text = this.storeService.searchTextFilterMaterials;
    } else if (this.searchState === 'USER_MATERIALS' && this.storeService.userSearchTextFilterMaterials) {
      this.text = this.storeService.userSearchTextFilterMaterials;
    }
    this.resetStore();
  }

  textOut() {
    this.out.emit(this.text);
  }

  resetStore() {
    this.storeService.searchTextFilterMaterials = null;
    this.storeService.userSearchTextFilterMaterials = null;
  }

}
