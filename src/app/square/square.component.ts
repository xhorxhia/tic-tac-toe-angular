import { Component,  Output,Input, HostListener,EventEmitter } from '@angular/core';

@Component({
  selector: 'square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})

export class SquareComponent{
  @Input() value:string;
  
  
  @Output ('playerClick') click=new EventEmitter<string>();
  @HostListener('click')
  clickHandler(){
    this.click.emit('');
  }
}
