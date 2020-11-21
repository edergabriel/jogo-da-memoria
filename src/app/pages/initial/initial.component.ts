import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators, FormArray, FormControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.scss']
})
export class InitialComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  lettersAll = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 
           'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 
           'U', 'V', 'W', 'X', 'Y', 'Z', 'Ç', 'Ü', 'É', 'Ê', 
           'À', 'Á', 'Í', 'Ô', 'Ó', 'я', 'Ø', 'Ð', 'Þ', 'ک',
           'Ћ', 'ω', 'μ', '名', '当', '楽', '平', 'æ', 'γ', 'φ', 'Δ'];

  lettersAZ = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 
                'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 
                'U', 'V', 'W', 'X', 'Y', 'Z'];

  numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 
            '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', 
            '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', 
            '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', 
            '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', 
            '51', '0'];

  cardsSelected = [];
  form: FormGroup = new FormGroup({
    level: new FormControl('10'),
    cards: new FormControl('lettersAZ')
  });
  removeChars = []
  numberSelectChars = 0;
  openCard = false;
  validClick = 0; 
  positions;
  numberTouches = 0;
  record = 9999;
  finishGame = false;
  flgRecord = false;
  flgTouches = false;
  flgForm = true;
  flgCards = false;
  
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  checkValue(number) {
    for (var i = 0; i < this.removeChars.length; i++) {      
      if (this.removeChars[i] === number) {
          number = this.checkValue(this.getRandomInt(0, this.cardsSelected.length -1))
          break;      
      }
    }
    return number
  }
  
  createPositions(number) {
    let positions = []
  
    for (var i = 0; i < number; i++) {
      let typeChar = i;
      let selectedChar;
      if(i%2 === 0) {
        this.numberSelectChars = this.checkValue(this.getRandomInt(0, this.cardsSelected.length -1));
      } else {
        typeChar = i - 1;
        this.removeChars.push(this.numberSelectChars)
      }
      selectedChar = this.cardsSelected[this.numberSelectChars] 
      positions.push({ id: i, type: typeChar, title: selectedChar});
    }
    return positions;
  }
  
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
  }
  
  newGame(numberLevel) {
    this.removeChars = []
    this.numberSelectChars = 0;
    this.openCard = false;
    this.validClick = 0; 
    this.numberTouches = 0;
    if(this.form.value.cards == "lettersAll") {
      this.cardsSelected = this.lettersAll;
    } else if(this.form.value.cards == "lettersAZ") {
      this.cardsSelected = this.lettersAZ;
    } else if(this.form.value.cards == "numbers") {
      this.cardsSelected = this.numbers;
    }
    this.positions = this.createPositions(numberLevel);
    this.positions = this.shuffleArray(this.positions);
    this.flgCards = true
  }
  ngOnInit() {

  }

  validCards() {
    let element = document.querySelectorAll('.card.is-flipped:not(.finded)');
    let nodeSelected: any = 0;
    element.forEach((el: any, index) => {
      if(nodeSelected === 0) {
        nodeSelected = el
      } else {
        if(el.dataset.type !== nodeSelected.dataset.type) {
          el.classList.remove('is-flipped')
          nodeSelected.classList.remove('is-flipped')
        } else {
          el.classList.add('finded')
          nodeSelected.classList.add('finded')
          if(document.querySelectorAll('.card.finded').length >= document.querySelectorAll('.card').length) {
            this.finishGame = true;
            this.flgRecord = true;
            if(this.numberTouches < this.record) {
              this.record = this.numberTouches;
            }
          }
        }
        nodeSelected = 0;
        this.validClick = 0;
      }
    });
    this.openCard = false;
  }
  
  handleClick(e) {
    if(this.validClick < 2 && e.currentTarget.classList.value.indexOf('finded') < 0) {
      this.numberTouches = this.numberTouches + 1;
      this.validClick = this.validClick + 1;
      e.currentTarget.classList.toggle('is-flipped');
      
      if(!this.openCard) {
        this.openCard = true;
      } else {
        setTimeout(() => { this.validCards() }, 1000)
      }
    }
  }

  onSubmit() {
    if(this.form.valid) {
      this.newGame(this.form.value.level)
      this.flgTouches = true;
      this.flgForm = false;
    } else {

    }
  }  

  backToMenu() {
    this.finishGame = false;
    this.flgForm = true;
    this.flgCards = false;
    this.flgTouches = false;
    this.flgRecord = false;
  }

  playAgain() {
    this.finishGame = false;
    this.newGame(this.form.value.level)
  }
}
