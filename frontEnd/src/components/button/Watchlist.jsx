import React, { Component } from 'react'
class Watchlist extends Component {
  constructor() {
    super();
    this.state = {
      liked: false
    };
    this.handleClick = this.handleClick.bind(this);
  } 
  
  handleClick() {
    this.setState({
      liked: !this.state.liked
    });
  }
  
  render() {
    // const text = this.state.liked ? 'liked' : 'haven\'t liked';
    const label = this.state.liked ? 'Remove watchlist ' : 'Add to watchlist ';
    return (
      <>

        <button className="btn-like" onClick={this.handleClick}>
          {label}
          <i class="fa-solid fa-plus"></i>
        </button>
        
        </>
    );
  }
}

export default Watchlist;