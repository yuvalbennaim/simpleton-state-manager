import React, { useEffect, useState, useRef } from 'react';
import useStateStore from './hooks/useStateStore';
import './App.css';
import AllBoxesView from "./components/AllBoxesView";

function App() {
  const store = useStateStore();
	const [user, setUser] = useState();
  const intervaldRef = useRef(false);

  const colors = ["red", "orange", "green", "blue", "pink"];
  store.setModel("COLORS", colors); 
  const boxes = [];

  for(let i = 0; i < 30; i++) {
    const bx = {id: `BOX_${i}`, color: "#888"};
    boxes.push(bx);
    store.setModel(`BOX_${i}`, bx);
  }

  store.setModel("BOXES", boxes);  

  // const intervalRunner = (e) => {  //emulate a constant WebSocket push of updates
  //   const randBox = parseInt(Math.random() * 2);
  //   const bx = boxes[randBox];
  //   const randColor = parseInt(Math.random() * colors.length);
  //   const clr = colors[randColor];
  //   bx.color = clr;
  //   store.setModel(`BOX_${randBox}`, bx);
  // }
  
	useEffect(() => {
    if (intervaldRef.current) {
      return;
    }
    else {
      console.log('App mounted...');
      intervaldRef.current = true;

      // setInterval(() => {
      //   intervalRunner();
      // }, 5000);
    }
	}, []);

	return (
		<div>		
       <AllBoxesView></AllBoxesView>
    </div>
	);
}

export default App;