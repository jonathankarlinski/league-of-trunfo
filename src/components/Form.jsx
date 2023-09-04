import React from 'react';
import PropTypes from 'prop-types';
import '../style/Form.css';

class Form extends React.Component {
  count = () => {
    const { cardAttr1, cardAttr2, cardAttr3 } = this.props;
    const maxPoints = 210;
    const sum = maxPoints - cardAttr1 - cardAttr2 - cardAttr3;
    if (sum > 0) {
      return `${sum}`;
    }

    if (sum === 0) {
      return 'Você chegou no limite de pontos';
    }

    return 'Você passou o limite de pontos';
  }

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;

    return (
      <form className="container-form">
        <label htmlFor="name">
          Nome
          <input
            data-testid="name-input"
            type="text"
            id="name"
            value={ cardName }
            onChange={ onInputChange }
            maxLength="20"
            placeholder="Digite o nome da carta"
          />
        </label>
        <label htmlFor="description">
          Descrição
          <input
            data-testid="description-input"
            type="textarea"
            id="description"
            value={ cardDescription }
            onChange={ onInputChange }
            maxLength="320"
            placeholder="Digite a decrição da carta"
          />
        </label>
        <div className="container-form-attr">
          <label htmlFor="attr01">
            Ataque
            <input
              data-testid="attr1-input"
              type="number"
              id="attr01"
              value={ cardAttr1 }
              onChange={ onInputChange }
              min="0"
              max="90"
            />
          </label>
          <label htmlFor="attr02">
            Inteligência
            <input
              data-testid="attr2-input"
              type="number"
              id="attr02"
              value={ cardAttr2 }
              onChange={ onInputChange }
              min="0"
              max="90"
            />
          </label>
          <label htmlFor="attr03">
            Defesa
            <input
              data-testid="attr3-input"
              type="number"
              id="attr03"
              value={ cardAttr3 }
              onChange={ onInputChange }
              min="0"
              max="90"
            />
          </label>
        </div>
        <p>{`Ponto Restantes: ${this.count()}`}</p>
        <label htmlFor="image">
          Imagem
          <input
            data-testid="image-input"
            type="text"
            id="image"
            value={ cardImage }
            onChange={ onInputChange }
            placeholder="Digite a URL de imagem da carta"
          />
        </label>
        <div className="container-form-rare">
          <label htmlFor="rare">
            Raridade da Carta
            <select
              data-testid="rare-input"
              type="select"
              id="rare"
              value={ cardRare }
              onChange={ onInputChange }
            >
              <option>normal</option>
              <option>raro</option>
              <option>muito raro</option>
            </select>
          </label>
        </div>
        {hasTrunfo ? (
          <p> Você já tem um Super Trunfo em seu baralho </p>
        ) : (
          <div className="container-form-trunfo">
            <label htmlFor="trunfo">
              Super Trunfo
              <input
                data-testid="trunfo-input"
                type="checkbox"
                id="trunfo"
                checked={ cardTrunfo }
                onChange={ onInputChange }
              />
            </label>
          </div>
        )}
        <button
          data-testid="save-button"
          type="button"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
        >
          Salvar
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  hasTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
