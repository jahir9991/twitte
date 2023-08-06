import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/@services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './auth-base-page.component.html',
  styleUrls: ['./auth-base-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthBasePageComponent implements OnInit {
  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.localStorageService.clearAll();
  }
}
