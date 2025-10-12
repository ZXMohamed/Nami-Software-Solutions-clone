//*gsap
import gsap from 'gsap';

export function tickerItemsMover(ticker, direction, delay) {
  
  const tickerWidth = ticker.current.offsetWidth;
  const tickerItems = ticker.current.children;
  const tickerMoves = [];

  const additionalArea = 100;
  const visibleArea = 1912;
  const tickerItemsDelay = delay;

  const startDirection = (direction == "ltr" ? "left" : "right");
  const startX = (direction == "ltr" ? 1 : -1) * tickerWidth;//*start position
  const endX = (direction == "ltr" ? -1 : 1) * ((visibleArea - tickerWidth) + additionalArea);//*calculate end position
  
  gsap.utils.toArray(tickerItems).forEach((item, index) => {

    const tickerItemMove = gsap.timeline();

    tickerItemMove.fromTo(item, {
        [startDirection]: "0",
        x: startX,
        visibility:"hidden"
      },
      {
        visibility:"visible",
        x: endX, 
        duration: 28,
        ease: "none",
        repeat: -1,//*infinity loop

        onStart: () => {

          const itemWidth = gsap.getProperty(item, "width");

          callNextItem(itemWidth, tickerWidth); //* call the next item to start moving
          
          function callNextItem(itemWidth, tickerWidth) {
            //*each (tickerItemsDelay) check 
            //*if current item has fully enter the ticker
            //*to call the next item to move
            setTimeout(() => { 

              if (Math.abs(gsap.getProperty(item, "x")) <= (tickerWidth - itemWidth)) {//*if current item has fully enter the ticker

                tickerMoves[index + 1]?.play();//*to call the next item to move

              }
              else {

                callNextItem(...arguments);//*each (tickerItemsDelay) re-check 

              }

            }, tickerItemsDelay);

          }

        }
        
      }
    );

    if (index != 0) tickerItemMove.pause();//*pause all items moves except the first item

    tickerMoves.push(tickerItemMove); //*set in moves array to call it 
    
    }
    
  );

  return tickerMoves;
}