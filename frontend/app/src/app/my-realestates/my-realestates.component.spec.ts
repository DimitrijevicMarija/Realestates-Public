import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRealestatesComponent } from './my-realestates.component';

describe('MyRealestatesComponent', () => {
  let component: MyRealestatesComponent;
  let fixture: ComponentFixture<MyRealestatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyRealestatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRealestatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
