import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-detail',
  templateUrl: './table-detail.component.html',
  styleUrl: './table-detail.component.css',
})
export class TableDetailComponent {
  @Input() character?: any;

  constructor(private router: Router) {}

  detail(characterId: number) {
    this.router.navigate(['/characters', characterId]);
  }

  openWikiArticle(link: string) {
    window.open(link, '_blank');
  }
}
