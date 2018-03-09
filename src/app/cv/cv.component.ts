import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Jobs } from './shared/jobs-list'
import { Study } from './shared/study-list'

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {
  @ViewChild('Jobs') jobsEl: ElementRef
  @ViewChild('Education') educationEl: ElementRef
  showSidebar: boolean
  public jobs: any[];
  public study: any[];

  constructor() { }

  ngOnInit() {
    this.showSidebar = false;
    setTimeout(() => this.showSidebar = true, 4000)
    this.jobs = Jobs
    this.study = Study
  }

  onLinkClick() {
    window.open("https://www.linkedin.com/in/sikorasergii", "_blank");

  }
 

}
