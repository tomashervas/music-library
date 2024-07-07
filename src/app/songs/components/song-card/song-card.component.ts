import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Song } from '../../../models/song';
import { Router } from '@angular/router';

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrl: './song-card.component.scss'
})
export class SongCardComponent {
  @Input() song!: Song;
  @Output() delete = new EventEmitter<number>();

  constructor(private router: Router) {}

  goDetail(): void {
    this.router.navigate(['/songs', this.song.id]);
  }

}
