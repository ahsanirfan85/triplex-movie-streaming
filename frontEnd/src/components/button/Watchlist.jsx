import React, { Component } from 'react'
class Watchlist extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false
    };
    this.handleClick = this.handleClick.bind(this);
  } 
  
  handleClick() {
    this.setState({
      clicked: !this.state.clicked
    });
  }
  
  render() {
    // const text = this.state.clicked ? 'clicked' : 'haven\'t clicked';
    const label = this.state.clicked ? 'Remove watchlist ' : 'Add to watchlist ';
    return (
      <>

        <button className="btn-like" onClick={this.handleClick}>
          {label}
          <i className="fa-solid fa-plus"></i>
        </button>
        
        </>
    );
  }
}

export default Watchlist;