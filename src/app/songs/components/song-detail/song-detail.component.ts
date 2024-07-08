import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Song } from '../../../models/song';
import { SongsState } from '../../state/songs.state';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteSong, LoadSong } from '../../state/songs.actions';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrl: './song-detail.component.scss'
})
export class SongDetailComponent {
  song$: Observable<Song | null> = this.store.select(SongsState.selectedSong);
  loadingState$: Observable<'idle' | 'pending' | 'fulfilled' | 'error'> = this.store.select(SongsState.loadingState);
  songId!: number;

  constructor(private route: ActivatedRoute, private store: Store, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap?.get('id');
    if (id) this.songId = +id;
    this.store.dispatch(new LoadSong(this.songId));
  }

  onDelete(): void {
    this.store.dispatch(new DeleteSong(this.songId)).subscribe(() => {
      this.router.navigate(['/songs']);
    });
  }

  onEdit(): void {
    this.router.navigate(['/songs/edit', this.songId]);
  }

}
