import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridVerticalComponent } from './grid-vertical.component';

describe('GridVerticalComponent', () => {
  let component: GridVerticalComponent;
  let fixture: ComponentFixture<GridVerticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridVerticalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
