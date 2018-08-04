import { FormGroup} from '@angular/forms';
import { AppFormGroup } from '../../shared/common/app.form';

export class ContactForm extends AppFormGroup {
    static init() {
        return this.getFormGroup();
    }
    static edit(group: FormGroup) {

        group.addControl('profile_name', this.getController(null, this.TYPE_DATA, null, 50));
        group.addControl('profile_mobile', this.getController(null, this.TYPE_NUMBER, null, 10));
        group.addControl('profile_email', this.getController(null, this.TYPE_EMAIL, null, 50));
    
    }
}