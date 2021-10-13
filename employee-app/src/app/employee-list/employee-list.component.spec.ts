import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HerokuProviderEmployee } from '../heroku-provider/heroku-provider-employee.service';

import { EmployeeListComponent } from './employee-list.component';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let employeeService: HerokuProviderEmployee;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeListComponent ],
      providers: [
        {
          provide: HerokuProviderEmployee,
          useClass: mockHerokuProviderEmployee
        }
      ]
    })
    .compileComponents();
    employeeService = TestBed.get(HerokuProviderEmployee);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(EmployeeListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    
    it('should initliazie', () => {
      const getEmployeesSpy = spyOn(employeeService, 'getEmployees').and.callThrough();

      component.ngOnInit();

      expect(getEmployeesSpy).toHaveBeenCalled();
    });
  })
});

class mockHerokuProviderEmployee {
  public getEmployees() {
    return of(null);
  }
}