import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export abstract class ReadonlyService<Entity> {
    public constructor(
        protected readonly httpClient: HttpClient,
        protected readonly apiEndpoint: string,
    ) { }

    public getAll(): Observable<Entity[]> {
        return this.httpClient.get<Entity[]>(this.apiEndpoint);
    }

    public getById(id: number): Observable<Entity[]> {
        return this.httpClient.get<Entity[]>(`${this.apiEndpoint}/${id}`);
    }
}