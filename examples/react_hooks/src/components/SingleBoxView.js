import React, { useEffect, useState } from 'react';
import useStateStore from '../hooks/useStateStore';
import useStateToStoreBinding from '../hooks/useStateToStoreBinding';
import { useRenderCounter } from  "../hooks/useRenderCounter";
import { Chart } from "react-google-charts";

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
        store.setModel(box.id, box);   

        // const boxes = store.getModel("BOXES"); 
        // store.setModel("BOXES", [...boxes]);
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
                {/* <Chart chartType="ColumnChart" width="100%" height="400px" data={data} /> */}
            </div>
        )
    }
};

export default SingleBoxView;

