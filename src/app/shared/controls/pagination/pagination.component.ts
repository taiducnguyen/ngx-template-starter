import { Component, EventEmitter, Input, Output, Inject, Injectable, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PaginationConfig, Pager, PaginationOption } from './pagination.config';

export interface PageChangedEvent {
  itemsPerPage: number;
  page: number;
}

export const PAGINATION_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PaginationComponent),
  multi: true
};

@Injectable()
@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  providers: [PAGINATION_CONTROL_VALUE_ACCESSOR]
})
export class PaginationComponent implements ControlValueAccessor {
  public config: PaginationOption = new PaginationOption();
  @Input() options: PaginationOption;

  /** limit number for page links in pager */
  @Input() public maxSize: number;
  /** if false first and last buttons will be hidden */
  @Input() public boundaryLinks: boolean;
  /** if false previous and next buttons will be hidden */
  @Input() public directionLinks: boolean;
  /** first button text */
  @Input() public firstText: string;
  /** previous button text */
  @Input() public previousText: string;
  /** next button text */
  @Input() public nextText: string;
  /** last button text */
  @Input() public lastText: string;
  /** if true current page will in the middle of pages list */
  @Input() public rotate: boolean;

  @Input() public currentPageIndex: number;
  /** if true pagination component will be disabled */
  @Input() public disabled: boolean;

  @Output() public pageChanged: EventEmitter<Pager> = new EventEmitter<Pager>();

  @Input()
  public get itemsPerPage(): number {
    return this._itemsPerPage;
  }

  public set itemsPerPage(v: number) {
    this._itemsPerPage = v;
    this.totalPages = this.calculateTotalPages();
  }

  @Input()
  public get totalItems(): number {
    return this._totalItems;
  }

  public set totalItems(value: number) {
    this._totalItems = value;
    this.totalPages = this.calculateTotalPages();
  }

  public get totalPages(): number {
    return this._totalPages;
  }

  public set totalPages(value: number) {
    this._totalPages = value;
    if (this.inited) {
      this.page = this._currentTotalItems !== this.totalPages ? 1 : this.page;
      this.selectPage(this.page);
    }
  }

  public set page(value: number) {
    const _previous = this._page;
    this._page = value > this.totalPages ? this.totalPages : value || 1;

    if (_previous === this._page || typeof _previous === 'undefined') {
      return;
    }
    if (!this.inited) {
      this.pageChanged.emit(this.pager);
    }
  }

  public get page(): number {
    return this._page;
  }

  public pages: any[];

  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;
  protected _itemsPerPage: number;
  protected _totalItems: number;
  protected _totalPages: number;
  protected inited: boolean = false;
  protected _page: number = 1;
  protected _currentTotalItems: number;
  protected _disabled = false;
  protected _pager: Pager;
  protected _currentPageSize: number;
  protected startIndex: number;
  protected endIndex: number;

  public set pager(value: Pager) {
    this._pager = value;
  }

  public get pager(): Pager {
    return this._pager;
  }

  public constructor() {
    if (!this.config) {
      this.configureOptions(PaginationConfig.main);
    }
  }

  public configureOptions(config: any): void {
    this.config = Object.assign({}, config);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public ngOnInit(): void {
    this.maxSize = typeof this.options.maxSize !== 'undefined' ? this.options.maxSize : this.config.maxSize;
    this.rotate = typeof this.options.rotate !== 'undefined' ? this.options.rotate : this.config.rotate;
    this.boundaryLinks =
      typeof this.options.boundaryLinks !== 'undefined' ? this.options.boundaryLinks : this.config.boundaryLinks;
    this.directionLinks =
      typeof this.options.directionLinks !== 'undefined' ? this.options.directionLinks : this.config.directionLinks;

    this.itemsPerPage =
      typeof this.options.itemsPerPage !== 'undefined' ? this.options.itemsPerPage : this.config.itemsPerPage;
    this.totalPages = this.calculateTotalPages();

    this._currentTotalItems = this.totalItems;
    this._currentPageSize = this.itemsPerPage;
    // Init pages
    this.pages = this.getPages(this.page, this.totalPages);
    this.inited = true;
  }
  //
  public ngOnChanges() {
    if (
      this._currentTotalItems !== this.totalItems ||
      (this.currentPageIndex && this.page !== this.currentPageIndex) ||
      this._currentPageSize !== this.itemsPerPage
    ) {
      this.page = this.currentPageIndex;
      this._currentTotalItems = this.totalItems;
      this._currentPageSize = this.itemsPerPage;
      this.writeValue(this.page);
    }
  }
  public writeValue(value: number): void {
    this.page = value;
    this.currentPageIndex = this.page;
    this.pages = this.getPages(this.page, this.totalPages);
    if (this.inited) {
      this.pageChanged.emit(this.pager);
    }
  }

  public getText(key: string): string {
    return (this as any)[key + 'Text'] || this.config[key + 'Text'];
  }

  public noPrevious(): boolean {
    return this.page === 1;
  }

  public hasDirection(): boolean {
    return this.page > this.maxSize;
  }

  public hasBoundary(): boolean {
    return (Math.ceil(this.page / this.maxSize) - 1) * this.maxSize + 1 <= this.totalPages - this.maxSize;
  }

  public noNext(): boolean {
    return this.page === this.totalPages;
  }

  public selectPage(page: number, event?: MouseEvent): void {
    if (event) {
      event.preventDefault();
    }

    if (!this.disabled) {
      if (event && event.target) {
        let target: any = event.target;
        target.blur();
      }
      this.writeValue(page);
    }
  }

  onChangePageSize = (newPageSize: number) => {
    if (typeof newPageSize !== 'undefined') {
      this.itemsPerPage = newPageSize;
      this.totalPages = this.calculateTotalPages();
      this.writeValue(1);
    }
  };

  // Create page object used in template
  protected makePage(num: number, text: string, active: boolean): { number: number; text: string; active: boolean } {
    return { text, number: num, active };
  }

  protected getPages(currentPage: number, totalPages: number): any[] {
    let pages: any[] = [];
    // Default page limits
    let startPage = 1;
    let endPage = totalPages;
    let isMaxSized = typeof this.maxSize !== 'undefined' && this.maxSize < totalPages;
    // recompute if maxSize
    if (isMaxSized) {
      if (this.rotate) {
        startPage = Math.max(currentPage - Math.floor(this.maxSize / 2), 1);
        endPage = startPage + this.maxSize - 1;
        if (endPage > totalPages) {
          endPage = totalPages;
          startPage = endPage - this.maxSize + 1;
        }
      } else {
        startPage = (Math.ceil(currentPage / this.maxSize) - 1) * this.maxSize + 1;
        endPage = Math.min(startPage + this.maxSize - 1, totalPages);
      }
    }

    // Add page number links
    for (let num = startPage; num <= endPage; num++) {
      let page = this.makePage(num, num.toString(), num === currentPage);
      pages.push(page);
    }

    // Add links to move between page sets
    if (isMaxSized && !this.rotate) {
      if (startPage > 1) {
        let previousPageSet = this.makePage(startPage - 1, '...', false);
        pages.unshift(previousPageSet);
      }

      if (endPage < totalPages) {
        let nextPageSet = this.makePage(endPage + 1, '...', false);
        pages.push(nextPageSet);
      }
    }
    this.startIndex = (this.currentPageIndex - 1) * this.itemsPerPage;
    this.endIndex = Math.min(this.startIndex + this.itemsPerPage - 1, this.totalItems - 1);
    this._pager = <Pager>{
      startIndex: this.startIndex,
      endIndex: this.endIndex,
      currentPage: this.page
    };

    return pages;
  }

  // Caculate total of page
  protected calculateTotalPages(): number {
    let totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil(this.totalItems / this.itemsPerPage);
    return Math.max(totalPages || 0, 1);
  }

  trackByFn(index: number, item: any) {
    return index; // or item.id
  }
}
