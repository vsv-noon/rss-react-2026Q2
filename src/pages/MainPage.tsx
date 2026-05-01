import { Component } from 'react';
import SearchSection from '../components/SearchSection';
import ResultList from '../components/ResultList';
import type { FetchedCharacter } from '../types/types';

interface MainPageState {
  fetchedCharacter: FetchedCharacter | null;
}

export class MainPage extends Component {
  state: MainPageState = {
    fetchedCharacter: null,
  };

  setFetchedCharacter(fetchedCharacter: FetchedCharacter) {
    this.setState({ fetchedCharacter });
  }

  render() {
    return (
      <div className="max-w-7xl m-auto">
        <SearchSection
          setFetchedCharacter={this.setFetchedCharacter.bind(this)}
        />
        <ResultList fetchedCharacter={this.state.fetchedCharacter} />
      </div>
    );
  }
}

export default MainPage;
