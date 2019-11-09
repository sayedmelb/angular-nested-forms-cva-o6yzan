import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor,FormControl, NG_VALUE_ACCESSOR,NG_VALIDATORS, FormGroup, Validator,Validators, AbstractControl, ValidationErrors } from "@angular/forms";
@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css'],
  providers: [
       {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => JobDetailComponent),
      multi: true
    },
     {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => JobDetailComponent),
      multi: true
    }
  ]
})
export class JobDetailComponent implements OnInit, ControlValueAccessor, Validator {

public jobDetailForm: FormGroup = new FormGroup(
  {
occupation: new FormControl("", [Validators.required]),
jobType: new FormControl("",[Validators.required])
});
  constructor() { }

  ngOnInit() {
  }
 get occupation() { return this.jobDetailForm.get('occupation'); } 

public onTouched: () => void = () => {};

  writeValue(val: any): void {
    val && this.jobDetailForm.setValue(val, { emitEvent: false });
  }
  registerOnChange(fn: any): void {
    console.log("on change");
    this.jobDetailForm.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any): void {
    console.log("on blur");
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.jobDetailForm.disable() : this.jobDetailForm.enable();
  }

  validate(c: AbstractControl): ValidationErrors | null{
    console.log("Basic Info validation", c);
    return this.jobDetailForm.valid ? null : { invalidForm: {valid: false, message: "jobDetailForm fields are invalid"}};
  }
}