import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryRootComponent } from './gallery-root.component';

describe('GalleryRootComponent', () => {
  let component: GalleryRootComponent;
  let fixture: ComponentFixture<GalleryRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
