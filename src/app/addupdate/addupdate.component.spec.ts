import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddupdateComponent } from './addupdate.component';

describe('AddupdateComponent', () => {
  let component: AddupdateComponent;
  let fixture: ComponentFixture<AddupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddupdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
