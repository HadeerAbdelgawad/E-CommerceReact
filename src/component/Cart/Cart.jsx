import React, { useContext } from 'react'
import { counterContext } from '../../Context/counterContext';

function Carts() {

    let x = useContext(counterContext)
    console.log(x);
    

    return <>
        Counter is :{x.counter} 
        <button className='d-block btn btn-primary' onClick={()=>{x.setCounter(Math.random())}}> Change Counter</button>
    </>
}

export default Carts
