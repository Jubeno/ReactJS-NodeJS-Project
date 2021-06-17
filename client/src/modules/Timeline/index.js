import React, { useState, useMemo, useRef, useEffect } from 'react';

import { Container, Row } from 'react-bootstrap';
import FormCreate from './frames/FormCreate';
import { BsPlusCircle } from "react-icons/bs";
import {List} from 'react-virtualized';

const Timeline = (props) => {
    const itemForm = <FormCreate />;
    const timelineRef = useRef(null);
    const [ list, setList ] = useState([itemForm])
    const [ topPosition, setTop ] = useState(0);

    const handleScrollAddMore = (top) => {
        setTop(top);
    }

    useEffect(() => {
        window.addEventListener("scroll", () => handleScrollAddMore(window.pageYOffset));

        return window.removeEventListener("scroll", () => console.log("DONE!!"))
    }, [])

    const addOneMore = () => {
        setList([...list, itemForm])
    }

    const rowRenderer = ({ key, index, isScrolling, isVisible, style }) => {
        return (
            <div key={key} style={style}>
                {list[index]}
            </div>
        )
    };

    
    return (
        <>
            <Container id="timeline" ref={timelineRef}>
                <Row>
                    <h1 id="header-timeline" className=" text-center  pt-2">Create a Timeline</h1>
                    <div className="list-container">
                        <List
                            width={800}
                            height={850}
                            autoHeight
                            rowCount={list.length}
                            rowHeight={850}
                            rowRenderer={rowRenderer}
                        />
                    </div>
                    {/* <div className="one-more"> */}
                        <div className="box-one-more" style={{ top: topPosition + 300 }} onClick={addOneMore}>
                            <BsPlusCircle size={40} color="rgb(63, 63, 63)"/>
                            <p>Add<br/>one<br/>more</p>
                        </div>
                    {/* </div> */}
                </Row>
            </Container>
        </>
    );
}

export default Timeline;