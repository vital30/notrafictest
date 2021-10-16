import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  static readonly GET_zones_URL = 'http://52.59.100.163:8000/zones'; 
  static readonly create_zones_URL = '/assets/create_zones.json'; 


  getPolygones(): Observable<any> {
    const url = ServiceService.GET_zones_URL;
    return this.http.get(url);
  }

  deleteZone(id:any): Observable<any> {
    const url = ServiceService.GET_zones_URL+"/"+id;
    return this.http.delete(url);
  }
  createZone(zone:any): Observable<any> {
    const url = ServiceService.GET_zones_URL;
    return this.http.post(url,zone);
  }
}
