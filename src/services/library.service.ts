import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILibraryItem } from 'src/interfaces/library-item.interface';
import { ApiService } from './api.service';
import { API_URLS } from 'src/constants/api-endpoints.const';

const API_ENDPOINT = API_URLS.library;

@Injectable()
export class LibraryService extends ApiService<ILibraryItem> {

  constructor(httpClient: HttpClient) {
    super(httpClient, API_ENDPOINT);
  }
}
