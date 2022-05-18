import {ErrorStateMatcher} from "@angular/material/core";
import {FormControl, FormGroupDirective, NgForm} from "@angular/forms";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control?.invalid && control?.parent?.dirty);
    const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty);
    // @ts-ignore
    return control.parent.errors && control.parent.errors  && control.touched && ( invalidCtrl || invalidParent );
  }
}
