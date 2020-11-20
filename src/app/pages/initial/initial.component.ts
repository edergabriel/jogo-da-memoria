import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrls: ['./initial.component.scss']
})
export class InitialComponent implements OnInit {

  constructor() { }
  chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 
           'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 
           'U', 'V', 'W', 'Y', 'X', 'Z', 'Ç', 'Ü', 'É', 'Ê', 
           'À', 'Á', 'Í', 'Ô', 'Ó'];
  removeChars = []
  numberSelectChars = 0;
  openCard = false;
  validClick = 0; 
  positions;
  numberTouches = 0;
  record = 9999;
  finishGame = false;
  flgRecord = false;
  
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  checkValue(number) {
    for (var i = 0; i < this.removeChars.length; i++) {      
      if (this.removeChars[i] === number) {
          number = this.checkValue(this.getRandomInt(0, this.chars.length -1))
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
        this.numberSelectChars = this.checkValue(this.getRandomInt(0, this.chars.length -1));
      } else {
        typeChar = i - 1;
        this.removeChars.push(this.numberSelectChars)
      }
      selectedChar = this.chars[this.numberSelectChars] 
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
  
  newGame() {
    this.removeChars = []
    this.numberSelectChars = 0;
    this.openCard = false;
    this.validClick = 0; 
    this.positions = this.createPositions(30);
    this.positions = this.shuffleArray(this.positions);
    console.log(this.positions);
  }
  ngOnInit() {
    this.newGame()
  }
  
  handleClick(e) {

    console.log("12", this.validClick, e.currentTarget.classList.value.indexOf('finded') < 0, this.validClick < 2 && e.currentTarget.classList.value.indexOf('finded') < 0);
    if(this.validClick < 2 && e.currentTarget.classList.value.indexOf('finded') < 0) {
      this.numberTouches = this.numberTouches + 1;
      this.validClick = this.validClick + 1;
      e.currentTarget.classList.toggle('is-flipped');
      
      if(!this.openCard) {
        this.openCard = true;
      } else {
        let element = document.querySelectorAll('.card.is-flipped:not(.finded)');
        let nodeSelected: any = 0;

        setTimeout(function() {
          Array.prototype.forEach.call( element, function( node ) {
            console.log(node.dataset, nodeSelected, element);
            if(nodeSelected === 0) {
              nodeSelected = node
            } else {

              if(node.dataset.type !== nodeSelected.dataset.type) {
                node.classList.remove('is-flipped')
                nodeSelected.classList.remove('is-flipped')
              } else {
                node.classList.add('finded')
                nodeSelected.classList.add('finded')
                if(document.querySelectorAll('.card.finded').length >= document.querySelectorAll('.card').length) {
                  this.finishGame = true
                  this.flgRecord = true
                  console.log(this.numberTouches, this.record);
                  if(this.numberTouches < this.record) {
                    this.record = this.numberTouches;
                  }
                }
              }
              nodeSelected = 0
            }
          });
          this.openCard = false;
        }, 1000)
        this.validClick = 0;
      }
    }
  }
}
