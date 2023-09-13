import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import Filter from './components/Filter';
import dataCards from './data/data';

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
      cards: dataCards,
      hasTrunfo: false,
      isFiltering: false,
      trunfoFilter: false,
      filters: [],
    };
  }

  componentDidMount() {
    const { cards } = this.state;
    cards.reverse();
    if (localStorage.getItem('saveCards') === null) {
      const setCards = JSON.stringify(cards);
      localStorage.setItem('saveCards', setCards);
    }
    this.funcitionInicial();
  }

  componentDidUpdate() {
    const { cards } = this.state;
    const setCards = JSON.stringify(cards);
    localStorage.setItem('saveCards', setCards);
  }

  funcitionInicial = () => {
    const getCards = localStorage.getItem('saveCards');
    const objetoRecuperado = JSON.parse(getCards);
    this.setState(() => ({
      cards: objetoRecuperado,
    }));
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
    const descriptionMax = 220;

    const check01 = name === '' || description === '' || image === '';
    const check02 = attr1 + attr2 + attr3 > attrSumMax;
    const check03 = attr1 > attrLimit || attr2 > attrLimit || attr3 > attrLimit;
    const check04 = attr1 < 0 || attr2 < 0 || attr3 < 0;
    const check05 = attr1 === 0 || attr2 === 0 || attr3 === 0;
    const check06 = description.length > descriptionMax;
    this.setState({
      isSaveButtonDisabled:
        check01
        || check02
        || check03 || check04 || check05 || check06,
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
        ...prevState.cards,
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

  render() {
    const {
      name, description, attr01, attr02,
      attr03, image, rare, filter,
      rarityFilter, trunfo, hasTrunfo, isSaveButtonDisabled,
      isFiltering, trunfoFilter, cards, filters,
    } = this.state;

    return (
      <>
        <h1>League of Trunfo</h1>
        <main className="container-formCard">
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
        </main>
        <Filter
          filter={ filter }
          rarityFilter={ rarityFilter }
          isFiltering={ isFiltering }
          trunfoFilter={ trunfoFilter }
          cards={ cards }
          filters={ filters }
          onInputChange={ this.handleValue }
          onDeleteButtonClick={ this.handleDeleteButton }
        />
      </>
    );
  }
}

export default App;
