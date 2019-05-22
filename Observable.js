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

map(projection){
  const self = this;
  return new Observable(function subsscribe(observer){
    const subscription = self.subscribe({
      next(v){
      
          observer.next(projection(v));
      
      },
      error(err){
        observer.error(err);
      },
      complete(){
        observer.complete();
      }
    });
    
    return subscription;
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

clicks.map(ev => ev.offsetX).
subscribe({
next(ev){
  console.log(ev);
},
complete(){
  console.log("Done")
}
});
  



  
  