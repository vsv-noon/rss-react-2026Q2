import { Component } from 'react';
import type { FetchedCharacter } from '../types/types';
import Card from './Card';

interface Props {
  fetchedCharacter: FetchedCharacter | null;
  isLoading: boolean;
}

export class ResultList extends Component<Props> {
  state = {};

  render() {
    return (
      <div className="text-center p-5">
        <h1 className="text-3xl font-bold mb-5">Rick and Morty</h1>
        <div className="flex flex-wrap justify-center gap-3">
          {this.props.isLoading && (
            <div className="transform animate-spin w-100 h-100">
              <img src="./spinner.png" alt="loading..." />
            </div>
          )}
          {!this.props.isLoading && this.props.fetchedCharacter?.error && (
            <h3>{`${this.props.fetchedCharacter.error}`}</h3>
          )}
          {!this.props.isLoading &&
            this.props.fetchedCharacter?.results &&
            this.props.fetchedCharacter.results.map((character) => (
              <Card
                key={character.id}
                name={character.name}
                character={character}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default ResultList;
