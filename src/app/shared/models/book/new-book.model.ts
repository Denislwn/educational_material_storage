export class NewBook {
  public categories: string;

  constructor(public name: string,
              public author: string,
              public file: FileList,
              categories: string) {
    this.categoriesFormat(categories);
  }

  categoriesFormat(category: string) {
    this.categories = `[{"category": ${category}}]`;
  }
}
