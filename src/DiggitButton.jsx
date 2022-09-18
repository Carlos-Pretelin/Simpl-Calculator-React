import { ACTIONS } from "./App";
import React from "react";
import '../styles/DigitButton.scss';




function DiggitButton({dispatch, digit}) {

    return (
        <button 
        className="digit-button"
        onClick={ () => dispatch( { type: ACTIONS.ADD_DIGIT, payload: { digit } }) }>
            {digit}
        </button>
    )

}

export default DiggitButton;