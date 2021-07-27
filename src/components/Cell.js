import React from 'react';

class Cell extends React.Component {
  render() {
    return(
      <div>
        <button className={`Cell ${this.props.alive}`} onClick={this.props.onClick}></button>
      </div>
    )
  };
}

export default Cell;
