import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DropdownModel } from '@app/shared/models/dropdown/dropdown.model';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input() data: DropdownModel[];
  @Input() selected?: DropdownModel;
  @Output() onSelectedChange: EventEmitter<DropdownModel> = new EventEmitter();

  public isFocus: boolean;
  public selectedItem: DropdownModel;
  public isToggleDropdown: boolean;

  constructor() {}

  ngOnInit(): void {
    if (!this.selected && this.data) {
      this.selectedItem = this.data.find(d => d.selected) || this.data[0];
    }
  }

  onDropdownChange = (item: DropdownModel) => {
    this.selectedItem = item;
    this.onSelectedChange.emit(item);
  };

  onToggleDropdown = (isToggle: boolean) => {
    this.isToggleDropdown = isToggle ? false : !this.isToggleDropdown;
  };
}
