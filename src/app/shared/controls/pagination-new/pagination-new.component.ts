import {
  Component,
  EventEmitter,
  Input,
  Output,
  Inject,
  Injectable,
  forwardRef,
  OnChanges,
  OnInit
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Pager } from '../pagination/pagination.config';
import { CoreService } from '@app/shared/services/core.service';
import { ClientState } from '@app/shared/services/client/client-state';

export const PAGINATION_CONTROL_VALUE_ACCESSOR_NEW: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PaginationNewComponent),
  multi: true
};

export class PaginOptions {
  constructor() {
    this.previousText = 'Previous';
    this.nextText = 'Next';
  }

  previousText: string;
  nextText: string;
}

@Injectable()
@Component({
  selector: 'pagination-new',
  templateUrl: './pagination-new.component.html',
  providers: [PAGINATION_CONTROL_VALUE_ACCESSOR_NEW]
})
export class PaginationNewComponent implements ControlValueAccessor, OnChanges, OnInit {
  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;

  private _currentPageIndex: number;
  private _currentTotalItems: number;
  public pager: Pager;
  @Output() public pageChanged: EventEmitter<Pager> = new EventEmitter<Pager>();

  @Input() private options: PaginOptions;
  @Input() private totalItems: number;
  @Input() public currentPageIndex: number;
  @Input() public pageSize: number;

  constructor(private coreService: CoreService, private clientState: ClientState) {
    if (!this.options) {
      this.options = new PaginOptions();
    }
  }

  ngOnInit(): void {
    this._currentTotalItems = this.totalItems;
    this._currentPageIndex = this.currentPageIndex;
  }

  ngOnChanges() {
    if (this._currentTotalItems !== this.totalItems || this._currentPageIndex !== this.currentPageIndex) {
      this._currentPageIndex = this.currentPageIndex;
      this._currentTotalItems = this.totalItems;
      this.writeValue(this.currentPageIndex);
    }
  }

  public selectPage(page: number, event?: MouseEvent): void {
    if (event) {
      event.preventDefault();
    }

    if (event && event.target) {
      let target: any = event.target;
      target.blur();
    }

    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    this.writeValue(page);
    this.pageChanged.emit(this.pager);
  }

  writeValue(page: number): void {
    this.pager = this.getPager(this.totalItems, page);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  noPrevious = () => {
    return this.pager && this.pager.currentPage === 1;
  };

  noNext = () => {
    return this.pager && this.pager.currentPage === this.pager.totalPages;
  };

  getPager(totalItems: number, currentPage: number = 1): any {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / this.pageSize);

    let startPage: number, endPage: number;

    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 1 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * this.pageSize;
    let endIndex = Math.min(startIndex + this.pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = this.coreService._range(startPage, endPage + 1);

    // return object with all pager properties required by the view
    return <Pager>{
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: this.pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      isLastPage: currentPage == totalPages,
      pages: pages
    };
  }

  trackByFn(index: number, item: any) {
    return index; // or item.id
  }
}
