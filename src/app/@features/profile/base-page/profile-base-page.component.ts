import { Component } from '@angular/core';
import {
  ActivatedRoute,
  Route,
  RouteReuseStrategy,
  Router,
} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from 'src/app/@services/local-storage.service';

@Component({
  templateUrl: './profile-base-page.component.html',
  styleUrls: ['./profile-base-page.component.scss'],
})
export class ProfileBasePageComponent {
  constructor(
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  user;
  userId: number;
  myProfile = false;

  ngOnInit(): void {
    this.userId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.user = this.localStorageService.getUser();
    this.myProfile = this.userId == this.user.id;
  }
  isAuthenticated = this.localStorageService.isAuthenticated();
}
