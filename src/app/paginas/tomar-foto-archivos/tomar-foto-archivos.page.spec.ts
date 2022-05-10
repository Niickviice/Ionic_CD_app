import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TomarFotoArchivosPage } from './tomar-foto-archivos.page';

describe('TomarFotoArchivosPage', () => {
  let component: TomarFotoArchivosPage;
  let fixture: ComponentFixture<TomarFotoArchivosPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TomarFotoArchivosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TomarFotoArchivosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
