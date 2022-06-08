import { Injectable } from '@angular/core';

export const LocalStorageKeys = {
  USER : "user",
  TOKEN : "token"
}


@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  getItem(key: string) {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  contain(key: string): boolean {
    if (localStorage.getItem(key)) {
      return true;
    } else {
      return false;
    }
  }

  getUserId():number{
    return Number.parseInt(this.getItem(LocalStorageKeys.USER));
  }
}
