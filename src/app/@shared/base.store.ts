import { BehaviorSubject, Observable } from 'rxjs';

const LocalStorageService = {
  set: (key: string, value: any): void => {
    localStorage.setItem(key, value);
  },
  get: (key: string): string | null => {
    return localStorage.getItem(key);
  },
  delete: (key: string): void => {
    localStorage.removeItem(key);
  },
  clearAll: (): void => {
    localStorage.clear();
  },
};

const CacheStore = {
  get: (key: string) => {
    try {
      return JSON.parse(LocalStorageService.get(key) as any);
    } catch (error) {
      return {};
    }
  },
  set: (key: string, value: any) => {
    return LocalStorageService.set(key, JSON.stringify(value));
  },
  remove: (key: string) => {
    return LocalStorageService.delete(key);
  },
};
export class BaseStore<T> {
  private obs$!: BehaviorSubject<T>;
  private cacheKey: string | undefined;
  private initialValueSnapShot: T;
  constructor(initialValue: T, cacheKey: string = null) {
    this.cacheKey = cacheKey;
    if (initialValue === null) {
      this.obs$ = new BehaviorSubject<T>(CacheStore.get(cacheKey));
    } else {
      this.obs$ = new BehaviorSubject<T>(initialValue);
    }
    this.initialValueSnapShot = initialValue;
  }
  getValue = (): T => this.obs$.value;
  get = (): Observable<T> => this.obs$.asObservable();
  set = (payload: T) => {
    this.cacheKey ? CacheStore.set(this.cacheKey, payload) : null;
    this.obs$.next(payload);
  };
  update = (callBack: (pv: T) => T) => {
    const updatedValues = callBack(this.getValue());
    this.cacheKey ? CacheStore.set(this.cacheKey, updatedValues) : null;
    this.obs$.next(updatedValues);
  };
  patch = (payload: Partial<T>) => {
    let margeValues = { ...this.obs$.value, ...payload };
    this.cacheKey ? CacheStore.set(this.cacheKey, margeValues) : null;
    this.obs$.next(margeValues);
  };
  reset = () => {
    this.cacheKey ? CacheStore.remove(this.cacheKey) : null;
    this.obs$.next(this.initialValueSnapShot);
  };
  clear = () => {
    this.obs$.next(null as any);
    this.cacheKey ? CacheStore.remove(this.cacheKey) : null;
  };
}
const isEmpty = (value: any): boolean => {
  if (typeof value === 'string') {
    return value.length === 0;
  }
  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  return value === undefined || value === null || value === '';
};
