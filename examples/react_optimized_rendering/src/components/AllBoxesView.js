import React, { useEffect, useState } from 'react';
import useStateStore from '../hooks/useStateStore';
import { RenderCounterDisplay, useRenderCounter } from  "../hooks/useRenderCounter";
import SingleBoxView from "./SingleBoxView";

const AllBoxesView = () => {
    const store = useStateStore();
	const [boxes, setBoxes] = useState();
    const [renderCount, increaseFn] = useRenderCounter();

    useEffect(() => { 
        const bx = store.getModel("BOXES");
        setBoxes(bx);

        store.subscribe('BOXES', 'BoxesView', (model) => {
            console.log("BOXES Model changed", model);
            setBoxes([...model]);
        });
    }, []);

    const headerClicked = (e) => {  
        const colors = store.getModel("COLORS"); 
        const randBox = parseInt(Math.random() * boxes.length);
        const bx = boxes[randBox];
        const randColor = parseInt(Math.random() * colors.length);
        const clr = colors[randColor];
        bx.color = clr;
        boxes[randBox] = bx;
        store.setModel("BOXES", boxes);
    };

    increaseFn();

    if(boxes == null) {
        return <div>...</div>
    } else {
        return (
            <div>
                <div className="boxes-header">
                    <div onClick={headerClicked}>You have {boxes.length} Boxes rendering #{renderCount.current}</div>
                </div>

                <div className="boxes-list">
                    {
                        boxes.map((box, i) => {  
                            return (
                                <SingleBoxView key={box.id} bid={box.id} box={box}></SingleBoxView>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default AllBoxesView;
