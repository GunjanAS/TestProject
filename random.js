import React from 'react';

class Login extends React.Component {
  state = {
    input= ''
  };


  render()
  {
      return
      (
        <div className="App">
        <header className="App-header">
        <input></input>
        <button onClick={this.handleLogin}>Submit</button>
        </header>
      </div>
      )
  }

}