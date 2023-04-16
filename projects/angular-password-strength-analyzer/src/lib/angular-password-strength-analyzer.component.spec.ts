import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularPasswordStrengthAnalyzerComponent } from './angular-password-strength-analyzer.component';

describe('AngularPasswordStrengthAnalyzerComponent', () => {
  let component: AngularPasswordStrengthAnalyzerComponent;
  let fixture: ComponentFixture<AngularPasswordStrengthAnalyzerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularPasswordStrengthAnalyzerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularPasswordStrengthAnalyzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
