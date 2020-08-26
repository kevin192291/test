import { BehaviorSubject } from 'rxjs';

export interface IDataService<T> {
    name: string;
    ready: BehaviorSubject<boolean>;
    GetAll(): Promise<T[]>;
    GetSingle(id: string): Promise<T>;
    Create(): Promise<T>;
    Update(): Promise<T>;
    Delete(endpoint: string, id: string | number): Promise<T>;
}