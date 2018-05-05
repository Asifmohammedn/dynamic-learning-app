import React from 'react'
import './drawing-board/drawingboard';
import './drawing-board/drawingboard.scss';
import { Tracker } from 'meteor/tracker';

export default class Drawingboard extends React.Component {

    componentDidMount() {

        this.boardTracker =Tracker.autorun(()=>{
            this.myBoard = new DrawingBoard.Board('board', {
                background: "#000000",
                color: "#ffffff",
                size: 5,
                controls: ['Color',
                  { DrawingMode: { filler: false } },
                  { Size: { type: "range" } },
                  'Navigation',
                ],
                webStorage: 'session'
              });
        });
    }

    componentWillUnmount() {
        this.boardTracker.stop();
    }

    render() {

        const boardStyle = {
            width:400,
            height:400,
        }

        return(
        <div id='board' style={boardStyle}>
            <p>Drawing-board</p>
        </div>
        );
    }
}