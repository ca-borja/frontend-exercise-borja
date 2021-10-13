import { Component, OnInit } from '@angular/core';
import { HerokuProviderEmployee } from '../heroku-provider/heroku-provider-employee.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: HerokuProviderEmployee) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(data => {
      if (data && data.length) {
        this.employees = data;
      }
    })
  }
}
