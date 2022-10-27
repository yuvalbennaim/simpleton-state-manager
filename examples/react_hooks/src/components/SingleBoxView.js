import React, { useEffect, useState } from 'react';
import useStateStore from '../hooks/useStateStore';
import useStateToStoreBinding from '../hooks/useStateToStoreBinding';
import { useRenderCounter } from  "../hooks/useRenderCounter";

const SingleBoxView = (props) => {
    const store = useStateStore();
	const [box, setBox] = useStateToStoreBinding(props.box.id, []);
    const [renderCount, increaseFn] = useRenderCounter();

    const boxClicked = (e) => {    
        const colors = store.getModel("COLORS"); 
        console.log('Box clicked', box);  
        const randColor = parseInt(Math.random() * colors.length);
        const clr = colors[randColor];
        box.color = clr;  
        setBox(box);
    };

    useEffect(() => {
        console.log('SingleBoxView', box);
        
    }, []);

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

