export class EmployeeModel{
    empid:number;
    name:string;
    city:string;
    state:string;
    emailId:string;
    contactNo:string;
    Address:string;
    pincode:string;

    constructor() {
      this.Address='';
      this.name='';
      this.empid=1;
      this.city='';
      this.state='';
      this.emailId='';
      this.contactNo='';
      this.pincode='';

        
    }

}