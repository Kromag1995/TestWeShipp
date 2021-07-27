import React from 'react';

import './App.css';
import CellContainer from './components/CellContainer';
import Menu from './components/Menu';
import MenuConfig from './components/MenuConfig';







function generateMatrix(width,heigth){
  //return a new multidimensional array of dimension heigth*width with false in its elements 
  return Array(heigth).fill(Array(width).fill(false)).slice().map((arr)=> {return arr.slice()})
}

function matrixToString(arr){
  // transform the multidimensional array into a string representation
  var str = ''
  arr.forEach(row=>{
    row.forEach(columnElement=>{
      str += `${columnElement},`
    })
    str +=';'
  })
  return str
}

function stringToMatrix(str){
  // transform a str into a multidimensional array
  var matrix = str.split(';').slice(0,-1).map(line=>{
    return line.split(',').slice(0,-1).map(element=>{
      return element === "true"?true:false
    })
  })
  return matrix.map((arr)=> {return arr.slice()})
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heigth: 50,
      width: 30,
      menuheigth:50,
      menuwidth:30,
      board: generateMatrix(30,50),
      generation:0,
      run:false,
      time:300,
      menutime:300,
      nameconfig:"Ejemplo 1",
      configfrommemorylist:[],
      loadconfigfrommemory:"",
      configfrompredlist:['Flor','Diagonal','Medio vertical','Medio y Diagonal','Todos Vivos'],
      loadconfigfrompred:"Flor",
    };
    this.startRun = this.startRun.bind(this)
    this.stopRun = this.stopRun.bind(this)
    this.restartRun = this.restartRun.bind(this)
    this.turn = this.turn.bind(this)
    this.killorRevive = this.killorRevive.bind(this)
    this.changeSize = this.changeSize.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.changeTime = this.changeTime.bind(this)
    this.saveConfig = this.saveConfig.bind(this)
    this.loadConfigFromMemory = this.loadConfigFromMemory.bind(this)
    this.showMenu = this.showMenu.bind(this)
    this.loadConfigFromPred = this.loadConfigFromPred.bind(this)
  }


  componentDidUpdate(prevProps,prevState) {
    if ((this.state.run !== prevState.run)&&(this.state.run)) {
      this.game()
    }
  }

  componentDidMount(){
    this.showConfigInMemory()
  }


  killorRevive(i,j){
    //Kill a cell if its alive, revive it otherwise
    const newBoard = this.state.board.map((arr)=> {return arr.slice()})
    newBoard[j][i] = !newBoard[j][i]
    this.setState({
      board : newBoard.map((arr)=> {return arr.slice()})
    })
  }


  //Configuraciones Predeterminadas
  diagPrinc(){
    var newBoard = generateMatrix(10,10)
    for (var i=0;i<10;i++){
      newBoard[i][i] = true
    }
    newBoard[0][1] = true
    this.setState({
      board : newBoard.map((arr)=> {return arr.slice()})
    })
  }

  vertPrinc(){
    var newBoard = generateMatrix(10,10)
    for (var i=0;i<10;i++){
      newBoard[i][4] = true
    }
    this.setState({
      board : newBoard.map((arr)=> {return arr.slice()})
    })
  }

  vertAndDiag(){
    var newBoard = generateMatrix(10,10)
    for (var i=0;i<10;i++){
      newBoard[i][i] = true
    }
    for (i=0;i<10;i++){
      newBoard[i][4] = true
    }
    this.setState({
      width : 10,
      heigth : 10,
      board : newBoard.map((arr)=> {return arr.slice()})
    })
  }

  flower(){
    var newBoard = generateMatrix(10,10)
    newBoard[5][5] = true
    newBoard[4][5] = true
    newBoard[6][5] = true
    newBoard[5][4] = true
    newBoard[5][6] = true
    this.setState({
      width : 10,
      heigth : 10,
      board : newBoard.map((arr)=> {return arr.slice()})
    })

  }

  alive(){
    this.setState({board:Array(this.state.width).fill(Array(this.state.heigth).fill(true))})    
  }

  loadConfigFromPred(){
    //Load a predeterminated configuration of the board
    if (this.state.run === true){
      this.stopRun()
    }
    switch(this.state.loadconfigfrompred){
      case 'Flor':
        this.flower()
        break
      case 'Diagonal': this.diagPrinc()
        break
      case 'Medio vertical': this.vertPrinc()
        break
      case 'Medio y Diagonal': this.vertAndDiag()
        break
      case 'Todos Vivos': this.alive()
        break
      default:    
    }
  }


  //Simulation
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
    // stop the simulation, clean the board and reset the countdown
    if (this.state.run === true){
      this.stopRun()
    }
    this.setState({
      board:generateMatrix(this.state.width,this.state.heigth),
      generation:0
    })
  }

  game(){
    // main engine of the simulation, if run is true it keeps it calls turn and itself
    setTimeout(()=>{
      if (this.state.run){
        this.turn()
        this.game()
      }
    },this.state.time)
  }

  turn(){
    // turn in the simulation, for every cell in the board check its neighborhood and call check 
    const newBoard = this.state.board.map((arr)=> {return arr.slice()})
    var neighborhood =  Array(0)
    var alive
    this.state.board.forEach((elementJ, j) => {
      elementJ.forEach((elementI,i)=>{
        //Periodic conditions
        let k = j === 0? this.state.heigth-1:j-1
        let l = j === this.state.heigth-1? 0:j+1 
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


  //change parameters
  changeSize(){
    //Stop the simulation, clean the board and change its size
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
    // Stop the simulation, and change the time between simulation
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
    // Handle the change of the inputs 
    var value
    if (e.target.type==="number"){
      value = parseInt(e.target.value)
    }
    else{
      value = e.target.value
    }
    this.setState({
      [e.target.name]:value
    })
  }


  saveConfig(){
    // Save the current configuration on localStorage
    localStorage.setItem(`BoardConfig${this.state.nameconfig}`,matrixToString(this.state.board))
    this.showConfigInMemory()
  }
  showConfigInMemory(){
    // Load the names of the currents configurations in localStorage
    var myKeys = Object.keys(localStorage).filter((x) => { return x.slice(0,11)==="BoardConfig"}).map(x=>{return x.slice(11)})
    this.setState({
      configfrommemorylist : myKeys.slice(),
      loadconfigfrommemory : myKeys[0]
    })
  }

  loadConfigFromMemory(){
    //load the configuration from localStorage
    var newBoard = stringToMatrix(localStorage.getItem(`BoardConfig${this.state.loadconfigfrommemory}`))
    this.setState({
      board: newBoard.map((arr)=> {return arr.slice()}),
      heigth: newBoard.length,
      width: newBoard[0].length
    })
  }


  showMenu(e){
    //Show the selected menu
    this.setState({changeMode:e.target.name})
  }

  render() {
    var inputSize = [
      {field:"Ancho",name:"menuwidth", value:this.state.menuwidth, type:"number"},
      {field:"Alto",name:"menuheigth", value:this.state.menuheigth, type:"number"},
    ]
    var inputTime = [
      {field:"Tiempo de intervalos (ms)",name:"menutime", value:this.state.menutime, type:"number"},
    ]
    var inputSave = [
      {field:"Nombre de la configuracion",name:"nameconfig", value:this.state.nameconfig, type:"text"},
    ]
    var changeWindow
    switch(this.state.changeMode){
        case "size":
          changeWindow = <Menu input={inputSize} handleChange={this.handleChange} onClick={this.changeSize} name="Cambiar tamaño" message={"El tamaño minimo para el alto y el ancho es 2"}/>
          break;
        case "time":
          changeWindow = <Menu input={inputTime} handleChange={this.handleChange} onClick={this.changeTime} name="Cambiar tiempo"/>
          break;
        case "save":
          changeWindow = <Menu input={inputSave} handleChange={this.handleChange} onClick={this.saveConfig} name="Guardar"/>
          break;
        case "load":
          changeWindow = <>
                        <MenuConfig options={this.state.configfrommemorylist} name ="loadconfigfrommemory" handleChange={this.handleChange} value={this.state.loadconfigfrommemory} onClick={this.loadConfigFromMemory}/>
                        <MenuConfig options={this.state.configfrompredlist} name ="loadconfigfrompred" handleChange={this.handleChange} value={this.state.loadconfigfrompred} onClick={this.loadConfigFromPred}/>
                        </>
          break;
        default:
    }
    return(
      <div className="App">
        <div className="panel">
          <button onClick={this.startRun}>Iniciar</button>
          <button onClick={this.stopRun}>Detener</button>
          <button onClick={this.restartRun}>Reiniciar</button>
          <button onClick={this.turn}>Step</button>
          <button onClick={this.showMenu} name="size">Cambiar tamaño</button>
          <button onClick={this.showMenu} name="time">Cambiar tiempo</button>
          <button onClick={this.showMenu} name="save">Guardar configuracion</button>
          <button onClick={this.showMenu} name="load">Cargar configuracion</button>
          <div className="generation">
            <strong>
              Generación {this.state.generation}
            </strong>
          </div>
        </div>
        {changeWindow}
        <CellContainer board={this.state.board} killorRevive={this.killorRevive} heigth={this.state.heigth} width={this.state.width}/>
      </div>
    )
  };
}

export default App;
