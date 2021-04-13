import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Generic } from '../models/generic';

export abstract class CommonService<E extends Generic> {
  
  protected baseEndPoint :string;
  protected header: HttpHeaders= new HttpHeaders({'Content-Type':'application/json'});

  constructor(protected http:HttpClient) { }

  public list(): Observable<E[]>{
    return this.http.get<E[]>(this.baseEndPoint);
    
    /*return this.http.get(this.baseEndPoint).pipe(
      map(students => students as Student[])
    );*/
  }

  public listPages(page: string, size: string): Observable<any>{
    const params = new HttpParams()
                .set('page',page)
                .set('size',size);
    return this.http.get<any>(`${this.baseEndPoint}/page`,{params:params});
  }

  public getById(id:number):Observable<E>{
    return this.http.get<E>(`${this.baseEndPoint}/${id}`);  
  }

  public create(e:E):Observable<E>{
    return this.http.post<E>(this.baseEndPoint,e,{headers : this.header});
  }

  public update(e:E):Observable<E>{
    return this.http.put<E>(`${this.baseEndPoint}/${e.id}`,e,{headers : this.header});
  }

  public remove(id:number):Observable<void>{
    return this.http.delete<void>(`${this.baseEndPoint}/${id}`);
  }
}
