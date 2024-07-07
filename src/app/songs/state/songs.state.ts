import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { LoadSongs, LoadSong, CreateSong, UpdateSong, DeleteSong } from './songs.actions';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { SongsService } from '../../services/songs.service';
import { Song } from '../../models/song';

export interface SongsStateModel {
  songs: Song[];
  selectedSong: Song | null;
  state: 'idle' | 'pending' | 'fulfilled' | 'error';
}

@State<SongsStateModel>({
  name: 'songs',
  defaults: {
    songs: [],
    selectedSong: null,
    state: 'idle'
  }
})
@Injectable()
export class SongsState {
  constructor(private songsService: SongsService) {}

  @Selector()
  static songs(state: SongsStateModel): Song[] {
    return state.songs;
  }

  @Selector()
  static selectedSong(state: SongsStateModel): Song | null {
    return state.selectedSong;
  }

  @Selector()
  static loadingState(state: SongsStateModel): 'idle' | 'pending' | 'fulfilled' | 'error' {
    return state.state;
  }

  @Action(LoadSongs)
  loadSongs(ctx: StateContext<SongsStateModel>) {
    ctx.patchState({ state: 'pending' });
    return this.songsService.getSongs().pipe(
      tap((songs) => ctx.patchState({ songs, state: 'fulfilled' })),
      catchError((error) => {
        ctx.patchState({ state: 'error' });
        return throwError(()=> error);
      })
    );
  }

  @Action(LoadSong)
  loadSong(ctx: StateContext<SongsStateModel>, action: LoadSong) {
    ctx.patchState({ state: 'pending' });
    return this.songsService.getSong(action.id).pipe(
      tap((selectedSong) => ctx.patchState({ selectedSong, state: 'fulfilled' })),
      catchError((error) => {
        ctx.patchState({ state: 'error' });
        return throwError(()=> error);
      })
    );
  }

  @Action(CreateSong)
  createSong(ctx: StateContext<SongsStateModel>, action: CreateSong) {
    ctx.patchState({ state: 'pending' });
    return this.songsService.createSong(action.payload).pipe(
      tap((newSong) => {
        const state = ctx.getState();
        ctx.patchState({
          songs: [...state.songs, newSong],
          state: 'fulfilled'
        });
      }),
      catchError((error) => {
        ctx.patchState({ state: 'error' });
        return throwError(()=>error);
      })
    );
  }

  @Action(UpdateSong)
  updateSong(ctx: StateContext<SongsStateModel>, action: UpdateSong) {
    ctx.patchState({ state: 'pending' });
    return this.songsService.updateSong(action.payload).pipe(
      tap((updatedSong) => {
        const state = ctx.getState();
        const songs = state.songs.map((song) =>
          song.id === action.id ? updatedSong : song
        );
        ctx.patchState({ songs, state: 'fulfilled' });
      }),
      catchError((error) => {
        ctx.patchState({ state: 'error' });
        return throwError(()=>error);
      })
    );
  }

  @Action(DeleteSong)
  deleteSong(ctx: StateContext<SongsStateModel>, action: DeleteSong) {
    ctx.patchState({ state: 'pending' });
    return this.songsService.deleteSong(action.id).pipe(
      tap(() => {
        const state = ctx.getState();
        const songs = state.songs.filter((song) => song.id !== action.id);
        ctx.patchState({ songs, state: 'fulfilled' });
      }),
      catchError((error) => {
        ctx.patchState({ state: 'error' });
        return throwError(()=>error);
      })
    );
  }
}