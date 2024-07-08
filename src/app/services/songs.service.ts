import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Song, SongDTO } from '../models/song';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  private baseUrl = `${environment.apiUrl}/songs`;

  constructor(private http: HttpClient) {}

  // Obtener todas las canciones
  getSongs(): Observable<Song[]> {
    return this.http.get<Song[]>(`${this.baseUrl}?_expand=artist`);
  }

  // Obtener una canción por ID
  getSong(id: number): Observable<Song> {
    return this.http.get<Song>(`${this.baseUrl}/${id}?_expand=artist`);
  }

  // Crear una nueva canción
  createSong(song: SongDTO): Observable<Song> {
    return this.http.post<Song>(this.baseUrl, song);
  }

  // Actualizar una canción existente
  updateSong(song: SongDTO): Observable<Song> {
    return this.http.put<Song>(`${this.baseUrl}/${song.id}`, song);
  }

  // Eliminar una canción
  deleteSong(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
