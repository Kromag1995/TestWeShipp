import React from 'react';

class Menu extends React.Component {
  render() {
    var fields = this.props.input.map((element,index) => {
        return (<div key={index}>
            <label>{element.field} </label>
            <input type={element.type} name={element.name} value={element.value} onChange={this.props.handleChange}/>
        </div>)
    });
    return(
        <div>
            {fields}
            <button onClick={this.props.changeState}>Cambiar {this.props.name}</button>
        </div>
    )
  };
}

export default Menu;
