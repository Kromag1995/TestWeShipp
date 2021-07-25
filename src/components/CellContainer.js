import React from 'react';
import Cell from './Cell'


class CellContainer extends React.Component {
  
  renderBoard(){
    var board = Array(this.props.heigth).fill().map((u,j) => { return this.renderRow(j) })
    return (
      <div className="Board">
        {board}
      </div>
    )
  }
  renderRow(j){
    var row = Array(this.props.width).fill().map((u,i) => { return this.renderCell(i,j) })
    return (
      <div className="row" key={j.toString()}>
        {row}
      </div>
    )
  }
  renderCell(i,j) {
    return(
        <Cell onClick={()=>this.props.killorRevive(i,j)} key={i.toString()} alive={this.props.board[j][i]} />
    )
  }

  render() {
    return(
      <div className="container">
        {this.renderBoard()}
      </div>
    )
  };
}

export default CellContainer;
