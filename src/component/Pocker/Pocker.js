import * as React from 'react'
import './Pocker.scss';

class Pocker extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div className='pocker cursorPointer'>
                <img src={require('../../image/heart02.svg')} alt=''/>
            </div>
        )
    }
}

export default Pocker

// spade、heart、diamond、club