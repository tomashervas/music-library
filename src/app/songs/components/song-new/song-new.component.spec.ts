import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongNewComponent } from './song-new.component';

describe('SongNewComponent', () => {
  let component: SongNewComponent;
  let fixture: ComponentFixture<SongNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SongNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SongNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
