import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URLS } from 'src/constants/api-endpoints.const';
import { IContent } from 'src/interfaces/featured-content.interface';
import { ApiService } from './api.service';

const API_ENDPOINT = API_URLS.content;

@Injectable()
export class ContentService extends ApiService<IContent> {

  constructor(httpClient: HttpClient) {
    super(httpClient, API_ENDPOINT);
  }
}