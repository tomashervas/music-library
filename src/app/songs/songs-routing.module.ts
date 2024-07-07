import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SongListComponent } from './components/song-list/song-list.component';
import { SongNewComponent } from './components/song-new/song-new.component';
import { SongDetailComponent } from './components/song-detail/song-detail.component';

const routes: Routes = [
  { path: '', component: SongListComponent },
  { path: 'new', component: SongNewComponent },
  { path: ':id', component: SongDetailComponent },
  { path: ':id/edit', component: SongNewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SongsRoutingModule { }
