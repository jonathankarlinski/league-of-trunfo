import React from 'react';

class Form extends React.Component {
  render() {
    const { cardName,
        cardDescription,
         cardAttr1, cardAttr2, cardAttr3, cardImage, cardRare } = this.props;
    const {cardTrunfo, hasTrunfo, isSaveButtonDisabled} = this.props;
    const { onInputChange, onSaveButtonClick } = this.props;
    return (
      <form>
        <label htmlFor="name">
          <input
            data-testid="name-input"
            type="text"
            name="name"
            id="name"
            value={ cardName }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="description">
          <input
            data-testid="description-input"
            type="textarea"
            name="description"
            id="description"
            value={ cardDescription }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="attr01">
          <input
            data-testid="attr1-input"
            type="number"
            name="attr01"
            id="attr01"
            value={ cardAttr1 }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="attr02">
          <input
            data-testid="attr2-input"
            type="number"
            name="attr02"
            id="attr02"
            value={ cardAttr2 }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="attr03">
          <input
            data-testid="attr3-input"
            type="number"
            name="attr03"
            id="attr03"
            value={ cardAttr3 }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="image">
          <input
            data-testid="image-input"
            type="text"
            name="image"
            id="image"
            value={ cardImage }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="rare">
          <select
            data-testid="rare-input"
            type="select"
            name="rare"
            id="rare"
            value={ cardRare }
            onChange={ onInputChange }
          >
            <option>normal</option>
            <option>raro</option>
            <option>muito raro</option>
          </select>
        </label>
        <label htmlFor="trunfo">
          <input
            data-testid="trunfo-input"
            type="checkbox"
            name="trunfo"
            id="trunfo"
            checked={ cardTrunfo }
            onChange={ onInputChange }
          />
        </label>
        <button
          data-testid="save-button"
          type="submit"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
        >
          Salvar
        </button>
      </form>
    );
  }
}

export default Form;
