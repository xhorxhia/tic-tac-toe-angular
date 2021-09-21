import { Component,OnInit } from '@angular/core';
import { logs } from '../logs';
import { TouchSequence } from 'selenium-webdriver';



@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers:[logs]
  
})
export class BoardComponent implements OnInit {

    counter=0;
    show:boolean=false
    squareLog:string[]=[]
    position:number;
  
    squares: string[]=[];
    pcMove:number[]=[0,1, 2, 3, 4, 5, 6, 7, 8];
    turn : string= 'X';
    playerTurn:string;
    gameover= false;
    winner= null;
    fitues:string;
    div1:boolean=false;
    div2:boolean=false;
    div3:boolean=true;
    div4:boolean=true;
    player =[];
    prevmove:string
  
    
    
    
      constructor(public logsat:logs){}


      onSelect(pos): void {
        this.show=true
        this.squareLog = Array(9).fill(null);
        for(let i=0;i<=pos;i++){
          this.squareLog[this.logsat.logs[i].position]=this.logsat.logs[i].turn
           
        }
      }
   




//ketu krijoj logs te ri
     krijoLog(){
       this.logsat.addLogs(this.position,this.playerTurn,this.prevmove) 
    }


    

   
       
//shtoj nje lojtare
    addPlayer(newPlayer: string) {
      if (newPlayer) {
        this.player.push(newPlayer);
        this.counter++
        if(this.counter==1){
          this.div1=false;;
        }
        
         else if(this.counter==2){
          this.div2=false;
        }
        else{
          this.newGame()
        }
       }
    }




//ketu bej hide element per 2 player
    div1Function(){
      this.div4=false;
      if(this.div1===false){
        this.div1=true;
      }
      else{
        this.div1=false;
      }    
    }





//ketu bej hide elemnt per 1 player
    div2Function(){
      this.div3=false
      if(this.div2===false){
        this.div2=true;
      }
      else{
        this.div2=false;
      } 
  }


    
    ngOnInit(){
      this.newGame()
    }




//ketu loja rifillon  
    newGame() {
      this.squares = Array(9).fill(null);
      this.pcMove=[0,1, 2, 3, 4, 5, 6, 7, 8];
      this.winner = null;
      this.fitues=null;
      this.gameover=false;
      this.show=false
    
      this.logsat.removeLogs()
      this.turn='X'
      
    
      this.counter=0;
    }
    
//funksioni per ku per cdo klikim plotesohet kutia me X ose O
    clickHandler(id:number){
      this.position=id;
     
      if(this.player.length===1){
        if(!this.gameover){
          if(this.squares[id]===null){
            this.squares[id]=this.turn
            this.changeturn();
            this.krijoLog() 
            this.checkwinn();


            const index = this.pcMove.indexOf(id);
            if (index > -1) {
              this.pcMove.splice(index, 1);
            }
           
            const pc = Math.floor(Math.random() * this.pcMove.length);
            console.log(pc);
           
            if(this.squares[this.pcMove[pc]]===null){
              this.position=this.pcMove[pc]
              if(this.gameover){
                this.squares[this.pcMove[pc]]=null;
              }
              else{
                this.squares[this.pcMove[pc]]=this.turn;
              }
              
              this.changeturn()
              this.krijoLog()
              this.checkwinn();
              this.shpallFitues()
              
              const index = this.pcMove.indexOf(this.pcMove[pc]);
              if (index > -1) {
                this.pcMove.splice(index, 1);
              }
              
              console.log(this.pcMove)
            }
          }
        }
      }

    else if(this.player.length===2){
      if(!this.gameover){
        if(this.squares[id]===null){
          this.squares[id]=this.turn
          this.changeturn();
          this.krijoLog()
          this.checkwinn();
          this.shpallFitues()
          
        }
      }

    }
     
}


    

//funksioni i cli ndryshon tipin e stringut gjithashtu dhe lojtarin
    changeturn(){
      
      if(this.player.length===1){
        if(this.turn==='X'){
          this.playerTurn=this.player[0]
          this.prevmove=this.turn
          return this.turn='O';
        }

        else{
          this.playerTurn='PC'
          this.prevmove=this.turn
          this.turn='X'
        }

      }

      else if(this.player.length===2){
        if(this.turn==='X'){
        
          this.playerTurn=this.player[0]
          this.prevmove=this.turn
          return this.turn='O';
        }

        else{
          this.playerTurn=this.player[1]
          this.prevmove=this.turn
          this.turn='X'
        }
      }
      
      
     
    }

//funksioni i cili permban algoritmin e fituesit
    checkwinn(){
      
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
          this.squares[a] &&
          this.squares[a] === this.squares[b] &&
          this.squares[a] === this.squares[c]
        ) {
           this.winner=this.squares[a];
            this.gameover=true;
            return;
        }
      }
      
      let cell=0;
      this.squares.forEach((e) =>cell +=(e!==null?1:0)
      )

      if(cell===9){
        this.gameover=true;
        this.winner='tie'
      }
    }
  


//ketu funksioni inicializon fituesin e lojes    
    shpallFitues(){
      if(this.winner!=='tie'){
        if(this.player.length===1){
          if(this.winner==='X'){
            this.fitues=this.player[0]
          }
          else if(this.winner==='O'){
            this.fitues='Pc';
          }
        }
        else if(this.player.length===2){
          if(this.winner==='X'){
            this.fitues=this.player[0]
          }
          else if(this.winner==='O'){
            this.fitues=this.player[1];
          }
        }
      }
      else{
        this.fitues='Barazim'
      }
      console.log(this.fitues);
    }
  
}
