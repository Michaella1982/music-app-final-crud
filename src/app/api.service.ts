import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Album } from './album';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiUrl = "/api";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      return of(result as T);
    };
  }
  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(apiUrl)
      .pipe(
        tap(albums => console.log('fetched Albums')),
        catchError(this.handleError('getAlbums', []))
      );
  }

  getAlbum(id: number): Observable<Album> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Album>(url).pipe(
      tap(_ => console.log(`fetched Album id=${id}`)),
      catchError(this.handleError<Album>(`getAlbum id=${id}`))
    );
  }

  addAlbum(album: Album): Observable<Album> {
    return this.http.post<Album>(apiUrl, album, httpOptions).pipe(
      tap((ab: Album) => console.log(`added Album w/ id=${ab._id}`)),
      catchError(this.handleError<Album>('addAlbum'))
    );
  }

  updateAlbum(id: any, album: Album): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, album, httpOptions).pipe(
      tap(_ => console.log(`updated Album id=${id}`)),
      catchError(this.handleError<any>('updateAlbum'))
    );
  }

  deleteAlbum(id: any): Observable<Album> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Album>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Album id=${id}`)),
      catchError(this.handleError<Album>('deleteAlbum'))
    );
  }

}
