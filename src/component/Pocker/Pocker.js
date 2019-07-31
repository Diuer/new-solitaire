import * as React from 'react'
import './Pocker.scss';

class Pocker extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        let {handlePockerClick, infos}=this.props
        let {pockerInfo, rowIndex, itemIndex} = infos
        
        return (
            <div className='pocker' data-pocker={pockerInfo} style={{'top': (itemIndex!==undefined && itemIndex===0 ? 0 : itemIndex*-140+'px')}} onClick={()=>{handlePockerClick(infos)}}>
                {pockerInfo!==null && (
                <img src={require('../../image/'+pockerInfo+'.svg')} alt=''/>
                // <img src={require('../../image/heart02.svg')} alt='' className='cursorPointer'/>
                )}
            </div>
        )
    }
}

export default Pocker

// spade、heart、diamond、club