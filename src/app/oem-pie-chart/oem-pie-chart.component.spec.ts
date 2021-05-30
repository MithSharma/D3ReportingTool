import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OemPieChartComponent } from './oem-pie-chart.component';

describe('OemPieChartComponent', () => {
  let component: OemPieChartComponent;
  let fixture: ComponentFixture<OemPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OemPieChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OemPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
