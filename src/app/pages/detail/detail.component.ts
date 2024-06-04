import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaserowFormatService } from '../../services/baserow/baserow.format.service';
import { BaserowService } from '../../services/baserow/baserow.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class DetailComponent {
  characters: any[] = [];
  relations: any[] = [];

  character: any;

  loaded: any = null;

  constructor(
    private route: ActivatedRoute,
    private baserowFormat: BaserowFormatService,
    private baserowService: BaserowService
  ) {}

  async ngOnInit() {
    const characterId = this.route.snapshot.paramMap.get('id');
    let _relations = JSON.parse(sessionStorage.getItem('relations') || '[]');
    let _characters = JSON.parse(sessionStorage.getItem('characters') || '[]');

    if (!_characters.length || !_relations.length) {
      this.loaded = false;

      // Characters
      const charactersData = await this.baserowService.getCharacters();
      _characters = this.baserowFormat.formatCharacters(charactersData);

      // Relations
      const relationsData = await this.baserowService.getRelations();
      _relations = this.baserowFormat.formatRelations(relationsData);

      this.loaded = true;
    }

    _characters = this.baserowFormat.addRelations(_characters, _relations);

    this.characters = _characters;
    this.relations = _relations;

    this.character = this.characters.find(
      (character) => character.id == characterId
    );
  }

  onCharacterIdOut(characterId: any) {
    this.character = this.characters.find(
      (character) => character.id == characterId
    );
  }
}
