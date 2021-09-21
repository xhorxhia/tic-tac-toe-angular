export class logs{
    public logs=[];
    
    
    

    public constructor(){
      
       
      this.logs=[];
    }
    
     public addLogs(position:number,player:string ,turn:string):void{ 
       this.logs.push({position:position,player:player,turn:turn})

    }
    public removeLogs():void{
      this.logs=[]
    }
    

      

}