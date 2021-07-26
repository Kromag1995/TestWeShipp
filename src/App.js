import React from 'react';

import './App.css';
import CellContainer from './components/CellContainer';
import Menu from './components/Menu';



function generateMatrix(width,heigth){
  return Array(heigth).fill().map(()=>{
    return Array(width).fill().map(()=>{
      return false
    })
  })
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heigth: 5,
      width: 5,
      menuheigth:5,
      menuwidth:5,
      board: generateMatrix(5,5),
      generation:0,
      run:false,
      time:300,
      menutime:300,
    };
    this.startRun = this.startRun.bind(this)
    this.stopRun = this.stopRun.bind(this)
    this.restartRun = this.restartRun.bind(this)
    this.turn = this.turn.bind(this)
    this.killorRevive = this.killorRevive.bind(this)
    this.changeSize = this.changeSize.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.changeTime = this.changeTime.bind(this)
  }
  killorRevive(i,j){
    const newBoard = this.state.board.map((arr)=> {return arr.slice()})
    newBoard[j][i] = !newBoard[j][i]
    this.setState({
      board : newBoard.map((arr)=> {return arr.slice()})
    })
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
      this.stopRun()
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
    },this.state.time)
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
  changeSize(){
    if (this.state.run === true){
      this.stopRun()
    }
    if ((this.state.menuwidth<2)||(this.state.menuwidth<2)){
      return
    }
    this.setState({
      width:this.state.menuwidth,
      heigth:this.state.menuheigth,
      board:generateMatrix(this.state.menuwidth,this.state.menuheigth)
    })
  }
  changeTime(){
    if (this.state.run === true){
      this.stopRun()
    }
    if (this.state.menutime<1){
      return
    }
    this.setState({
      time:this.state.menutime
    })
  }
  handleChange(e){
    var value = parseInt(e.target.value)
    this.setState({
      [e.target.name]:value
    })
  }
  render() {
    var inputSize = [
      {field:"Ancho",name:"menuwidth", value:this.state.menuwidth, type:"number"},
      {field:"Alto",name:"menuheigth", value:this.state.menuheigth, type:"number"},
    ]
    var inputTime = [
      {field:"Tiempo de intervalos (ms)",name:"menutime", value:this.state.menutime, type:"number"},
    ]
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
          <Menu input={inputSize} handleChange={this.handleChange} changeState={this.changeSize} name="Tamaño"/>
          <small>El ancho y el alto no pueden ser menor a 2</small>
          <Menu input={inputTime} handleChange={this.handleChange} changeState={this.changeTime} name="Tiempo"/>
        </div>
        <CellContainer board={this.state.board} killorRevive={this.killorRevive} heigth={this.state.heigth} width={this.state.width}/>
      </div>
    )
  };
}

export default App;
