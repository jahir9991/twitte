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

export class BaseStore<T> extends BehaviorSubject<T> {
  private cacheKey: string | undefined;

  super() {
    this.super();
  }

  constructor(initialValue: T, cacheKey: string = null) {
    super(initialValue);

    this.cacheKey = cacheKey;

    if (cacheKey) {
      if (CacheStore.get(cacheKey) !== null) {
        initialValue = CacheStore.get(cacheKey);
      } else {
        CacheStore.set(this.cacheKey, initialValue);
      }
    }

    this.next(initialValue);
  }

  override next(value: T): void {
    if (this.cacheKey) {
      CacheStore.set(this.cacheKey, value);
    }
    super.next(value);
  }

  // set = (payload: T) => {
  //   this.cacheKey ? CacheStore.set(this.cacheKey, payload) : null;
  //   this.next(payload);
  // };
  update = (callBack: (pv: T) => T) => {
    const updatedValues = callBack(this.getValue());
    this.cacheKey ? CacheStore.set(this.cacheKey, updatedValues) : null;
    this.next(updatedValues);
  };
  patch = (payload: Partial<T>) => {
    let margeValues = { ...this.value, ...payload };
    this.cacheKey ? CacheStore.set(this.cacheKey, margeValues) : null;
    this.next(margeValues);
  };
  reset = () => {
    this.cacheKey ? CacheStore.remove(this.cacheKey) : null;
  };
  clear = () => {
    this.next(null as any);
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
