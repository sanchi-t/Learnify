import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformComponent } from './inform.component';

describe('InformComponent', () => {
  let component: InformComponent;
  let fixture: ComponentFixture<InformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InformComponent]
    });
    fixture = TestBed.createComponent(InformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
