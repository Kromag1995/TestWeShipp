import React from 'react';

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alive: false,
    };
  }
  render() {
    return(
        <span className="Cell" />
    )
  };
}

export default Cell;
