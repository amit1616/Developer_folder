import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettlementLetterComponent } from './settlement-letter.component';

describe('SettlementLetterComponent', () => {
  let component: SettlementLetterComponent;
  let fixture: ComponentFixture<SettlementLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettlementLetterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettlementLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
