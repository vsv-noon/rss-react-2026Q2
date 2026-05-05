import { Component, type ChangeEvent, type KeyboardEvent } from 'react';
import { apiFetch } from '../services/api';
import type { FetchedCharacter } from '../types/types';

interface Props {
  setFetchedCharacter: (response: FetchedCharacter) => void;
  setIsLoading: (isLoading: boolean) => void;
}

interface SearchSectionState {
  query: string;
  lastSearch: string;
}

export class SearchSection extends Component<Props, SearchSectionState> {
  constructor(props: Props) {
    super(props);

    this.state = {
      query: '',
      lastSearch: '',
    };
  }

  componentDidMount(): void {
    const lastQuery = localStorage.getItem('searchTerm');

    if (lastQuery) {
      this.setState({ query: lastQuery }, this.handleSearch);
    }

    this.handleSearch();
  }

  handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ query: event.target.value });
  }

  handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  }

  async handleSearch() {
    const { query, lastSearch } = this.state;
    const trimmedQuery = query.trim();

    if (!lastSearch || trimmedQuery !== lastSearch) {
      this.props.setIsLoading(true);

      const fetchedCharacter = await apiFetch(trimmedQuery);

      this.setState({ lastSearch: trimmedQuery });
      this.props.setFetchedCharacter(fetchedCharacter);
      this.props.setIsLoading(false);
      localStorage.setItem('searchTerm', trimmedQuery);
    }
  }

  render() {
    return (
      <div className="flex justify-center align-middle bg-amber-100 gap-5 p-5">
        <input
          className="h-10 w-100 bg-white rounded-lg outline-0 px-3 py-2"
          type="search"
          value={this.state.query}
          onChange={this.handleInputChange.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
          placeholder="Search..."
          autoComplete="off"
        />
        <button
          className="h-10 bg-gray-300 rounded-lg px-5 py-2 cursor-pointer"
          onClick={this.handleSearch.bind(this)}
        >
          Search
        </button>
      </div>
    );
  }
}

export default SearchSection;
