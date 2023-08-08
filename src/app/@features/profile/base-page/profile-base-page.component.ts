import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/@services/local-storage.service';

@Component({
  templateUrl: './profile-base-page.component.html',
  styleUrls: ['./profile-base-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileBasePageComponent {
  constructor(
    private localStorageService: LocalStorageService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}
  user;
  userId: string;
  myProfile = false;

  ngOnInit(): void {
    this.userId = this.activeRoute.snapshot.paramMap.get('id');
    this.user = this.localStorageService.getUser();
    this.myProfile = this.userId == this.user.id;

    this.activeRoute.params.subscribe((routeParams) => {
      console.log('ProfileBasePageComponent', routeParams);
    });
  }
  isAuthenticated = this.localStorageService.isAuthenticated();
}
