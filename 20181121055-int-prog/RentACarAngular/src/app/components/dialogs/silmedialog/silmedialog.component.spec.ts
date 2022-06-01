/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SilmedialogComponent } from './silmedialog.component';

describe('SilmedialogComponent', () => {
  let component: SilmedialogComponent;
  let fixture: ComponentFixture<SilmedialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SilmedialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SilmedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
