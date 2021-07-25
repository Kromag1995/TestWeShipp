import React from 'react';

class Cell extends React.Component {
  render() {
    return(
        <button className={`Cell ${this.props.alive}`} onClick={this.props.onClick}></button>
    )
  };
}

export default Cell;
