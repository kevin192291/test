import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { takeWhile } from "rxjs/operators";
import { IDataService } from "./../interfaces/dataService.interface";
import { NodeService } from './node-data.service';

export abstract class DataService<T> implements IDataService<T> {
  public ready: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private backendService: NodeService<T> = null;

  constructor(protected base: string, private _http: HttpClient) {
    // This would be injected from a repository,
    // If we had multiple services, we could also
    // load this dynamically
    this.backendService = new NodeService(this.base, this._http);
    this.ready.next(true);
  }
  name = "DataService";

  public async GetAll(endpoint?: string, filter?: any): Promise<T[]> {
    await this.ready.pipe(takeWhile((val) => val != true)).toPromise();
    const result = await this.backendService.GetAll(endpoint, filter);
    return result;
  }
  public async GetSingle(endpoint?: string, id?: string): Promise<T> {
    await this.ready.pipe(takeWhile((val) => val != true)).toPromise();
    const result = await this.backendService.GetSingle(endpoint, id);
    return result;
  }
  public async Create(endpointUrl?: string, body?: any): Promise<T> {
    await this.ready.pipe(takeWhile((val) => val != true)).toPromise();
    const result = await this.backendService.Create(endpointUrl, body);
    return result;
  }
  public async Update(
    endpointUrl?: string,
    id?: string | number,
    body?: any
  ): Promise<T> {
    await this.ready.pipe(takeWhile((val) => val != true)).toPromise();
    const result = await this.backendService.Update(endpointUrl, id, body);
    return result;
  }
  public async Delete(endpointUrl?: string, id?: string | number): Promise<T> {
    await this.ready.pipe(takeWhile((val) => val != true)).toPromise();
    const result = await this.backendService.Delete(endpointUrl, id);
    return result;
  }
}
