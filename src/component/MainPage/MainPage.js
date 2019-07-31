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
                            return <Pocker infos={{'pockerInfo': tempContent, 'type': 'tempAreaArray'}} key={'tempArea'+tempIndex} handlePockerClick={handlePockerClick}/>
                        })
                    }
                    </div>
                    <div className='sorted-area-pocker'>
                    {
                        sortedAreaArray.map((sortedContent, sortedIndex)=>{
                            return <Pocker infos={{'pockerInfo': sortedContent, 'type': 'sortedAreaArray'}} key={'tempArea'+sortedIndex} handlePockerClick={handlePockerClick}/>
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
                                return <Pocker infos={{'pockerInfo': item, 'rowIndex': rowIndex, 'itemIndex': itemIndex, 'type': 'newCardsArray'}} key={'rowPocker'+itemIndex} handlePockerClick={handlePockerClick}/>
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