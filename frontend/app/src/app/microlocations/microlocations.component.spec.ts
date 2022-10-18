import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrolocationsComponent } from './microlocations.component';

describe('MicrolocationsComponent', () => {
  let component: MicrolocationsComponent;
  let fixture: ComponentFixture<MicrolocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicrolocationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrolocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
