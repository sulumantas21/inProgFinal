/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AracislemlerigenelComponent } from './aracislemlerigenel.component';

describe('AracislemlerigenelComponent', () => {
  let component: AracislemlerigenelComponent;
  let fixture: ComponentFixture<AracislemlerigenelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AracislemlerigenelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AracislemlerigenelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
