import { Component, OnInit } from '@angular/core';
import { ClientState } from '@app/shared/services/client/client-state';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  isToggleNav: boolean;
  isToggleSearch: boolean;

  constructor(private clientState: ClientState) {}

  ngOnInit() {}

  onToggleNav = (isToggle: boolean) => {
    this.isToggleNav = isToggle;
  };

  onToggleSearch = (isToggleSearch: boolean) => {
    this.isToggleSearch = isToggleSearch == false ? isToggleSearch : !this.isToggleSearch;
  };
}
