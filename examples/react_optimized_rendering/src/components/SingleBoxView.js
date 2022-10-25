import React, { useEffect, useState } from 'react';
import useStateStore from '../hooks/useStateStore';
import { useRenderCounter } from  "../hooks/useRenderCounter";
import { Chart } from "react-google-charts";

const SingleBoxView = (props) => {
    const store = useStateStore();
	const [box, setBox] = useState(props.box);
    const [renderCount, increaseFn] = useRenderCounter();

    useEffect(() => { 
        setBox(props.box);

        store.subscribe(box.id, box.id, (model) => {
            const bx = store.getModel(box.id);
            setBox(bx);
        });
    }, []);

    // const data = [ //chart data
    //     ["Element", "Density", { role: "style" }],
    //     ["Copper", 8.94, "#b87333"], // RGB value
    //     ["Silver", 10.49, "silver"], // English color name
    //     ["Gold", 19.3, "gold"],
    //     ["Platinum", 21.45, "color: #e5e4e2"], // CSS-style declaration
    // ];

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

