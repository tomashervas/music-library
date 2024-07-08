import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Song } from '../../../models/song';
import { DeleteSong, LoadSongs } from '../../state/songs.actions';
import { SongsState } from '../../state/songs.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-song-list',
  templateUrl: './song-list.component.html',
  styleUrl: './song-list.component.scss'
})
export class SongListComponent {
  songs$: Observable<Song[]> = this.store.select(SongsState.songs);
  loadingState$: Observable<'idle' | 'pending' | 'fulfilled' | 'error'> = this.store.select(SongsState.loadingState);

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(new LoadSongs());
  }

  onDelete(id: number): void {
    this.store.dispatch(new DeleteSong(id));
  }
  onAdd(): void {
    this.router.navigate(['/songs/new']);
  }
}
