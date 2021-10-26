import React, { ChangeEvent, FocusEventHandler, useState } from 'react'
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css'

const Credit: React.FC = (): JSX.Element => {
    const [state, setState] = useState({
        name: '',
        cvc:'',
        expiry: '',
        focus: '',
        number: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = e.target;
        setState( prev => ({...prev, [name]: value}));
    }

    const handleFocus = (e: ChangeEvent<HTMLInputElement>): void =>{
        const {name} = e.target;
        state.focus = name;
    }
    return (
        <div className="credit-card-body">
          <Cards
            cvc={state.cvc}
            expiry={state.expiry}
            name={state.name}
            preview
            placeholders={{name: 'Enter your name' }}
            locale={{valid: 'valid thru'}}
            issuer="visa"
            focused={state.focus}
            number={state.number}
          />
          <form className="form">
              <input type="text" onFocus={handleFocus} onChange={handleChange} placeholder="Card Name" name="name"/>
              <input type="number" onFocus={handleFocus} onChange={handleChange} placeholder="CVC" name="cvc"/>
              <input type="number" onFocus={handleFocus} onChange={handleChange} placeholder="Expiry date" name="expiry"/>
              <input type="number" onFocus={handleFocus} onChange={handleChange} placeholder="Card number" name="number"/>
          </form>
        </div>
    )
}

export default Credit
