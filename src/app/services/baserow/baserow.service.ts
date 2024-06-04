// src/app/services/data.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaserowService {
  private baseUrl = 'https://baserow.indexvaltorta.fr/api/database/rows';
  private peopleTableId = 613;
  private relationsTableId = 646;
  private queryParams = '?user_field_names=true&size=1000';

  private token = '9egiSP8xL5rk3Nr64GdL4Ch3UJsu9zmC';

  constructor(private http: HttpClient) {}

  private charactersUrl = 'assets/characters.json';
  private relationsUrl = 'assets/relations.json';

  async getCharacters(): Promise<any> {
    return firstValueFrom(this.http.get<any>(this.charactersUrl)).then(
      (characters: any) => {
        return characters.results;
      }
    );
  }

  async getRelations(): Promise<any> {
    return firstValueFrom(this.http.get<any>(this.relationsUrl)).then(
      (relations: any) => {
        return relations.results;
      }
    );
  }

  getSettings() {
    // table/661/?user_field_names=true
    // const settingsUrl = `${this.baseUrl}/table/661/${this.queryParams}`;
    // return this.fetchAllData(settingsUrl);
    return Promise.resolve([{ Email: 'indexmariavaltorta@hotmail.com' }]);
  }

  // getCharacters() {
  //   const peopleUrl = `${this.baseUrl}/table/${this.peopleTableId}/${this.queryParams}`;
  //   return this.fetchAllData(peopleUrl);
  // }

  // getRelations() {
  //   const relationsUrl = `${this.baseUrl}/table/${this.relationsTableId}/${this.queryParams}`;
  //   return this.fetchAllData(relationsUrl);
  // }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        Authorization: `Token ${this.token}`,
      }),
    };
  }

  private fetchAllData(
    url: string,
    accumulatedData: any[] = []
  ): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.http.get(url, this.getHttpOptions()).subscribe({
        next: (data: any) => {
          accumulatedData = accumulatedData.concat(data.results);
          if (data.next) {
            const url = data.next.replace(
              'http://baserow.indexvaltorta.fr',
              ''
            );
            this.fetchAllData(url, accumulatedData).then(resolve).catch(reject);
          } else {
            resolve(accumulatedData);
          }
        },
        error: (err: any) => {
          reject(err);
        },
      });
    });
  }
}
