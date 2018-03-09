import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { GameService } from '../_SharedData/game.service';
import { CardComponent } from '../card/card.component'
import { Card } from '../_SharedData/card.model';
import { ScoreModalComponent } from '../score-modal/score-modal.component';
import { FinalModalComponent } from '../final-modal/final-modal.component';
import { Router } from '@angular/router';

const pointsForPair = 10;
const timeLenght = [50, 120, 160]


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {
  time: number;
  min: number;
  sec: number;
  columns: number;
  level: number;
  score: number;
  timeBonuce: number;
  cards: Card[];
  notDoneCounter: number;
  cardSelected: number[];
  doneTimeout: any;
  closeTimeout: any;
  timer$: Observable<number>;
  timer: Subscription;
  uncklicked: boolean


  constructor(
    private gameServ: GameService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.startNew()
    this.timer$ = TimerObservable.create(0, 1000)
  }

  /*
  * Cards
 */
  private setCards() {
    this.cards = this.gameServ.getCards(this.level);
    this.notDoneCounter = this.cards.length / 2
  }
  onCardClick(i: number) {
    // Ignore done cards and if time finished
    if (this.cards[i].isDone || this.time === 0) return
    // Ignore double click
    if (this.cardSelected.length > 0 && this.cardSelected[0] == i) return
    // Run timer
    if (this.uncklicked) {
      this.runTimer()
      this.uncklicked = false
    }
    this.finishUnfinished()
    this.cards[i].isSelected = true;
    this.cardSelected.push(i)
    // If two selected
    if (this.cardSelected.length == 2) this.twoSelected(i)
  }
  twoSelected(i: number) {
    let selected = this.cards[this.cardSelected[0]]
    let newSelected = this.cards[i]
    if (newSelected.id == selected.id) {
      // We got the pair
      this.notDoneCounter--;
      this.increaseScore()
      if (this.notDoneCounter) this.cardsDoneTimeout()
      else this.nextLevel()
    } else {
      // Wrong cards
      this.closeCardsTimeout()
    }
  }
  increaseScore() {
    this.score += pointsForPair * (this.level + 1);
  }
  closeCardsTimeout() {
    this.closeTimeout = setTimeout(() => {
      this.closeCards()
    }, 1000);
  }
  cardsDoneTimeout() {
    this.doneTimeout = setTimeout(() => {
      this.doneCards()
    }, 1000);
  }
  closeCards() {
    this.cardSelected.forEach(i => this.cards[i].isSelected = false);
    this.cardSelected = [];
    this.closeTimeout = null
  }
  doneCards() {
    this.cardSelected.forEach(i => this.cards[i].isDone = true);
    this.cardSelected = []
    this.doneTimeout = null
  }
  finishUnfinished() {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeCards()
    } else if (this.doneTimeout) {
      clearTimeout(this.doneTimeout);
      this.doneCards()
    }
  }
  /*
  * Timer
 */
  setTime() {
    this.time = timeLenght[this.level];
    this.setMinSec();
  }
  setMinSec() {
    this.min = Math.trunc(this.time / 60)
    this.sec = this.time - this.min * 60
  }
  runTimer() {
    this.timer = this.timer$.subscribe(t => {
      this.time--;
      this.setMinSec()
      if (!this.time) this.timeFinished()
    })
  }
  stopTimer() {
    if (this.timer) this.timer.unsubscribe();
  }
  setTimerAlert() {
    return this.time >= 10 ? 'accent' : 'warn'
  }
  /*
  * Levels
 */
  startNew() {
    this.columns = 4;
    this.level = 0;
    this.score = 0
    this.cardSelected = []
    this.setLevel();
    this.doneTimeout = null;
    this.closeTimeout = null;
    this.uncklicked = true;
    this.stopTimer();
  }
  setLevel() {
    this.finishUnfinished();
    this.cardSelected = [];
    this.setCards();
    this.setTime();
  }
  timeFinished() {
    this.stopTimer();
    this.openFinalDialog(false)
  }
  nextLevel() {
    this.timeBonuce = this.time * (this.level + 1)
    this.stopTimer()
    this.openBonusDialog();
    if (this.level == 2) {
      // last level
      this.score += this.timeBonuce
      this.openFinalDialog(true)
    } else {
      this.level++;
      this.columns = this.columns + 2;
      this.setLevel();
      this.uncklicked = true;
    }

  }

  /*
  * Dialogs
 */
  openBonusDialog() {
    let dialogRef = this.dialog.open(ScoreModalComponent, {
      height: '300px',
      width: '350px',
      data: {
        level: this.level + 1,
        timeBonus: this.timeBonuce
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.score += this.timeBonuce;
      this.timeBonuce = 0;
    })
  }
  openFinalDialog(isWiner: boolean) {
    let dialogRef = this.dialog.open(FinalModalComponent, {
      height: '350px',
      width: '450px',
      data: {
        isWiner: isWiner,
        level: this.level + 1,
        timeBonus: this.timeBonuce,
        score: this.score
      }
    });
    dialogRef.afterClosed().subscribe((info?: any) => {
      if (info) {
        this.gameServ.addResults(info).then(res => {
          this.startNew();
          this.router.navigateByUrl('results')
        })
      } else {
        this.startNew();
      }
    })
  }
  ngOnDestroy() {
    if (this.timer) this.timer.unsubscribe()
  }

}
