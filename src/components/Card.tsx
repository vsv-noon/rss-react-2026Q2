import { Component } from 'react';

type Character = {
  name: string;
  image: string;
  status: string;
  species: string;
};

type Props = {
  name: string;
  character: Character;
};

export class Card extends Component<Props> {
  render() {
    const { character } = this.props;
    return (
      <div>
        <img src={character.image} alt={character.name} />
        <h2>{this.props.name}</h2>
        <p>Status: {character.status}</p>
        <p>Species: {character.species}</p>
      </div>
    );
  }
}

export default Card;
