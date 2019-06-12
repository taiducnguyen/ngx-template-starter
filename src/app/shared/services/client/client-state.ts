import { Injectable, Output, EventEmitter } from '@angular/core';
import { ApiUrl } from '../api-url/api-url';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ClientState {
  private _isBusy: boolean;
  private _isReloadComponent: boolean;
  private _isReloadCounterPartContact: boolean;
  private _isReloadCounterPartNotification: boolean;

  private _isProgressBarVisible: boolean = false;
  private progressTimeout: any = null;
  constructor(private location: Location) {}

  onGoBack = () => {
    this.location.back();
  };

  public set isProgressBarVisible(value: boolean) {
    if (value) {
      if (this.progressTimeout) {
        clearTimeout(this.progressTimeout);
      }
      this.progressTimeout = setTimeout(() => {
        this._isProgressBarVisible = value;
      }, 1000);
    } else {
      if (this.progressTimeout) {
        clearTimeout(this.progressTimeout);
      }
      this._isProgressBarVisible = value;
    }
  }

  public set isBusy(value: boolean) {
    this._isBusy = value;
    this.isProgressBarVisible = value;
  }

  public get isBusy(): boolean {
    return this._isBusy;
  }

  @Output() reloadUserProfile: EventEmitter<boolean> = new EventEmitter();

  onReloadUserProfile() {
    this._isReloadComponent = !this._isReloadComponent;
    this.reloadUserProfile.emit(this._isReloadComponent);
  }

  @Output() reloadCounterPartContact: EventEmitter<boolean> = new EventEmitter();

  onReloadCounterPartContact() {
    this._isReloadCounterPartContact = !this._isReloadCounterPartContact;
    this.reloadCounterPartContact.emit(this._isReloadCounterPartContact);
  }

  @Output() reloadCounterPartNotification: EventEmitter<boolean> = new EventEmitter();

  onReloadCounterPartNotification() {
    this._isReloadCounterPartNotification = !this._isReloadCounterPartNotification;
    this.reloadCounterPartNotification.emit(this._isReloadCounterPartNotification);
  }

  //---Timestamp for 30 days from now
  public get TimeStampFor30Days(): number {
    return new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
  }

  //---Timestamp for 15 days from now
  public get TimeStampFor15Days(): number {
    return new Date().getTime() + 15 * 24 * 60 * 60 * 1000;
  }

  //---Base server url
  public get BaseUrl(): string {
    return ApiUrl.BaseUrl;
  }
}
