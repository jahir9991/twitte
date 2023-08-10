import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { ENV } from 'src/environments/environment';
const storagePrefix = ENV.SESSION_STORAGE_PREFIX;
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  // logoutForce() {
  //   this.clearAll();
  //   window.location.href = '/auth';
  // }

  isTokenExpired(tokens: number): boolean {
    const date: Date = new Date(tokens * 1000);
    const parsedDate = Date.parse(date.toString());
    if (parsedDate - Date.now() > 0) {
      return false;
    } else {
      return true;
    }
  }

  isTokenValid(): boolean {
    try {
      let data: any = localStorage.getItem(`${storagePrefix}token`);
      let dd: any = jwtDecode(data);
      return !this.isTokenExpired(dd?.exp);
    } catch (error) {
      return false;
    }
  }

  getDecodedToken(): any {
    try {
      let data: any = localStorage.getItem(`${storagePrefix}token`);
      return jwtDecode(data);
    } catch (error) {
      return error;
    }
  }
  getToken() {
    try {
      let data: any = localStorage.getItem(`${storagePrefix}token`);
      return JSON.parse(data) as string;
    } catch (error) {
      return error;
    }
  }

  removeToken() {
    this.removeData(`${storagePrefix}token`);
  }

  getRefreshToken() {
    try {
      let data: any = localStorage.getItem(`${storagePrefix}refresh-token`);
      return JSON.parse(data) as string;
    } catch (error) {
      return error;
    }
  }
  setRefreshToken(token: string) {
    try {
      localStorage.setItem(
        `${storagePrefix}refresh-token`,
        JSON.stringify(token)
      );
    } catch (error) {
      return error;
    }
  }
  setToken(token: string) {
    try {
      localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
    } catch (error) {
      return error;
    }
  }
  setPermissions(pr: string[]) {
    try {
      localStorage.setItem(`${storagePrefix}permissions`, JSON.stringify(pr));
    } catch (error) {
      return error;
    }
  }
  getPermissions() {
    try {
      let data: any = localStorage.getItem(`${storagePrefix}permissions`);
      return JSON.parse(data) as string;
    } catch (error) {
      return error;
    }
  }
  getRole() {
    try {
      let data: any = localStorage.getItem(`${storagePrefix}role`);
      return JSON.parse(data) as string;
    } catch (error) {
      return error;
    }
  }
  setRole(role: string) {
    try {
      localStorage.setItem(`${storagePrefix}role`, JSON.stringify(role));
    } catch (error) {
      return error;
    }
  }
  clearAll() {
    try {
      localStorage.clear();
    } catch (error) {
      return error;
    }
  }
  setData(data: any, key: string) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      return error;
    }
  }
  getDate(key: string) {
    try {
      let data: any = localStorage.getItem(key);
      return JSON.parse(data);
    } catch (error) {
      return error;
    }
  }
  removeData(key: string) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      return error;
    }
  }
}
