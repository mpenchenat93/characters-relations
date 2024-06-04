import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrl: './character-sheet.component.css',
})
export class CharacterSheetComponent {
  @Input() character?: any;

  openWikiArticle(link: string) {
    window.open(link, '_blank');
  }

  split(str: string[]): string {
    return str.join(',\n');
  }
}
