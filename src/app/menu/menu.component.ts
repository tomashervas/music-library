import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SongsState } from '../songs/state/songs.state';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  isMenuOpen = false;
  title : string | undefined = '';
  song$ = this.store.select(SongsState.selectedSong);

  constructor(private router: Router, private store: Store, private translate: TranslateService) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.selectMenuTitle(event.urlAfterRedirects);
      }
    })
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.selectMenuTitle(this.router.url);
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  changeLanguage(language: string) {
    this.translate.use(language);
  }

  selectMenuTitle(url: string) {
    switch (url) {
      case '/songs':
        this.translate.get('TITLE.SONGS').subscribe((title) => this.title = title);
        break;
      case '/songs/new':
        this.translate.get('TITLE.NEW_SONG').subscribe((title) => this.title = title);
        break;
      case '/songs/' + url.split('/').pop():
        this.song$.subscribe((song) => this.title = song?.title);
        this.title = '';
        break;
      case '/artists':
        this.translate.get('TITLE.ARTISTS').subscribe((title) => this.title = title);
        break;
      case '/companies':
        this.translate.get('TITLE.COMPANIES').subscribe((title) => this.title = title);
        break;
      default:
        this.translate.get('TITLE.SONGS').subscribe((title) => this.title = title);
    }
  }

}
