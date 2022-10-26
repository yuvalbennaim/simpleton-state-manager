import React, { useEffect, useState } from 'react';
import useStateStore from '../hooks/useStateStore';
import useStateToStoreBinding from '../hooks/useStateToStoreBinding';
import { useRenderCounter } from  "../hooks/useRenderCounter";
import SingleBoxView from "./SingleBoxView";

const AllBoxesView = () => {
    const store = useStateStore();
    const [boxes, setBoxes] = useStateToStoreBinding('BOXES', 'AllBoxesView', []);
    const [renderCount, increaseFn] = useRenderCounter();

    const headerClicked = (e) => {  
        const colors = store.getModel("COLORS"); 
        const randBox = parseInt(Math.random() * boxes.length);
        const bx = boxes[randBox];
        const randColor = parseInt(Math.random() * colors.length);
        const clr = colors[randColor];
        bx.color = clr;
        boxes[randBox] = bx;
        store.setModel("BOXES", [...boxes]);
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
                                <SingleBoxView key={box.id} box={box}></SingleBoxView>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default AllBoxesView;
