import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-skill-card',
  templateUrl: './skill-card.component.html',
  styleUrls: ['./skill-card.component.css']
})
export class SkillCardComponent implements OnInit {
  @Input() imgSource: string;
  @Input() skill: string
  @Input() level: number
  @Input() levelInfo: string
  constructor() { }

  ngOnInit() {
  }

}
