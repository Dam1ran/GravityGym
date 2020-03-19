import { AbstractControl } from "@angular/forms";

export function RegisterFormValidator(control: AbstractControl) : {[key:string]:boolean} | null
{
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    const userEmail = control.get('userEmail');
    const confirmUserEmail = control.get('confirmUserEmail');

    let value:{[key:string]:boolean};    

    if(userEmail.pristine || confirmUserEmail.pristine){
        value = {'emailMissMatch': false};
    }
    else if(userEmail && confirmUserEmail && userEmail.value != confirmUserEmail.value){
        value = {'emailMissMatch': true};
    }else

    
    if(password.pristine || confirmPassword.pristine){
        value = {'missMatch': false};
    }
    else if(password && confirmPassword && password.value != confirmPassword.value){
        value = {'missMatch': true};
    }

    return value;

}