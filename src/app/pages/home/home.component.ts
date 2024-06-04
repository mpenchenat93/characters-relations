import { Component, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SortEvent } from 'primeng/api';
import { Table } from 'primeng/table';

import { BaserowFormatService } from '../../services/baserow/baserow.format.service';
import { BaserowService } from '../../services/baserow/baserow.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  @ViewChild('dt') dt: Table | undefined;

  relations: any = [];

  characters: any = [];
  initialValue: any = [];

  expandedRows: any = {};

  isSorted: boolean | null = null;

  nbElements: number = 0;

  loaded = false;

  topMobile = window.innerWidth < 636;
  topMobilePaginator = window.innerWidth < 645;

  showPageLinks = true;
  showFirstLastIcon = true;
  showCurrentPageReport = false;

  constructor(
    private baserowService: BaserowService,
    private baserowFormat: BaserowFormatService,
    private sanitizer: DomSanitizer
  ) {}

  async ngOnInit(): Promise<void> {
    const _relations = JSON.parse(sessionStorage.getItem('relations') || '[]');
    let _characters = JSON.parse(sessionStorage.getItem('characters') || '[]');

    if (this.topMobilePaginator) {
      this.showPageLinks = false;
      this.showFirstLastIcon = false;
      this.showCurrentPageReport = true;
    }

    if (_characters.length && _relations.length) {
      _characters = this.baserowFormat.addRelations(_characters, _relations);

      this.characters = _characters;
      this.relations = _relations;

      this.initialValue = [..._characters];
      this.nbElements = this.characters.length;

      this.loaded = true;
    } else {
      try {
        // Characters
        const charactersData = await this.baserowService.getCharacters();
        let characters = this.baserowFormat.formatCharacters(charactersData);

        // Relations
        const relationsData = await this.baserowService.getRelations();
        const relations = this.baserowFormat.formatRelations(relationsData);

        characters = this.baserowFormat.addRelations(characters, relations);

        this.relations = relations;
        this.characters = characters;

        this.initialValue = [...characters];
        this.nbElements = this.characters.length;

        this.loaded = true;

        sessionStorage.setItem('characters', JSON.stringify(this.initialValue));
        sessionStorage.setItem('relations', JSON.stringify(relations));
      } catch (error) {
        console.error('Error', error);
      }
    }
  }

  getColspan(): number {
    return this.topMobile ? 7 : 6;
  }

  expandAll() {
    this.expandedRows = this.characters.reduce(
      (acc: any, p: any) => (acc[p.id] = true) && acc,
      {}
    );
  }

  collapseAll() {
    this.expandedRows = {};
  }

  hasDetail(node: any) {
    return (
      node.relations.length ||
      node.link ||
      node.description ||
      node.isNotPresent
    );
  }

  split(str: string[]): string {
    return str.join(',\n');
  }

  getGenderIcon(gender: string): SafeHtml {
    const icon =
      gender === 'Homme'
        ? 'H. <i class="pi pi-mars" style="font-size: 1rem"></i>'
        : 'F. <i class="pi pi-venus" style="font-size: 1.2rem"></i>';
    return this.sanitizer.bypassSecurityTrustHtml(icon);
  }

  applyGlobalFilter(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (this.dt) this.dt.filterGlobal(inputElement.value.trim(), 'contains');
  }

  customSort(event: SortEvent) {
    if (this.isSorted == null || this.isSorted === undefined) {
      this.isSorted = true;
      this.sortTableData(event);
    } else if (this.isSorted == true) {
      this.isSorted = false;
      this.sortTableData(event);
    } else if (this.isSorted == false) {
      this.isSorted = null;
      this.characters = [...this.initialValue];
      if (this.dt) this.dt.reset();
    }
  }

  sortTableData(event: any) {
    event.data.sort((data1: any, data2: any) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;
      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return event.order * result;
    });
  }

  onTableFilter(event: any) {
    this.nbElements = event.filteredValue
      ? event.filteredValue.length
      : this.characters.length;
  }
}
