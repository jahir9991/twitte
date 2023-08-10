import {
  RouteReuseStrategy,
  DetachedRouteHandle,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { ComponentRef, Injectable } from '@angular/core';

@Injectable()
export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private handlers: { [key: string]: RootHandler } = {};
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return this.isDetachable(route);
  }

  store(route: ActivatedRouteSnapshot, handler: DetachedRouteHandle) {
    const storeKey = this.getStoreKey(route);
    if (handler) {
      // I need to keep track of the time the route is stored so I added storeTime.
      const rootHandler = {
        handle: handler,
        storeTime: +new Date(),
      };
      this.handlers[storeKey] = rootHandler;
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const storeKey = this.getStoreKey(route);
    if (this.isAtachable(route, storeKey)) {
      // you can retrun true only
      // clearNewerHandlerOnAttach is optional
      // when load the snapshot (attach old route) I only want to keep routes stored before this route
      // and delete routes stored after this route.
      // for exmaple, if i go to product list and then product detail and then saler information
      // if product list, product detail and saler information are all detachable.
      // when I back from saler information to product detail I don't want to store saler information
      // and when I back from product detail to product list I don't want to store product detail route
      // because I when I go back to product list and then go to the same product detail again
      // I want to load new data. Why?
      // I think people rarely go back and fort 2 pages multiple time
      // by deleting unnecessary stored route we save memory.
      this.clearNewerHandlerOnAttach(this.handlers[storeKey].storeTime);
      return true;
    }
    return false;
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    const storeKey = this.getStoreKey(route);
    return this.handlers[storeKey]?.handle;
  }

  shouldReuseRoute(
    future:ActivatedRouteSnapshot,
    current: ActivatedRouteSnapshot
  ): boolean {  
    // return false;
    return future['_routerState']?.url === current['_routerState']?.url;
  }

  private getResolvedUrl(route: ActivatedRouteSnapshot): string {
    return route.pathFromRoot
      .map((v) => v.url.map((segment) => segment.toString()).join('/'))
      .join('/');
  }

  private getStoreKey(route: ActivatedRouteSnapshot): string {
    const baseUrl = this.getResolvedUrl(route);
    const childrenParts = [];
    let deepestChild = route;
    while (deepestChild.firstChild) {
      deepestChild = deepestChild.firstChild;
      childrenParts.push(deepestChild.url.join('/'));
    }
    return baseUrl + '////' + childrenParts.join('/');
  }

  // true if we mark this route shouldDetach:true
  // see it in route config
  private isDetachable(route: ActivatedRouteSnapshot) {
    if (route?.routeConfig?.data?.['shouldCached']) {
      return true;
    }
    return false;
  }

  private isAtachable(route: ActivatedRouteSnapshot, storeKey: string) {
    if (this.isDetachable(route) && this.handlers[storeKey]?.handle) {
      return true;
    }
    return false;
  }

  /*
  When the user goes back (attach a root)
  I want to clear newer stored roots.
  */
  private clearNewerHandlerOnAttach(storeTime: number) {
    const handlerKeys = Object.keys(this.handlers);
    handlerKeys.forEach((k) => {
      if (this.handlers[k].storeTime > storeTime) {
        const componentRef: ComponentRef<any> = (this.handlers[k].handle as any)
          .componentRef;
        if (componentRef) {
          componentRef.destroy();
        }
        delete this.handlers[k];
      }
    });
  }
}

export interface RootHandler {
  handle: DetachedRouteHandle;
  storeTime: number;
}
