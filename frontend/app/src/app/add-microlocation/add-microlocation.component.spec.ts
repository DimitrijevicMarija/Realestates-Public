import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMicrolocationComponent } from './add-microlocation.component';

describe('AddMicrolocationComponent', () => {
  let component: AddMicrolocationComponent;
  let fixture: ComponentFixture<AddMicrolocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMicrolocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMicrolocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
