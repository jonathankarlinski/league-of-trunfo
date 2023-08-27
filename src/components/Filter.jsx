import React from 'react';
import PropTypes from 'prop-types';
import '../style/Filter.css';
import Card from './Card';

class Filter extends React.Component {
  genericCards = (card, index) => (<Card
    key={ index }
    cardName={ card.name }
    cardDescription={ card.description }
    cardAttr1={ card.attr01 }
    cardAttr2={ card.attr02 }
    cardAttr3={ card.attr03 }
    cardImage={ card.image }
    cardRare={ card.rare }
    cardTrunfo={ card.trunfo }
    isAListCard
    onDeleteButtonClick={ this.handleDeleteButton }
  />);

  render() {
    const {
      trunfoFilter,
      filter,
      rarityFilter,
      handleValue,
      filters,
      isFiltering,
      cards,
    } = this.props;
    return (
      <main className="container-filter">
        <div className="container-filter-form">
          <input
            type="text"
            disabled={ trunfoFilter }
            value={ filter }
            onChange={ handleValue }
            data-testid="name-filter"
            maxLength="20"
            placeholder="Digite o nome da carta"
          />
          <label htmlFor="rarityFilter">
            <select
              data-testid="rare-filter"
              id="rarityFilter"
              disabled={ trunfoFilter }
              value={ rarityFilter }
              onChange={ handleValue }
            >
              <option>todas</option>
              <option>normal</option>
              <option>raro</option>
              <option>muito raro</option>
            </select>
          </label>
          <label htmlFor="trunfoFilter">
            Carta Trunfo
            <input
              data-testid="trunfo-filter"
              type="checkbox"
              id="trunfoFilter"
              checked={ trunfoFilter }
              onChange={ handleValue }
            />
          </label>
        </div>
        <div className="container-filter-cards">
          {isFiltering ? (
            filters.map(this.genericCards)
          ) : (
            cards.map(this.genericCards)
          )}
        </div>
      </main>
    );
  }
}

Filter.propTypes = {
  rarityFilter: PropTypes.string.isRequired,
  trunfoFilter: PropTypes.bool.isRequired,
  isFiltering: PropTypes.bool.isRequired,
  filter: PropTypes.string.isRequired,
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  cards: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleValue: PropTypes.func.isRequired,
};

export default Filter;
