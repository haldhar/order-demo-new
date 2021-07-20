import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortOverviewComponent } from './sort-overview.component';

describe('SortOverviewComponent', () => {
  let component: SortOverviewComponent;
  let fixture: ComponentFixture<SortOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
