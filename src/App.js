import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      description: '',
      attr01: '0',
      attr02: '0',
      attr03: '0',
      image: '',
      rare: 'normal',
      filter: '',
      rarityFilter: 'todas',
      trunfo: false,
      isSaveButtonDisabled: true,
      cards: [],
      hasTrunfo: false,
      isFiltering: false,
      trunfoFilter: false,
      filters: [],
    };
  }

  valueChecking = () => {
    const {
      name, description, attr01, attr02, attr03, image,
    } = this.state;
    const attr1 = parseInt(attr01, 10);
    const attr2 = parseInt(attr02, 10);
    const attr3 = parseInt(attr03, 10);
    const attrLimit = 90;
    const attrSumMax = 210;

    const check01 = name === '' || description === '' || image === '';
    const check02 = attr1 + attr2 + attr3 > attrSumMax;
    const check03 = attr1 > attrLimit || attr2 > attrLimit || attr3 > attrLimit;
    const check04 = attr1 < 0 || attr2 < 0 || attr3 < 0;

    this.setState({
      isSaveButtonDisabled: check01 || check02 || check03 || check04,
    });
  };

  filterCards = () => {
    const { filter, rarityFilter, trunfoFilter, cards } = this.state;

    this.setState({
      isFiltering: filter !== '' || rarityFilter !== 'todas' || trunfoFilter,
      filters: cards
        .filter((card) => card.name.includes(filter))
        .filter((card) => {
          if (rarityFilter === 'todas') {
            return true;
          }

          return card.rare === rarityFilter;
        })
        .filter((card) => {
          if (!trunfoFilter) {
            return true;
          }

          return card.trunfo;
        }),
    });
  };

  handleValue = ({ target }) => {
    if (target.id === 'trunfo') {
      return this.setState((prevState) => ({
        trunfo: !prevState.trunfo,
      }));
    }

    if (target.id === 'trunfoFilter') {
      return this.setState((prevState) => ({
        trunfoFilter: !prevState.trunfoFilter,
      }), () => this.filterCards());
    }

    this.setState({
      [target.id]: target.value,
    }, () => {
      this.valueChecking();
      this.filterCards();
    });
  };

  trunfoChecking = () => {
    const { cards } = this.state;

    this.setState({
      hasTrunfo: cards.some((card) => card.trunfo),
    });
  };

  onSaveButtonClick = () => {
    const { name,
      description,
      attr01,
      attr02,
      attr03,
      image,
      rare,
      trunfo } = this.state;

    this.setState((prevState) => ({
      name: '',
      description: '',
      attr01: '0',
      attr02: '0',
      attr03: '0',
      image: '',
      rare: 'normal',
      trunfo: false,
      isSaveButtonDisabled: true,
      cards: [
        ...prevState.cards,
        {
          name,
          description,
          attr01,
          attr02,
          attr03,
          image,
          rare,
          trunfo,
        },
      ],
    }), () => this.trunfoChecking());
  };

  handleDeleteButton = ({ target }) => {
    const { cards, filters } = this.state;

    this.setState({
      cards: cards.filter((card) => card.name !== target.id),
      filters: filters.filter((card) => card.name !== target.id),
    }, () => this.trunfoChecking());
  };

  genericCards = (card) => (<Card
    key={ `Card ${card.name}` }
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
      name, description, attr01, attr02,
      attr03, image, rare, filter,
      rarityFilter, trunfo, hasTrunfo, isSaveButtonDisabled,
      isFiltering, trunfoFilter, cards, filters,
    } = this.state;

    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={ name }
          cardDescription={ description }
          cardAttr1={ attr01 }
          cardAttr2={ attr02 }
          cardAttr3={ attr03 }
          cardImage={ image }
          cardRare={ rare }
          cardTrunfo={ trunfo }
          hasTrunfo={ hasTrunfo }
          onInputChange={ this.handleValue }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card
          cardName={ name }
          cardDescription={ description }
          cardAttr1={ attr01 }
          cardAttr2={ attr02 }
          cardAttr3={ attr03 }
          cardImage={ image }
          cardRare={ rare }
          cardTrunfo={ trunfo }
          isAListCard={ false }
          onDeleteButtonClick={ this.handleDeleteButton }
        />
        <h2>Todas as cartas</h2>
        <input
          type="text"
          disabled={ trunfoFilter }
          value={ filter }
          onChange={ this.handleValue }
          data-testid="name-filter"
        />
        <label htmlFor="rarityFilter">
          Raridade
          <select
            data-testid="rare-filter"
            id="rarityFilter"
            disabled={ trunfoFilter }
            value={ rarityFilter }
            onChange={ this.handleValue }
          >
            <option>todas</option>
            <option>normal</option>
            <option>raro</option>
            <option>muito raro</option>
          </select>
        </label>
        <label htmlFor="trunfoFilter">
          Trunfo
          <input
            data-testid="trunfo-filter"
            type="checkbox"
            id="trunfoFilter"
            checked={ trunfoFilter }
            onChange={ this.handleValue }
          />
        </label>
        {isFiltering ? (
          filters.map(this.genericCards)
        ) : (
          cards.map(this.genericCards)
        )}
      </div>
    );
  }
}

export default App;
