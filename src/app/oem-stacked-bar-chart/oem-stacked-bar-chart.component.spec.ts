import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OemStackedBarChartComponent } from './oem-stacked-bar-chart.component';

describe('OemStackedBarChartComponent', () => {
  let component: OemStackedBarChartComponent;
  let fixture: ComponentFixture<OemStackedBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OemStackedBarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OemStackedBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
