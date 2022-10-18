import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRealestateComponent } from './edit-realestate.component';

describe('EditRealestateComponent', () => {
  let component: EditRealestateComponent;
  let fixture: ComponentFixture<EditRealestateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRealestateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRealestateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
