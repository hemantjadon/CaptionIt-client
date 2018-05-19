import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraRootComponent } from './camera-root.component';

describe('CameraRootComponent', () => {
  let component: CameraRootComponent;
  let fixture: ComponentFixture<CameraRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CameraRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
