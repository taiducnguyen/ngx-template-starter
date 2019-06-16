import { Injectable } from '@angular/core';

export interface StorageInterface {
  onSetToken(tokenName: string, value: any): Promise<void>;
  onGetToken(tokenName: string): string;
  onGetTokenPromise(tokenName: string): Promise<string>;
  onRemoveToken(tokenName: string): Promise<void>;
  onRemoveAllTokens(): Promise<void>;
  onRemoveTokens(tokens: string[]): Promise<void>;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService implements StorageInterface {
  private _remember: boolean;

  onRemoveAllTokens(): Promise<void> {
    return Promise.resolve(localStorage.clear());
  }

  onRemoveTokens(tokens: string[]): Promise<void> {
    return Promise.resolve(this.onRemoveTokenKeys(tokens));
  }

  private onRemoveTokenKeys = (tokens: string[]) => {
    var storage = this._remember ? localStorage : sessionStorage;
    if (tokens && tokens.length > 0) {
      tokens.map(token => {
        storage.removeItem(token);
      });
    }
  };

  onSetToken = async (tokenName: string, value: any, remember?: boolean): Promise<void> => {
    this._remember = remember;
    var storage = remember ? localStorage : sessionStorage;
    return Promise.resolve(storage.setItem(tokenName, value));
  };

  onGetToken = (tokenName: string): string => {
    var storage = this._remember ? localStorage : sessionStorage;
    return storage.getItem(tokenName);
  };

  onGetTokenPromise = async (tokenName: string): Promise<string> => {
    var storage = this._remember ? localStorage : sessionStorage;
    return Promise.resolve(storage.getItem(tokenName));
  };

  onRemoveToken(tokenName: string): Promise<void> {
    var storage = this._remember ? localStorage : sessionStorage;
    return Promise.resolve(storage.removeItem(tokenName));
  }
}
