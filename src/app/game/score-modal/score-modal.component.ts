import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-score-modal',
    templateUrl: './score-modal.component.html',
    styleUrls: ['./score-modal.component.css']
})
export class ScoreModalComponent implements OnInit {

    constructor(
        public scoreDialogRef: MatDialogRef<ScoreModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    ngOnInit() {
        this.scoreDialogRef.updatePosition({ 'top': '150px' })
        setTimeout(() => {
            this.scoreDialogRef.close()
        }, 5000)
    }

}
