import { Component } from 'react';
import SearchSection from '../components/SearchSection';

export class MainPage extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="max-w-7xl m-auto">
        <SearchSection />
      </div>
    );
  }
}

export default MainPage;
