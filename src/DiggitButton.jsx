import { ACTIONS } from "./App";
import React from "react";




function DiggitButton({dispatch, digit}) {

    return (
        <button 
        onClick={ () => dispatch( { type: ACTIONS.ADD_DIGIT, payload: { digit } }) }>
            {digit}
        </button>
    )

}

export default DiggitButton;