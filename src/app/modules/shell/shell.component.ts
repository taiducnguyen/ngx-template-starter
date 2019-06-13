import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  isToggleNav: boolean;
  isToggleSearch: boolean;

  constructor() {}

  ngOnInit() {}

  onToggleNav = (isToggle: boolean) => {
    this.isToggleNav = isToggle;
  };

  onToggleSearch = (isToggleSearch: boolean) => {
    this.isToggleSearch = isToggleSearch == false ? isToggleSearch : !this.isToggleSearch;
  };
}
