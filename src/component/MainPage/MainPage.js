import * as React from 'react'
import './MainPage.scss';
import Pocker from '../Pocker/Pocker';

class MainPage extends React.Component{
    constructor(props){
        super(props)

    }


    render(){
        let {tempAreaArray, sortedAreaArray}=this.props

        return (
            <div className='main-page'>
                <div className='top-operation'>
                    <div className='temp-area-pocker'>
                    {
                        tempAreaArray.map((tempContent, tempIndex)=>{
                            return <Pocker key={'tempArea'+tempIndex}/>
                        })
                    }
                    </div>
                    <div className='sorted-area-pocker'>
                    {
                        sortedAreaArray.map((sortedContent, sortedIndex)=>{
                            return <Pocker key={'tempArea'+sortedIndex}/>
                        })
                    }
                    </div>
                </div>
                <div className='work-area-pocker'>
                    <div className='work-column'>
                        <Pocker/>
                        <Pocker/>
                    </div>
                    <div className='work-column'>
                        <Pocker/>
                    </div>
                    <div className='work-column'>
                        <Pocker/>
                    </div>
                    <div className='work-column'>
                        <Pocker/>
                        <Pocker/>
                        <Pocker/>
                    </div>
                    <div className='work-column'>
                        <Pocker/>
                    </div>
                    <div className='work-column'>
                        <Pocker/>
                    </div>
                    <div className='work-column'>
                        <Pocker/>
                        <Pocker/>
                        <Pocker/>
                        <Pocker/>
                        <Pocker/>
                        <Pocker/>
                    </div>
                    <div className='work-column'>
                        <Pocker/>
                    </div>
                </div>
            </div>
        )
    }
}

export default MainPage