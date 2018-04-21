export class NewBook {
  public categories: string;

  constructor(public name: string,
              public author: string,
              public file: FileList,
              categories: string[]) {
    this.categoriesFormat(categories);
  }

  categoriesFormat(categories: string[]) {
    this.categories = '[';
    for (const category of categories) {
      this.categories  += `{"category":${category}},`;
    }
    this.categories = this.categories.slice(0, this.categories.length - 1);
    this.categories += ']';
    console.log(this.categories);
  }
}
