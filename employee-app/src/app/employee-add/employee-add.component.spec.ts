import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BsModalService } from 'ngx-bootstrap/modal';
import { of } from 'rxjs';
import { HerokuProviderEmployee } from '../heroku-provider/heroku-provider-employee.service';

import { EmployeeAddComponent } from './employee-add.component';

describe('EmployeeAddComponent', () => {
  let component: EmployeeAddComponent;
  let fixture: ComponentFixture<EmployeeAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        BrowserModule,
        ReactiveFormsModule
      ],
      declarations: [ EmployeeAddComponent ],
      providers: [
        {
          provide: FormBuilder
        },
        {
          provide: HerokuProviderEmployee,
          useClass: mockHerokuProviderEmployee
        },
        {
          provide: BsModalService
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class mockHerokuProviderEmployee {
  public getEmployees() {
    return of(null);
  }
}