import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-final-modal',
  templateUrl: './final-modal.component.html',
  styleUrls: ['./final-modal.component.css']
})
export class FinalModalComponent implements OnInit {
  publishing: boolean
  publishForm: FormGroup
  private forbidden: string[];

  constructor(
    private finalDialogRef: MatDialogRef<FinalModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.finalDialogRef.updatePosition({ top: '150px' })
    this.publishing = false;
    this.forbidden = ['hitler', 'stalin', 'putin', 'путин']

    this.publishForm = new FormGroup({
      'nickname': new FormControl(null, [Validators.required, this.forbiddenNames()]),
      'comment': new FormControl()
    })
  }
  forbiddenNames(): ValidatorFn {
    return (control: AbstractControl): { [s: string]: boolean } => {
      if (control.value && this.forbidden.some((name) => name === control.value.toLowerCase())) {
        console.log(control.value.toLowerCase(), this.forbidden.some((name) => name === control.value.toLowerCase()))
        return { 'nameIsForbidden': true }
      } else {
        return null
      }
    }
  }
  getError() {
    const error = this.publishForm.get('nickname').errors
    if (error) {
      if (error.nameIsForbidden) return 'Choose other nickname'
      else if (error.required) return 'This field is required'
    }

  }
  startNew() {
    this.finalDialogRef.close()
  }
  startPublishing() {
    this.publishing = true;
    this.finalDialogRef.updateSize('350px', '400px')
  }
  finishPublishing() {
    let data = this.publishForm.value;
    data.level = this.data.level;
    data.score = this.data.score;

    this.finalDialogRef.close(data)
  }

}
