import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { CreateSong } from '../../state/songs.actions';
import { SongDTO } from '../../../models/song';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-song-new',
  templateUrl: './song-new.component.html',
  styleUrl: './song-new.component.scss'
})
export class SongNewComponent {

  songForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.songForm = this.fb.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      genre: this.fb.array([], Validators.required),
      year: [null, [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      rating: [null, [Validators.required, Validators.min(0), Validators.max(10)]],
      duration: [null, [Validators.required, Validators.min(0)]]
    });
  }

  get genre(): FormArray {
    return this.songForm.get('genre') as FormArray;
  }

  addGenre(genre: string): void {
    if (genre && !this.genre.value.includes(genre)) {
      this.genre.push(this.fb.control(genre));
    }
  }

  removeGenre(index: number): void {
    this.genre.removeAt(index);
  }

  onSubmit(): void {
    //aquí el arttista debería traerse de la bbdd y que el usuario pueda elegirlo en el form desde un listado, para este ejercicio ponemos 1
    if (this.songForm.valid) {
      const newSong: SongDTO = {
        duration: this.songForm.value.duration as number,
        genre: this.songForm.value.genre as string[],
        rating: this.songForm.value.rating as number,
        title: this.songForm.value.title as string,
        year: this.songForm.value.year as number,
        poster: 'http://dummyimage.com/400x600.png/cc0000/ffffff',
        artistId: 1
      }
      // console.log(newSong)
      this.store.dispatch(new CreateSong(newSong)).subscribe(() => {
        this.router.navigate(['/songs']);
      });
    }
  }

}
