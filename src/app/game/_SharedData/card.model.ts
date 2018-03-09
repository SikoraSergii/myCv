
export class Card {
    id: number
    url: string;
    isSelected: boolean;
    isDone: boolean

    constructor(fileName: string, id: number) {
        this.id = id + 1;
        this.url = '../../../assets/' + fileName;
        this.isSelected = false;
        this.isDone = false
    }
}
