import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class BaserowFormatService {
  constructor(private sanitizer: DomSanitizer) {}

  formatRelations(relationsData: any) {
    return relationsData.map((relation: any) => {
      const from = relation['from']?.length > 0 ? relation['from'][0].id : '';
      const to = relation['to']?.length > 0 ? relation['to'][0].id : '';
      const label = relation['Nom'] ? relation['Nom'].value : '';

      return {
        from,
        to,
        label,
        arrows: relation['arrow'] ? 'to' : '',
      };
    });
  }

  formatCharacters(charactersData: any) {
    return charactersData
      .map((character: any) => {
        const gender = character['Genre']?.value || '';

        const chapterPresent =
          character['ChapitrePresent'].length > 0
            ? character['ChapitrePresent'].map((el: any) => el.value)
            : [];

        const chapterRef =
          character['ChapitreRef'].length > 0
            ? character['ChapitreRef'].map((el: any) => el.value)
            : [];

        const place = this.trimAndSort(character['Lieu']);
        const attributes = this.trimAndSort(character['Attributs']);
        const surnames = this.splitTrimAndSort(character['Appellations']);

        const strPlace = this.removeAccents(place.join(', '));
        const strAttributes = this.removeAccents(attributes.join(', '));
        const strSurnames = this.removeAccents(surnames.join(', '));
        const strChapterPresent = this.removeAccents(chapterPresent.join(', '));
        const strChapterRef = this.removeAccents(chapterRef.join(', '));

        return {
          id: character.id,
          label: character['Nom'] || '',
          isNotPresent: character['Non présent'],
          description: character['Description'],
          link: character['Lien'] || '',
          gender,
          attributes,
          surnames,
          place,
          chapterPresent,
          chapterRef,
          strPlace,
          strAttributes,
          strSurnames,
          strChapterPresent,
          strChapterRef,
        };
      })
      .sort((a: any, b: any) => a.label.localeCompare(b.label));
  }

  removeAccents(str: string) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  trimAndSort(str: any[]) {
    if (!str) return [];
    return str
      .map((el: any) => el.value.trim())
      .sort((a: any, b: any) => a.localeCompare(b));
  }

  splitTrimAndSort(str: string) {
    if (!str) return [];
    return str
      .split(',')
      .map((el: any) => el.trim())
      .sort((a: any, b: any) => a.localeCompare(b));
  }

  addRelations(characters: any[], relations: any[]) {
    return characters.map((character: any) => {
      return {
        ...character,
        relations: this.getRelations(character.id, relations, characters),
      };
    });
  }

  private getRelations(
    characterId: number,
    relations: any[],
    characters: any
  ): SafeHtml[] {
    const edges = relations.filter((rel: any) => {
      if (rel.from && rel.to) {
        if (rel.from === characterId || rel.to === characterId) {
          return true;
        }
      }
      return false;
    });

    const fromArr = edges
      .filter((edge: any) => {
        return edge.from === characterId;
      })
      .sort((a, b) => a.label - b.label);

    const toArr = edges
      .filter((edge: any) => {
        return edge.to === characterId;
      })
      .sort((a, b) => a.label - b.label);

    return [...fromArr, ...toArr].map((edge: any) => {
      if (window.innerWidth < 900) {
        return this.edgeToString(edge, characters, characterId);
      } else {
        return this.edgeToTr(edge, characters, characterId);
      }
    });
  }

  private edgeToTr(edge: any, characters: any, characterId: number): SafeHtml {
    const fromId = edge.from === characterId ? '' : `[${edge.from}]`;
    const toId = edge.to === characterId ? '' : `[${edge.to}]`;
    const arrow = edge.arrows ? '-->' : '—';
    const str = `
        <td style="text-align: right; padding-right: 5px">${fromId} ${this.getCharacterName(
      edge.from,
      characters
    )}</td>
        <td style="text-align: left">—(${edge.label})${arrow}</td>
        <td style="text-align: left; padding-left: 5px">${this.getCharacterName(
          edge.to,
          characters
        )} ${toId}</td>
    `;
    return this.sanitizer.bypassSecurityTrustHtml(str);
  }

  edgeToString(edge: any, characters: any, characterId: number): string {
    const fromId = edge.from === characterId ? '' : `[${edge.from}]`;
    const toId = edge.to === characterId ? '' : `[${edge.to}]`;
    const arrow = edge.arrows ? '-->' : '—';
    return `${fromId} ${this.getCharacterName(edge.from, characters)} —(${
      edge.label
    })${arrow} ${this.getCharacterName(edge.to, characters)} ${toId}`;
  }

  getCharacterName(characterId: number, characters: any[]): string {
    const character = characters.find((char: any) => char.id === characterId);
    return character ? character.label : '';
  }
}
