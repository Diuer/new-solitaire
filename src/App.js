import React from 'react';
import logo from './logo.svg';
import './App.scss';
import MainPage from './component/MainPage/MainPage';

class App extends React.Component {
  constructor(){
    super()

    this.state={
      tempAreaArray:[ 'spade02', 'heart10', 'club13',  null ],
      sortedAreaArray:[ null, null, null, null ],
      isNewGame: true,
      unsortedCards: [[],[],[],[],[],[],[],[]]
    }

  }

  render(){
    let {tempAreaArray, sortedAreaArray}=this.state

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
        
        <MainPage tempAreaArray={tempAreaArray} sortedAreaArray={sortedAreaArray}/>
      </div>
    )
  }
}

export default App;


/* <i className='material-icons'>thumb_up</i>
<i className='material-icons'>play_arrow</i> */


// spade、heart、diamond、club