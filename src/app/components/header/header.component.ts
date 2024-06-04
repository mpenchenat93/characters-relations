import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ScreenSizeService } from '../../services/screen-size.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  items: any = [];

  screenWidth: number = 0;

  constructor(
    private router: Router,
    private screenSizeService: ScreenSizeService
  ) {
    this.items = [
      {
        label: 'Accueil',
        icon: 'pi pi-home',
        command: () => this.goToHome(),
      },
      {
        label: 'À propos',
        icon: 'pi pi-book',
        command: () => this.goToAbout(),
      },
      {
        label: 'Contact',
        icon: 'pi pi-envelope',
        command: () => this.goToContact(),
      },
      {
        label: 'Index Valtorta',
        icon: 'pi pi-external-link',
        command: () => this.goToIndex(),
      },
    ];
  }

  ngOnInit(): void {
    this.screenSizeService.screenWidth$.subscribe((width) => {
      this.screenWidth = width;
    });
  }

  goToHome(): void {
    this.router.navigate(['characters']);
  }

  goToContact(): void {
    this.router.navigate(['contact']);
  }

  goToAbout(): void {
    this.router.navigate(['about']);
  }

  goToIndex(): void {
    window.open('https://www.indexvaltorta.fr', '_blank');
  }
}
