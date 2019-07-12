
import { Medicine } from "./Medicine.interface";

export interface ElderData{
    $key : string;
    Name : string;
    Age : number;
    Address : string;
    PhoneNumber : string;
    Religion : string;

    Zahymar:string;

    image : string;
    
    email : string;
    Password : string;
    
    DependentEmail : string;

    dependent_phoneNo : string;

    DependentNumber : number;
    
    medicine : Medicine[];
    med : Medicine
}