import { Component } from 'react';

export class SearchSection extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="flex justify-center align-middle bg-amber-100 gap-5 p-5">
        <input
          className="h-10 w-100 bg-white rounded-lg outline-0 px-3 py-2"
          type="search"
          placeholder="Search..."
          autoComplete="off"
        />
        <button className="h-10 bg-gray-300 rounded-lg px-5 py-2 cursor-pointer">
          Search
        </button>
      </div>
    );
  }
}

export default SearchSection;
