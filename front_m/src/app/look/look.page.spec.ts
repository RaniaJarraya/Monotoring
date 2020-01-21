import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LookPage } from './look.page';

describe('LookPage', () => {
  let component: LookPage;
  let fixture: ComponentFixture<LookPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
