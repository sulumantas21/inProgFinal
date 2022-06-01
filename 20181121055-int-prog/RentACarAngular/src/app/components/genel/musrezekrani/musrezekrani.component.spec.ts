/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MusrezekraniComponent } from './musrezekrani.component';

describe('MusrezekraniComponent', () => {
  let component: MusrezekraniComponent;
  let fixture: ComponentFixture<MusrezekraniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusrezekraniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusrezekraniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
