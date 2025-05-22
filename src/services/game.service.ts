import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGame } from 'src/interfaces/game.interface';
import { ApiService } from './api.service';
import { API_URLS } from 'src/constants/api-endpoints.const';

const API_ENDPOINT = API_URLS.games;

@Injectable()
export class GameService extends ApiService<IGame> {

  constructor(httpClient: HttpClient) {
    super(httpClient, API_ENDPOINT);
  }
}
