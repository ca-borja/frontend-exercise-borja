import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Employee } from "../models/employee.model";

@Injectable({
  providedIn: 'root',
})
export class HerokuProviderEmployee {
  constructor(private http: HttpClient) { }

  public getEmployees() {
    return this.http.get<any>("https://tworks-exercise-api.herokuapp.com/employee/list");
  }

  public addEmployee(employee: Employee) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };
    
    return this.http.post<any>("https://tworks-exercise-api.herokuapp.com/employee/add", employee, httpOptions);
  }
}