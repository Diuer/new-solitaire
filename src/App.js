import React from 'react';
import logo from './logo.svg';
import './App.scss';
import MainPage from './component/MainPage/MainPage';
import { exec } from 'child_process';

class App extends React.Component {
  constructor(){
    super()

    this.state={
      tempAreaArray: [null, null, null, null],
      sortedAreaArray: [ null, null, null, null ],
      isNewGame: true, //是否需開設新局
      isChoosePockers: false,
      putColumnPockers: []
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
    let newCardsArray=[7, 7, 7, 7, 6, 6, 6, 6].map((rowNumber, rowIndex)=>{
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

  handlePockerClick(infos){
    // console.log(infos)
    let {pockerInfo, rowIndex, itemIndex, type}=infos
    let {newCardsArray,  putColumnPockers, tempAreaArray, sortedAreaArray}=this.state
    let createResult=null

    if(this.state.isChoosePockers){ // 放Pockers


      tempAreaArray = this._deleteMovedPockers({tempAreaArray}, infos)
      sortedAreaArray = this._deleteMovedPockers({sortedAreaArray}, infos)
      newCardsArray = newCardsArray.map((item, index)=>{
        return this._deleteMovedPockers({'newCardsArray':item, 'totalCardsArray': newCardsArray}, infos)
      })

      if(type==='tempAreaArray'){
        tempAreaArray=this._createMovedPockers(tempAreaArray, infos)

      }else if(type==='sortedAreaArray'){
        sortedAreaArray=this._createMovedPockers(sortedAreaArray, infos)

      }else if(type==='newCardsArray'){
        newCardsArray=this._createMovedPockers(newCardsArray, infos)
      }

      // newCardsArray[rowIndex] = newCardsArray[rowIndex].concat(this.state.putColumnPockers)
      this.setState({
        isChoosePockers: false,
        tempAreaArray,
        sortedAreaArray,
        newCardsArray
      })

    }else{ // 選擇要放的Pockers
      if(pockerInfo===null){
        return
      }
      let compareTarget = null
      if(type==='newCardsArray'){
        let compareArray = newCardsArray[rowIndex].filter((item, index, array)=>{
          return index > itemIndex
        })
        let comparePocker=pockerInfo
          
        let compareSuccessArray = compareArray.filter((item, index, array)=>{
          let beCompareNumber = parseInt(comparePocker.substr(comparePocker.length-2,2))
          comparePocker = item
          return beCompareNumber-1 === parseInt(item.substr(item.length-2,2))
        })
        if(compareArray.length === compareSuccessArray.length){
          compareSuccessArray.splice(0, 0, pockerInfo);
          this.setState({
            isChoosePockers: true,
            putColumnPockers: compareSuccessArray
          })
        }
      }else{
        this.setState({
          isChoosePockers: true,
          putColumnPockers: [pockerInfo]
        })
      }
    }
  }
  
  _initCardsArray(){
    let suitArray=['spade', 'heart', 'diamond', 'club']
    let numberArray=Array.from(Array(13).keys())
    
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

  _deleteMovedPockers(target, infos){
    let {pockerInfo, rowIndex, itemIndex, type}=infos
    const {putColumnPockers}=this.state

    let deleteTarget=Object.keys(target)[0]

    target=target[deleteTarget]

    if(target.indexOf(putColumnPockers[0])!==-1){

      target.splice(target.indexOf(putColumnPockers[0]), putColumnPockers.length)

      if(deleteTarget==='newCardsArray'&&target.length===0){
        target[0]=null

      }else if(deleteTarget!=='newCardsArray'&&target.length===3){
        target.push(null)

      }
    }else{}

    return target
  }

  _createMovedPockers(target, infos){
    // target = 目標牌組的陣列
    let {pockerInfo, rowIndex, itemIndex, type}=infos // 目標牌組的資訊
    const {putColumnPockers}=this.state // 要放的牌

    console.log(target)
    if(type==='newCardsArray'){
      if(target[rowIndex][0]===null){
        target[rowIndex].splice(target[rowIndex].indexOf(null),1)

      }
      let lastTarget = target[rowIndex][target[rowIndex].length-1]

      if(parseInt(lastTarget.substr(lastTarget.length-2, 2))-1 === parseInt(putColumnPockers[0].substr(putColumnPockers[0].length-2, 2))){
        target[rowIndex] = target[rowIndex].concat(putColumnPockers)
      }else{
        
      }

    }else{
      target.splice(target.indexOf(null), 1, putColumnPockers[0])

    }

    return target
  }

  render(){
    let {isNewGame, newCardsArray, tempAreaArray, sortedAreaArray}=this.state
    console.log(this.state.isChoosePockers)

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