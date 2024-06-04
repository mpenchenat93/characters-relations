// src/app/graph.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JsonDataService {
  private nodesUrl = 'assets/nodes.json';
  private edgesUrl = 'assets/edges.json';

  constructor(private http: HttpClient) {}

  getNodes(): Observable<any> {
    return this.http.get<any>(this.nodesUrl);
  }

  getEdges(): Observable<any> {
    return this.http.get<any>(this.edgesUrl);
  }
}
