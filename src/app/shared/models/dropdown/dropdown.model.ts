export interface DropdownModel {
  value: string | number;
  text: string;
  selected?: boolean;
}

export class DropdownResponseModel {
  id: number | string;
  name: string;
}
