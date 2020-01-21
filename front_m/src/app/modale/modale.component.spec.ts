import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModaleComponent } from './modale.component';

describe('ModaleComponent', () => {
  let component: ModaleComponent;
  let fixture: ComponentFixture<ModaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaleComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
