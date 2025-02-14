import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor() {}

  setStorageItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  setStorageSession(key: string, value: string): void {
    sessionStorage.setItem(key, value);
  }

  removeStorageItem(key: string): void {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  }

  clearSessionStorage(): void {
    sessionStorage.clear();
  }
}
