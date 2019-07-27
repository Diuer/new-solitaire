import * as React from 'react'
import './MainPage.scss';
import Pocker from '../Pocker/Pocker';

class MainPage extends React.Component{
    constructor(props){
        super(props)

    }


    render(){
        let {isNewGame, newCardsArray, tempAreaArray, sortedAreaArray, handlePockerClick}=this.props

        return (
            newCardsArray!==undefined && (
            <div className='main-page'>
                <div className='top-operation'>
                    <div className='temp-area-pocker'>
                    {
                        tempAreaArray.map((tempContent, tempIndex)=>{
                            return <Pocker pockerInfo={tempContent} key={'tempArea'+tempIndex} handlePockerClick={handlePockerClick}/>
                        })
                    }
                    </div>
                    <div className='sorted-area-pocker'>
                    {
                        sortedAreaArray.map((sortedContent, sortedIndex)=>{
                            return <Pocker pockerInfo={sortedContent} key={'tempArea'+sortedIndex} handlePockerClick={handlePockerClick}/>
                        })
                    }
                    </div>
                </div>
                <div className='work-area-pocker'>
                {
                    newCardsArray.map((rowItem, rowIndex)=>{
                        return (
                        <div className='work-column' key={'rowColumn'+rowIndex}>
                        {
                            rowItem.map((item, itemIndex)=>{
                                return <Pocker pockerInfo={item} key={'rowPocker'+itemIndex} rowIndex={rowIndex} itemIndex={itemIndex} handlePockerClick={handlePockerClick}/>
                            })
                        }
                        </div>
                        )
                    })
                }
                </div>
            </div>
            )
        )
    }
}

export default MainPage