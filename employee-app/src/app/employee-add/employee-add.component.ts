import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { HerokuProviderEmployee } from '../heroku-provider/heroku-provider-employee.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent implements OnInit {
  modalRef?: BsModalRef;
  model: any;
  addEmployeeForm: any;
  addEmployeeMessage = '';

  constructor(private formBuilder: FormBuilder,
    private employeeService: HerokuProviderEmployee,
    private modalService: BsModalService) {
    this.setInitialFormModel();
  }

  private setInitialFormModel() {
    this.model = {
      id: [uuidv4(), [Validators.required]],
      firstName: ['', [Validators.required, this.whitespaceValidator]],
      lastName: ['', [Validators.required, this.whitespaceValidator]],
      email: ['', [Validators.required, Validators.email]]
    };
    this.addEmployeeForm = this.formBuilder.group(this.model);
  }

  public whitespaceValidator(control: FormControl) {
    return (control.value || '').trim() ? null : { 'whitespace': true };
  }

  ngOnInit(): void {
    this.modalService.onHidden.subscribe((reason: string | any) => {
      this.addEmployeeForm.reset();
      this.setInitialFormModel();
    });
  }

  onSubmit(template: TemplateRef<any>): void {
    if (this.addEmployeeForm.valid) {
      this.employeeService.addEmployee(this.addEmployeeForm.value).subscribe(response => {
        if (response?.msg === 'Employee added successfully.') {
          this.addEmployeeMessage = response?.msg;
          this.modalRef = this.modalService.show(template);
        }
      });
    }
  }
}
