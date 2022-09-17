import React, { useReducer,  } from "react";
import DiggitButton from "./DiggitButton";
import '../styles/App.scss';




export const ACTIONS = {
    ADD_DIGIT: 'add-digit',
    DELETE_DIGIT: 'delete-digit',
    CHOOSE_OPERATION: 'choose-operation',
    CLEAR: 'clear',
    EVALUATE: 'evaluate'

}

function reducer(state, {type, payload}){
    switch(type){
        case ACTIONS.ADD_DIGIT:
            return{
                ...state,
                currentOperand: `${state.currentOperand || ""}${payload.digit}`
            }
    }

}



function App(){


    const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer( reducer, {});


    //dispatch({ type: ACTIONS.ADD_DIGIT, payload:{ digit:1 }})
    return(
        
        <div className="calculator-grid">
            <div className="output">
                <div className="previous-operand">{previousOperand}</div>
                <div className="current-operand">{currentOperand}</div>
            </div>


        <button className="span-two">AC</button>
        <button>DEL</button>
        <button>/</button>
        <DiggitButton digit={"1"} dispatch={dispatch} />
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>*</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>+</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>-</button>
        <button>.</button>
        <button>0</button>
        <button className="span-two">=</button>
        
        </div>
    )

}

export default App;