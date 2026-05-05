import { Component } from 'react';

export class Loader extends Component {
  render() {
    return (
      <div className="transform animate-spin w-50 h-50">
        <p>Loading...</p>
        <img src="./spinner.png" alt="loading..." />
      </div>
    );
  }
}

export default Loader;
