import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SongsState } from '../songs/state/songs.state';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  isMenuOpen = false;
  title : string | undefined = '';
  song$ = this.store.select(SongsState.selectedSong);

  constructor(private router: Router, private store: Store) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.selectMenuTitle(event.urlAfterRedirects);
      }
    })
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  selectMenuTitle(url: string) {
    switch (url) {
      case '/songs':
        this.title = 'Canciones';
        break;
      case '/songs/new':
        this.title = 'Nueva canción';
        break;
      case '/songs/' + url.split('/').pop():
        this.song$.subscribe((song)=> this.title = song?.title)
        this.title = ''
        break;
      case '/artists':
        this.title = 'Artistas';
        break;
      case '/companies':
        this.title = 'Compañías discográficas';
        break;
      default:
        this.title = 'Music Library';
    }
  }

}
