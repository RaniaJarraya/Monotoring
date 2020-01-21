import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OpenLayerComponent } from './open-layer.component';

describe('OpenLayerComponent', () => {
  let component: OpenLayerComponent;
  let fixture: ComponentFixture<OpenLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenLayerComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OpenLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
