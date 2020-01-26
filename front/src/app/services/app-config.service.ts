import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private _pricePerElement: number;
  private _allegroUrl: string;

  constructor() {
    this._pricePerElement = 4;
  }

  get pricePerElement(): number {
    return this._pricePerElement;
  }

  set pricePerElement(value: number) {
    this._pricePerElement = value;
  }

  get allegroUrl(): string {
    return this._allegroUrl;
  }

  set allegroUrl(value: string) {
    this._allegroUrl = value;
  }
}
