class Observable{
  constructor(subscribe){
    this._subscribe = subscribe;
  }
  subscribe(observer){
    return this._subscribe(observer);    
  }
  
  static timeout(time){
    return new Observable(function subscribe(observer){
      const handle = setTimeout(function(){
        observer.next();
        observer.complete();
      },time);
      
      return {
        unsubscribe(){
          clearTimeout(handle);
        }
      };
    });
  }
  
  static fromEvent(dom,eventName){ 
    return new Observable(function subscribe(observer){
      
      const handler = (ev)=>{
      observer.next(ev)
       };
      
      dom.addEventListener(eventName,handler);

      return {
        unsubscribe(){
          dom.removeEventListener(eventName,handler)
        }
      }
    });
  }
}

const button = document.getElementById("button");
const clicks = Observable.fromEvent(button,"click");


  clicks.subscribe({
      next(v){
          console.log("next");
      },
      complete(){
          console.log("Done")
      }
  });
  



  
  