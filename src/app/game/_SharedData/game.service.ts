import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';

import { jsCardsData } from './jsCardsData'
import { Card } from './card.model';
import { Result } from './result.model';
import 'rxjs/add/operator/map';

@Injectable()
export class GameService {
  cardsData: string[];
  workArray: { fileName: string, id: number }[];
  cardDataBool: boolean[];
  positionsBool: boolean[];
  private resultsCollection: AngularFirestoreCollection<Result>



  constructor(
    private db: AngularFirestore
  ) {
    this.resultsCollection = db.collection('results')
    this.cardsData = jsCardsData;
  }


  // Level manager
  public getCards(level: number) {
    if (level > 3 || level < 0) level = 0;
    const quant = Math.pow((level + level + 4), 2);
    this.setArrayEmpty();
    return this.fillArray(quant)
  }

  // Create random names array
  private fillArray(quant: number) {
    const resultArray = [];
    for (let i = 0; i < quant / 2; i++) {
      const name = this.getCardName()
      for (let j = 0; j <= 1; j++) {
        this.workArray.push({ fileName: name, id: i })
      }
    }
    for (let i = 1; i <= quant; i++) {
      resultArray.push(this.workArray[this.getPosition(quant)])
    }
    return resultArray.map(rec => new Card(rec.fileName, rec.id))

  }
  // random name we didn`t use yet
  private getCardName(cardNumber?: number) {
    const namesMaxIndex = this.cardsData.length - 1
    if (!cardNumber) {
      cardNumber = this.getRandom(namesMaxIndex);
    } else {
      cardNumber++;
      if (cardNumber > namesMaxIndex) cardNumber = 0
    }
    if (this.cardDataBool[cardNumber]) {
      return this.getCardName(cardNumber)
    } else {
      this.cardDataBool[cardNumber] = true;
      return this.cardsData[cardNumber]
    }
  }
  // Random card position we didn`t use yet
  private getPosition(quant: number, position?: number) {
    if (!position) {
      position = this.getRandom(quant - 1)
    } else {
      position = position + 3;
      if (position >= quant) position = 0;
    }
    if (this.positionsBool[position]) {
      return this.getPosition(quant, position)
    } else {
      this.positionsBool[position] = true;
      return position
    }
  }
  private getRandom(max: number) {
    return Math.floor(Math.random() * max)
  }
  // Set all work array to empty
  private setArrayEmpty() {
    for (let i = 0; i < 63; i++) {
      this.workArray = [];
      this.cardDataBool = [];
      this.positionsBool = [];
    }
  }
  /*
  * Firebase
 */
  public getResults() {
    return this.resultsCollection.valueChanges().map(res => res.sort(this.sortByDate()))
  }
  public addResults(result: Result) {
    result.date = new Date()
    return this.resultsCollection.add(result)
  }
  /*
  * Filter
  */
  sortByDate() {
    return (a, b) => {
      const aDate = Date.parse(a.date)
      const bDate = Date.parse(b.date)
      if (aDate == bDate) return 0
      else if (aDate > bDate) return -1
      else if (aDate < bDate) return 1
    }
  }
}
