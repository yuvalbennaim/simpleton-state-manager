import React, { useEffect, useState } from 'react';
import useStateStore from '../hooks/useStateStore';
import { RenderCounterDisplay, useRenderCounter } from  "../hooks/useRenderCounter";

const SingleBoxView = (props) => {
    const store = useStateStore();
	const [box, setBox] = useState(props.box);
    const [renderCount, increaseFn] = useRenderCounter();
    const bid = props.bid;

    useEffect(() => { 
        setBox(props.box);

        store.subscribe(bid, bid, (model) => {
            const bx = store.getModel(bid);
            setBox(bx);
        });
    }, []);

    const boxClicked = (e) => {    
        const colors = store.getModel("COLORS"); 
        console.log('Box clicked', box);  
        const randColor = parseInt(Math.random() * colors.length);
        const clr = colors[randColor];
        box.color = clr;
        store.setModel(box.id, box);   
    };

    increaseFn();

    if (box == null) {
        return <div>...</div>
    }
    else {
        return (
            <div className="box" style={{backgroundColor: `${box.color}`}} onClick={boxClicked}>
                <div>Box {box.id}</div>
                <div>Render {renderCount.current}</div>
            </div>
        )
    }
};

export default SingleBoxView;

