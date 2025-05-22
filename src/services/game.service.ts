import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGame } from 'src/interfaces/game.interface';

@Injectable()
export class GameService {

  constructor(protected readonly httpClient: HttpClient) { }
  public getAll(): Observable<IGame[]> {
    return this.httpClient.get<IGame[]>('http://localhost:3000/games');
  }
}
