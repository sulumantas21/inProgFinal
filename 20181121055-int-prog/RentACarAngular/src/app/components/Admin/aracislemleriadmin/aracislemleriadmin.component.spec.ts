/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AracislemleriadminComponent } from './aracislemleriadmin.component';

describe('AracislemleriadminComponent', () => {
  let component: AracislemleriadminComponent;
  let fixture: ComponentFixture<AracislemleriadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AracislemleriadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AracislemleriadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
