import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OemMatTableComponent } from './oem-mat-table.component';

describe('OemMatTableComponent', () => {
  let component: OemMatTableComponent;
  let fixture: ComponentFixture<OemMatTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OemMatTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OemMatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
