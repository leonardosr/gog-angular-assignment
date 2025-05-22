import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGame } from 'src/interfaces/game.interface';
import { ILibraryItem } from 'src/interfaces/library-item.interface';

@Injectable()
export class LibraryService {

  constructor(protected readonly httpClient: HttpClient) { }
  public getAll(): Observable<ILibraryItem[]> {
    return this.httpClient.get<ILibraryItem[]>('http://localhost:3000/library');
  }
}
