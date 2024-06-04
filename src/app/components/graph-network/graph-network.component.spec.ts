import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphNetworkComponent } from './graph-network.component';

describe('GraphNetworkComponent', () => {
  let component: GraphNetworkComponent;
  let fixture: ComponentFixture<GraphNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraphNetworkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
