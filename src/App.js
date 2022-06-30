import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor() {
    super();

    this.handleValue = this.handleValue.bind(this);

    this.state = {
      name: '',
      description: '',
      attr01: 0,
      attr02: 0,
      attr03: 0,
      image: '',
      rare: 'normal',
      trunfo: false,
      isSaveButtonDisabled: true,
      cards: [],
      hasTrunfo: false,
      filter: '',
    };
  }

  handleValue = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox'
      ? target.checked : target.value;
    this.setState(() => ({
      [name]: value }), this.valueChecking);
  }

  setFilterName = (event) => {
    this.setState({ filter: event.target.value });
  }

  valueChecking = () => {
    const { name,
      description,
      attr01,
      attr02,
      attr03,
      image,
      rare,
    } = this.state;
    if ((Number(attr01) + Number(attr02) + Number(attr03)) <= '210'
      && Number(attr01) <= '90'
    && Number(attr02) <= '90'
    && Number(attr03) <= '90'
    && Number(attr01) >= 0
    && Number(attr02) >= 0
    && Number(attr03) >= 0
    && name
    && description
    && image
    && rare) {
      this.setState(() => ({ isSaveButtonDisabled: false }));
    } else {
      this.setState(() => ({ isSaveButtonDisabled: true }));
    }
  }

  trunfoChecking = () => {
    const { cards } = this.state;
    const test = cards.some((arr) => arr.hasTrunfo);
    if (test === false) {
      this.setState(() => ({ hasTrunfo: true }));
    }
  }

  onSaveButtonClick = () => {
    const { name,
      description,
      attr01,
      attr02,
      attr03,
      image,
      rare,
      trunfo } = this.state;
    const newData = { name,
      description,
      attr01,
      attr02,
      attr03,
      image,
      rare,
      trunfo };

    this.setState((prevState) => ({
      name: '',
      description: '',
      attr01: 0,
      attr02: 0,
      attr03: 0,
      image: '',
      rare: 'normal',
      hasTrunfo: false,
      cards: [...prevState.cards, newData] }), this.trunfoChecking);
  }

  render() {
    const { name,
      description,
      attr01,
      attr02,
      attr03,
      image,
      rare,
      trunfo,
      isSaveButtonDisabled,
      cards,
      hasTrunfo,
      filter } = this.state;
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
        />
        <div>
          <input
            data-testid="name-filter"
            type="text"
            placeholder="Digite uma carta"
            onChange={ this.setFilterName }
          />
          <div>
            {cards.filter((card) => card.name.includes(filter))
              .map((card) => (
                <div key={ card.name }>
                  <Card
                    cardName={ card.name }
                    cardDescription={ card.description }
                    cardAttr1={ card.attr01 }
                    cardAttr2={ card.attr02 }
                    cardAttr3={ card.attr03 }
                    cardImage={ card.image }
                    cardRare={ card.rare }
                    cardTrunfo={ card.trunfo }
                  />
                  <button
                    data-testid="delete-button"
                    type="button"
                  >
                    Excluir
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
