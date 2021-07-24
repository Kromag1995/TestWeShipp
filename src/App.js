import React from 'react';
import Cell from './components/Cell'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heigth: 5,
      width: 5,
      board: [],
      generation:0, 
    };
  }
  renderBoard(){
    var board = []
    for (let j = 0; j < this.state.heigth; j++){
      board.push(this.renderRow(j))
    }
    return (
      <div className="Board">
        {board}
      </div>
    )
  }
  renderRow(j){
    var row = []
    for (let i = 0; i < this.state.width; i++){
      row.push(this.renderCell(j,i))
    }
    return (
      <div className="row">
        {row}
      </div>
    )
  }
  renderCell(i,j) {
    return(
      <Cell alive={false} onClick={() => this.handleClick(j,i)}/>
    )
  }
  render() {
    return(
    <div className="App">
      <div className="Panel">
        <button>Iniciar</button>
        <button>Detener</button>
        <button>Reiniciar</button>
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
