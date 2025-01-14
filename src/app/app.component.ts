import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeeModel } from './model/Employee';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular_18_crud';
  employeeForm?: FormGroup = new FormGroup({});
  employeeobj: EmployeeModel = new EmployeeModel();
  employeeList: EmployeeModel[] = [];

  constructor() {
    debugger;
    this.createForm();

    // ✅ Ensure `localStorage` is accessed only in a browser environment
    if (typeof window !== 'undefined' && localStorage) {
      const oldData = localStorage.getItem("EmpData");
      if (oldData !== null) {
        const ParseData = JSON.parse(oldData);
        this.employeeList = ParseData;
      }
    }
  }

  createForm() {
    this.employeeForm = new FormGroup({
      empid: new FormControl(this.employeeobj.empid),
      name: new FormControl(this.employeeobj.name),
      address: new FormControl(this.employeeobj.Address),
      emailId: new FormControl(this.employeeobj.emailId),
      contactNo: new FormControl(this.employeeobj.contactNo),
      city: new FormControl(this.employeeobj.city),
      state: new FormControl(this.employeeobj.state),
      pincode: new FormControl(this.employeeobj.pincode),
    });
  }
  OnEdit(item:EmployeeModel){
this.employeeobj=item;
this.createForm()
  }
  onUpdate(){
    debugger;
    const record = this.employeeList.find(m=>m.empid == this.employeeForm?.controls['empid'].value);
    if (record != undefined) {
      record.name = this.employeeForm?.controls['name'].value;
      // record.Address = this.employeeForm?.controls['Address'].value;
     
      record.contactNo = this.employeeForm?.controls['contactNo'].value;
      record.emailId = this.employeeForm?.controls['emailId'].value;
    }
      localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
      this.employeeobj =new EmployeeModel();
      this.createForm();
  }
onDelete(id:number){
 const isDelete = confirm("Are u sure want to delete?");
 if (isDelete) {
  const index =this.employeeList.findIndex(m=>m.empid==id);
  this.employeeList.splice(index,1);
 }
}
  onSave() {
    debugger;
    
    // ✅ Ensure `localStorage` is accessed only in a browser environment
    if (typeof window !== 'undefined' && localStorage) {
      const oldData = localStorage.getItem("EmpData");
      if (oldData !== null) {
        const ParseData = JSON.parse(oldData);
        this.employeeForm?.controls['empid'].setValue(ParseData.length + 1);
        this.employeeList.unshift(this.employeeForm?.value);
      } else {
        this.employeeList.unshift(this.employeeForm?.value);
      }
      
      // ✅ Save updated employee list to localStorage
      localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
    }
  }
}
