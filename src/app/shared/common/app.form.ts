
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
export class AppFormGroup {
    static TYPE_ALL: string = 'ALL';
    static TYPE_DATA: string = 'DATA';
    static TYPE_DECIMAL: string = 'DECIMAL';
    static TYPE_NUMBER: string = 'NUMBER';
    static TYPE_DATE: string = 'DATE';
    static TYPE_EMAIL: string = 'EMAIL';
    static EMAIL_PATTERN:any = '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}';
    static TYPE_PASSWORD: any = ".*\\S.*[a-zA-z0-9 ]";
    static ALL_PATTERN:string = '(.*?)';
    static DATA_PATTERN:string = '[\\w\\d\\s.,&@:;!#-=]*';
    static DECIMAL_PATTERN: string = '(\\d+(\\.\\d{1,2})?)';
    static NUMBER_PATTERN: string = '[0-9]*';
    static PHONE_PATTERN: string = '^[6-9][0-9]{9}$';
    static AADHAR_PATTERN: string = '^[0-9]{12}$';
    static ZIPCODE_PATTERN: string = '^[5][0-9]{5}$';
    //static DATE_PATTERN: string = '(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(T?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))';
    static DATE_PATTERN: string = '[\\w\\d\\s.,&@:;!#-=]*';
    static APLPHA_NUMERIC:string = '^[a-zA-Z0-9_]*$';
    static ALPHABETICAL_PATTERN:string = '^[a-zA-Z]*$';
    
    static getFormGroup() {
        return new FormBuilder().group({});
    }

    static getController(require: boolean, type: String, minLength: number, maxLength: number) {
        let compose: any = [];
        if(require) {
            compose.push(Validators.required)
        } 
        if(type) {
            switch(type) {
                case AppFormGroup.TYPE_ALL :  compose.push(Validators.pattern(AppFormGroup.ALL_PATTERN)); break;
                case AppFormGroup.TYPE_DATA :  compose.push(Validators.pattern(AppFormGroup.DATA_PATTERN)); break;
                case AppFormGroup.TYPE_DECIMAL :  compose.push(Validators.pattern(AppFormGroup.DECIMAL_PATTERN)); break;
                case AppFormGroup.TYPE_NUMBER :  compose.push(Validators.pattern(AppFormGroup.NUMBER_PATTERN)); break;
                case AppFormGroup.TYPE_DATE :  compose.push(Validators.pattern(AppFormGroup.DATE_PATTERN)); break;
                case AppFormGroup.TYPE_EMAIL :  compose.push(Validators.pattern(AppFormGroup.EMAIL_PATTERN)); break;
                case AppFormGroup.TYPE_EMAIL :  compose.push(Validators.pattern(AppFormGroup.APLPHA_NUMERIC)); break;
                case AppFormGroup.PHONE_PATTERN :  compose.push(Validators.pattern(AppFormGroup.PHONE_PATTERN)); break;
                case AppFormGroup.AADHAR_PATTERN :  compose.push(Validators.pattern(AppFormGroup.AADHAR_PATTERN)); break;
                case AppFormGroup.ZIPCODE_PATTERN :  compose.push(Validators.pattern(AppFormGroup.ZIPCODE_PATTERN)); break;
                case AppFormGroup.ALPHABETICAL_PATTERN :  compose.push(Validators.pattern(AppFormGroup.ALPHABETICAL_PATTERN)); break;
                default: compose.push(Validators.pattern(AppFormGroup.ALL_PATTERN)); break;
            }
        }
        if(minLength) {
             compose.push(Validators.minLength(minLength));
        }
        if(maxLength) {
             compose.push(Validators.maxLength(maxLength));
        }
        return new FormControl('',Validators.compose(compose));
    }
}