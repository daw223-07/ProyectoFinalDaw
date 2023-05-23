import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridHorizontalComponent } from './grid-horizontal.component';

describe('GridHorizontalComponent', () => {
  let component: GridHorizontalComponent;
  let fixture: ComponentFixture<GridHorizontalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridHorizontalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
