import React from 'react';
import Cell from './components/Cell'

import './App.css';

function generateMatrix(i,j){
  return Array(j).fill().map(()=>{
    return Array(i).fill().map(()=>{
      return false
    })
  })
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heigth: 50,
      width: 30,
      board: generateMatrix(30,50),
      generation:0,
      run:false,
    };
    this.startRun = this.startRun.bind(this)
    this.stopRun = this.stopRun.bind(this)
    this.restartRun = this.restartRun.bind(this)
    this.turn = this.turn.bind(this)
  }

  killorRevive(i,j){
    const newBoard = this.state.board.map((arr)=> {return arr.slice()})
    newBoard[j][i] = !newBoard[j][i]
    this.setState({
      board : newBoard.map((arr)=> {return arr.slice()})
    })
  }
  renderBoard(){
    var board = Array(this.state.heigth).fill().map((u,j) => { return this.renderRow(j) })
    return (
      <div className="Board">
        {board}
      </div>
    )
  }
  renderRow(j){
    var row = Array(this.state.width).fill().map((u,i) => { return this.renderCell(i,j) })
    return (
      <div className="row" key={j.toString()}>
        {row}
      </div>
    )
  }
  renderCell(i,j) {
    return(
        <Cell onClick={this.killorRevive.bind(this,i,j)} key={i.toString()} alive={this.state.board[j][i]} />
    )
  }

  startRun(){
    // start/resume simulation
    this.setState({
      run:true
    })
  }
  stopRun(){
    // stop simulation
    this.setState({run:false})
  }
  restartRun(){
    // clean the board and reset the countdown
    if (this.state.run === true){
      this.setState({run:false})
    }
    this.setState({
      board:generateMatrix(this.state.width,this.state.heigth),
      generation:0
    })
  }

  componentDidUpdate(prevProps,prevState) {
    if ((this.state.run !== prevState.run)&&(this.state.run)) {
      this.game()
    }
  }

  game(){
    // main engine of the simulation
    setTimeout(()=>{
      if (this.state.run){
        this.turn()
        this.game()
      }
    },300)
  }

  turn(){
    const newBoard = this.state.board.map((arr)=> {return arr.slice()})
    var neighborhood =  Array(0)
    var alive
    this.state.board.forEach((elementJ, j) => {
      elementJ.forEach((elementI,i)=>{
        //Condiciones de contorno periodicas
        let k = j === 0? this.state.heigth-1:j-1 // si j es la primera fila entonces elijo la ultima fila, sino la fila anterior 
        let l = j === this.state.heigth-1? 0:j+1 // si j es la ultima fila entonces elijo la primera fila, sino la siguiente
        if (i===0){
          neighborhood = [...this.state.board[k].slice(0,2),this.state.board[k][this.state.width-1],...this.state.board[l].slice(0,2),this.state.board[l][this.state.width-1], elementJ[this.state.width-1], elementJ[1]]
        }
        else if (i===this.state.width-1){
          neighborhood = [...this.state.board[k].slice(-2), this.state.board[k][0],...this.state.board[l].slice(-2),this.state.board[l][0], elementJ[this.state.width-2], elementJ[0]]
        }
        else{
          neighborhood = [...this.state.board[k].slice(i-1,i+2),...this.state.board[l].slice(i-1,i+2), elementJ[i-1], elementJ[i+1]]
        }
        alive = this.state.board[j][i]
        newBoard[j][i] = this.check(neighborhood, alive)
      })
    })
    this.setState((prevState)=>{
      return {
        board:newBoard.map((arr)=> {return arr.slice()}),
        generation: prevState.generation+1
      }
    })
  }
  check(neighborhood, alive){
    //checks if the cell should keep living, revive or die
    var count = neighborhood.filter(x=>x===true).length
    if((alive===false && count === 3)||(alive===true && (count === 3||count === 2))){
      return true
    }
    else{
      return false
    }
  }


  render() {
    return(
    <div className="App">
      <div className="Panel">
        <button onClick={this.startRun}>Iniciar</button>
        <button onClick={this.stopRun}>Detener</button>
        <button onClick={this.restartRun}>Reiniciar</button>
        <button onClick={this.turn}>Step</button>
        <div>
          Generación {this.state.generation}
        </div>
      </div>
      <div className="container">
        {this.renderBoard()}
      </div>
    </div>
    )
  };
}

export default App;
