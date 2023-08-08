import { FormGroup } from '@angular/forms';

export const makeFormDirty = (formGroup: FormGroup) => {
  for (const i in formGroup.controls) {
    if (formGroup.controls.hasOwnProperty(i)) {
      formGroup.controls[i].markAsTouched();
      formGroup.controls[i].updateValueAndValidity();
    }
  }
};
