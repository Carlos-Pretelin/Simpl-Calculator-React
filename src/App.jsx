import React, { useReducer,  } from "react";
import DiggitButton from "./DiggitButton";
import OperationButton from "./OperationButton";
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
            if( payload.digit === "0" && state.currentOperand === "0"){
                return state
            }
            if( payload.digit === "." && state.currentOperand.includes(".")){
                return state
            }


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
        <OperationButton operation={"/"} dispatch={dispatch} />

        <DiggitButton digit={"1"} dispatch={dispatch} />
        <DiggitButton digit={"2"} dispatch={dispatch} />
        <DiggitButton digit={"3"} dispatch={dispatch} />
        <OperationButton operation={"*"} dispatch={dispatch} />
        
        <DiggitButton digit={"4"} dispatch={dispatch} />
        <DiggitButton digit={"5"} dispatch={dispatch} />
        <DiggitButton digit={"6"} dispatch={dispatch} />
        <OperationButton operation={"+"} dispatch={dispatch} />

        <DiggitButton digit={"7"} dispatch={dispatch} />
        <DiggitButton digit={"8"} dispatch={dispatch} />
        <DiggitButton digit={"9"} dispatch={dispatch} />
        <OperationButton operation={"-"} dispatch={dispatch} />

        <DiggitButton digit={"."} dispatch={dispatch} />
        <DiggitButton digit={"0"} dispatch={dispatch} />
        <button className="span-two">=</button>
        
        </div>
    )

}

export default App;