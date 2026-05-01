import { Component } from 'react';
import SearchSection from '../components/SearchSection';
import ResultList from '../components/ResultList';

export class MainPage extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="max-w-7xl m-auto">
        <SearchSection />
        <ResultList />
      </div>
    );
  }
}

export default MainPage;
