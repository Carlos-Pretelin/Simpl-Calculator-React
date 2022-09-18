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
            if(state.overwrite){
                return{
                    ...state,
                    currentOperand: payload.digit,
                    overwrite: false,
                }
            }

            if( payload.digit === "0" && state.currentOperand === "0"){
                return state
            }
            if( payload.digit === "." && state.currentOperand.includes(".")){
                return state
            }


            return{
                ...state,
                currentOperand: `${state.currentOperand || ""}${payload.digit}`,
            }

            

        case ACTIONS.CHOOSE_OPERATION:
            if(state.currentOperand == null && state.previousOperand == null ) {
                return state
            }

            if(state.currentOperand == null){
                return{
                    ...state,
                    operation: payload.operation,
                }
            }



            if(state.previousOperand == null ){
                return{
                    ...state,
                    operation: payload.operation,
                    previousOperand: state.currentOperand,
                    currentOperand: null,
                }
            }

            return{
                ...state,
                previousOperand: evaluate(state),
                operation: payload.operation,
                currentOperand: null,
            }
            
        case ACTIONS.CLEAR:
            return {}   
            
            

        case ACTIONS.DELETE_DIGIT:
            if(state.overwrite) {
                return{
                    ...state,
                    overwrite: false,
                    currentOperand: null,
                }
            }
            if(state.currentOperand == null) return state
            if(state.currentOperand.length === 1 ){
                return {... state, currentOperand: null}
            }
            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1)
            }

        case ACTIONS.EVALUATE:
            if(state.operation == null || state.currentOperand == null || state.previousOperand == null){
                return state
            }    
            return{
                ...state,
                operation: null,
                overwrite: true,
                previousOperand: null,
                currentOperand: evaluate(state),
            }

        
    }

}


function evaluate({currentOperand, previousOperand, operation}){
    const prev = parseFloat(previousOperand);
    const current =parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return "";
    let computation = ""
    switch(operation){
        case "+":
            computation = prev + current
            break
        case "-"    :
            computation = prev - current
            break
        case "/"    :
            computation = prev / current
            break
        case "*"    :
            computation = prev * current
            break            

    }
    
    return computation.toString()
}


const INTEGER_FORMATTER =  new Intl.NumberFormat("en-us",{
    maximumFractionDigits: 0,
})

function formatOperand(operand){
    if(operand == null ) return
    const [integer, decimal] = operand.split('.')
    if(decimal == null ) return INTEGER_FORMATTER.format(integer)
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`

}

function App(){


    const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer( reducer, {});


    //dispatch({ type: ACTIONS.ADD_DIGIT, payload:{ digit:1 }})
    return(
        
        <div className="calculator-grid">
            <div className="output">
                <div className="previous-operand">{formatOperand(previousOperand)}</div>
                <div className="current-operand">{formatOperand(currentOperand)}</div>
              
            </div>

        
        <button className="span-two" onClick={ () => {dispatch({type: ACTIONS.CLEAR})}}>AC</button>
        <button className="delete-button" onClick={ () => {dispatch({type: ACTIONS.DELETE_DIGIT})}}>DEL</button>

        <OperationButton operation={"/"} dispatch={dispatch} />
        <OperationButton operation={"*"} dispatch={dispatch} />
        <OperationButton operation={"+"} dispatch={dispatch} />
        <OperationButton operation={"-"} dispatch={dispatch} />

        <DiggitButton digit={"1"} dispatch={dispatch} />
        <DiggitButton digit={"2"} dispatch={dispatch} />
        <DiggitButton digit={"3"} dispatch={dispatch} />
        
        
        <DiggitButton digit={"4"} dispatch={dispatch} />
        <DiggitButton digit={"5"} dispatch={dispatch} />
        <DiggitButton digit={"6"} dispatch={dispatch} />
        

        <DiggitButton digit={"7"} dispatch={dispatch} />
        <DiggitButton digit={"8"} dispatch={dispatch} />
        <DiggitButton digit={"9"} dispatch={dispatch} />
        

        <DiggitButton digit={"."} dispatch={dispatch} />
        <DiggitButton digit={"0"} dispatch={dispatch} />
        <button className="span-two" onClick={ () => {dispatch({type: ACTIONS.EVALUATE})}}>=</button>
        
        
        
        </div>
    )

}

export default App;