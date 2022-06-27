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
      attr01: '',
      attr02: '',
      attr03: '',
      image: '',
      rare: 'normal',
      trunfo: false,
      isSaveButtonDisabled: true,
    };
  }

  handleValue = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox'
      ? target.checked : target.value;
    this.setState(() => ({
      [name]: value }), this.valueChecking);
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

  render() {
    const { name,
      description,
      attr01,
      attr02,
      attr03,
      image,
      rare,
      trunfo,
      isSaveButtonDisabled } = this.state;
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
          onInputChange={ this.handleValue }
          isSaveButtonDisabled={ isSaveButtonDisabled }
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
      </div>
    );
  }
}

export default App;
