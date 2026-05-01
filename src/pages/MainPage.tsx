import { Component } from 'react';
import SearchSection from '../components/SearchSection';
import ResultList from '../components/ResultList';
import type { FetchedCharacter } from '../types/types';

interface MainPageState {
  fetchedCharacter: FetchedCharacter | null;
  isError: boolean;
  isLoading: boolean;
}

export class MainPage extends Component {
  state: MainPageState = {
    fetchedCharacter: null,
    isError: false,
    isLoading: false,
  };

  setFetchedCharacter(fetchedCharacter: FetchedCharacter) {
    this.setState({ fetchedCharacter });
  }

  setIsLoading(isLoading: boolean) {
    this.setState({ isLoading });
  }

  handleErrorClick() {
    this.setState({ isError: true });
  }

  render() {
    if (this.state.isError) {
      throw new Error('I crashed!');
    }

    return (
      <div className="max-w-7xl m-auto">
        <SearchSection
          setIsLoading={this.setIsLoading.bind(this)}
          setFetchedCharacter={this.setFetchedCharacter.bind(this)}
        />
        <button
          className="w-full font-bold text-white bg-red-500 py-2 cursor-pointer"
          onClick={this.handleErrorClick.bind(this)}
        >
          Create an error!
        </button>
        <ResultList
          isLoading={this.state.isLoading}
          fetchedCharacter={this.state.fetchedCharacter}
        />
      </div>
    );
  }
}

export default MainPage;
