import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/@services/local-storage.service';

@Component({
    selector: 'app-aside-nav',
    templateUrl: './aside-nav.component.html',
    styleUrls: ['./aside-nav.component.scss']
})
export class AsideNavComponent {
    constructor(
        private localStoreService: LocalStorageService,
        private route: ActivatedRoute
    ) { }

    user: any;

    ngOnInit(): void {
        this.user = this.localStoreService.getUser();
    }
}