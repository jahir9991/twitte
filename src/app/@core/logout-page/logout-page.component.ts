import { Component, OnInit } from '@angular/core';
import { AuthApiService } from 'src/app/@services/api/auth-api.service';

@Component({
  templateUrl: './logout-page.component.html',
  styleUrls: ['./logout-page.component.scss'],
})
export class LogoutPageComponent implements OnInit {
  constructor(private authservice: AuthApiService) {}

  ngOnInit(): void {
    this.authservice.logout();
  }
}
