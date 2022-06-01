/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FiyatsorgulaComponent } from './fiyatsorgula.component';

describe('FiyatsorgulaComponent', () => {
  let component: FiyatsorgulaComponent;
  let fixture: ComponentFixture<FiyatsorgulaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiyatsorgulaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiyatsorgulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
