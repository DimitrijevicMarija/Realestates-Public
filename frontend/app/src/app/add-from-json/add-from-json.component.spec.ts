import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFromJSONComponent } from './add-from-json.component';

describe('AddFromJSONComponent', () => {
  let component: AddFromJSONComponent;
  let fixture: ComponentFixture<AddFromJSONComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFromJSONComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFromJSONComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
