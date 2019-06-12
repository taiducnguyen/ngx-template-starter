/** Provides default values for Pagination and pager components */
export module PaginationConfig {
  export const numberOfShowingPages: number = 3;

  export const main: any = {
    maxSize: numberOfShowingPages,
    itemsPerPage: 10,
    boundaryLinks: true,
    directionLinks: true,
    firstText: 'First',
    previousText: 'Previous',
    nextText: 'Next',
    lastText: 'Last',
    pageBtnClass: '',
    rotate: false
  };
}

export class PaginationOption {
  maxSize: number;
  itemsPerPage: number;
  boundaryLinks: boolean;
  directionLinks: boolean;
  firstText: string;
  previousText: string;
  nextText: string;
  lastText: string;
  pageBtnClass: string;
  rotate: boolean;
  constructor() {
    this.maxSize = 3;
    this.itemsPerPage = 25;
    this.boundaryLinks = true;
    this.directionLinks = true;
    this.firstText = 'First';
    this.previousText = 'Previous';
    this.nextText = 'Next';
    this.lastText = 'Last';
    this.pageBtnClass = '';
    this.rotate = false;
  }
}

export class Pager {
  startIndex: number;
  endIndex: number;
  currentPage: number;
  constructor() {}
}
