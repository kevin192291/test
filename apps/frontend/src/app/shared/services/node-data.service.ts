import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { take } from "rxjs/operators";
import { IDataService } from "./../interfaces/dataService.interface";

@Injectable({
  providedIn: "root"
})
export class NodeService<T> implements IDataService<T> {
  private _base: string = null;
  constructor(
    @Inject(String) protected base: string,
    private http: HttpClient
  ) {
    this._base = base;
  }
  ready: import("rxjs").BehaviorSubject<boolean>;
  name: "Mock Backend Service";

  public async GetAll(endpoint?: string, filter?: any): Promise<T[]> {
    const result = this.http.get<T[]>(`${this._base}/${endpoint}`).toPromise();
    return result;
  }

  public async GetSingle(endpoint?: string, id?: string | number): Promise<T> {
    const result = await this.http.get<T>(`${this._base}/${endpoint}/${id}`).toPromise();
    return result;
  }

  public async Create(endpoint?: string, body?: any): Promise<T> {
    const result = await this.http
      .post<T>(`${this._base}/${endpoint}`, body)
      .pipe(take(1))
      .toPromise();
    return result;
  }

  public async Update(
    endpoint?: string,
    id?: string | number,
    body?: any
  ): Promise<T> {
    const result = await this.http
      .put<T>(`${this._base}${endpoint ? '/' : ''}${endpoint}${id ? '/' : ''}${id}`, body)
      .pipe(take(1))
      .toPromise();
    return result;
  }

  public async Delete(endpoint: string, id: string | number): Promise<T> {
    const result = await this.http
      .delete<T>(`${this._base}/${endpoint}/${id}`)
      .pipe(take(1))
      .toPromise();
    return result;
  }


}
