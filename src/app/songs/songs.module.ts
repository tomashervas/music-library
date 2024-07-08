import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SongsRoutingModule } from './songs-routing.module';
import { SongListComponent } from './components/song-list/song-list.component';
import { SongDetailComponent } from './components/song-detail/song-detail.component';
import { SongNewComponent } from './components/song-new/song-new.component';
import { SongCardComponent } from './components/song-card/song-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    SongListComponent,
    SongDetailComponent,
    SongNewComponent,
    SongCardComponent
  ],
  imports: [
    CommonModule,
    SongsRoutingModule,
    ReactiveFormsModule,
    TranslateModule.forChild()
  ]
})
export class SongsModule { }
