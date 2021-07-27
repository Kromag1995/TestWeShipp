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
        <div className="menu">
            {fields}
            <p>{this.props.message}</p>
            <button onClick={this.props.onClick}>{this.props.name}</button>
        </div>
    )
  };
}

export default Menu;
