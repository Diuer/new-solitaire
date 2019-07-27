import React from 'react';
import logo from './logo.svg';
import './App.scss';
import MainPage from './component/MainPage/MainPage';
import { exec } from 'child_process';

class App extends React.Component {
  constructor(){
    super()

    this.state={
      // tempAreaArray:[ 'spade02', 'heart10', 'club13',  null ],
      tempAreaArray: [null, null, null, null],
      sortedAreaArray: [ null, null, null, null ],
      isNewGame: true, //是否需開設新局
      unsortedCards: [8, 5, 6, 7, 6, 5, 7, 8]
    }

    this.handlePockerClick=this.handlePockerClick.bind(this)

  }

  componentDidMount(){

    setTimeout(() => {
      
    if(!this.state.isNewGame){
      return
    }

    let defaultCardsArray = this._initCardsArray()
    let randomCardsArray = this._randomCardsArray(defaultCardsArray)

    let tempIndex=0
    let newCardsArray=this.state.unsortedCards.map((rowNumber, rowIndex)=>{
      let rowCards=Array(rowNumber).fill([])
      return rowCards.map((value, index)=>{
        return randomCardsArray[tempIndex++]
      })
    })

    this.setState({
      newCardsArray,
      isNewGame: false
    })
    }, 500);
  }

  handlePockerClick(datas){
    let {pockerInfo, rowIndex, itemIndex}=datas
    const newCardsArray=this.state.newCardsArray
    console.log(pockerInfo)
    console.log(newCardsArray[rowIndex][itemIndex])
  }
  
  _initCardsArray(){
    let suitArray=['spade', 'heart', 'diamond', 'club']
    let numberArray=Array.from(Array(13).keys())
    let combinedCards=[]
    return suitArray.map((suit, suitIndex)=>{
      return numberArray.map((number, numberIndex)=>{
        number = parseInt(number)+1
        return suit + (number<10?'0'+number:number)
      }) 
    })
  }
  _randomCardsArray(defaultCardsArray){
    let randomCards = defaultCardsArray.join().split(',')
    return randomCards.sort( function(x, y) {
      return Math.random()>.5 ? -1 : 1
    })
  }
  _getRandomNumber(min, max){
    return Math.floor( Math.random() * (max - min + 1) ) + min
  }

  render(){
    let {isNewGame, newCardsArray, tempAreaArray, sortedAreaArray}=this.state
    console.log(newCardsArray)

    return (
      <div className='App'>

        <header>
          <div className='timer'>
            <i className='material-icons'>schedule</i>
            <span>00:00:00</span>
            <i className='material-icons cursorPointer'>pause</i>
          </div>
          <div className='setting'>
            <div className='button-undo cursorPointer'>
              <i className='material-icons'>undo</i>
              <span>Undo</span>
            </div>
            <div className='button-new cursorPointer'>
              <i className='material-icons'>filter_none</i>
              <span>New</span>
            </div>
          </div>

        </header>
        <MainPage isNewGame={isNewGame} newCardsArray={newCardsArray} tempAreaArray={tempAreaArray} sortedAreaArray={sortedAreaArray} handlePockerClick={this.handlePockerClick}/>
      </div>
    )
  }
}

export default App;


/* <i className='material-icons'>thumb_up</i>
<i className='material-icons'>play_arrow</i> */


// spade、heart、diamond、club