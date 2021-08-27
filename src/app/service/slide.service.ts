import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SlidesService {
  private apiUrl: string = 'https://dog.ceo/api/breeds/image/random';

  constructor(private http: HttpClient) { }

  getImages(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
