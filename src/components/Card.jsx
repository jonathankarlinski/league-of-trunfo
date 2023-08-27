import React from 'react';
import PropTypes from 'prop-types';
import '../style/Card.css';
import trash from '../assets/trash.svg';
import iconChamp from '../assets/iconChamp.svg';
import iconSilver from '../assets/iconSilver.png';
import iconPlatinum from '../assets/iconPlatinum.svg';
import iconChallenger from '../assets/iconChallenger.svg';
import trunfoOn from '../assets/trunfoOn.png';
import trunfoOff from '../assets/trunfoOff.png';

class Card extends React.Component {
  iconRare = () => {
    const { cardRare } = this.props;
    if (cardRare === 'normal') {
      return iconSilver;
    } if (cardRare === 'raro') {
      return iconPlatinum;
    }
    return iconChallenger;
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
      isAListCard,
      onDeleteButtonClick,
    } = this.props;

    return (
      <div className="container-card">
        <div className="container-card-top">
          <div className="container-card-top-rare">
            <img src={ this.iconRare() } alt="icon da raridade" />
            <p data-testid="rare-card">{ cardRare }</p>
          </div>
          <h2
            data-testid="name-card"
          >
            { `${!cardName ? 'Nome do Campeão' : cardName}` }
          </h2>
          <img
            className="container-card-top-img"
            data-testid="trunfo-card"
            src={ cardTrunfo === true ? trunfoOn : trunfoOff }
            alt="ícone de trunfo "
          />
        </div>
        <img
          data-testid="image-card"
          src={ !cardImage ? iconChamp : cardImage }
          alt={ `imagem da carta ${cardName}` }
          className="container-card-img"
        />
        <div className="container-card-attr">
          <p data-testid="attr1-card">
            Ataque
            <span>
              { cardAttr1 }
            </span>
          </p>
          <p data-testid="attr2-card">
            Estratégia
            <span>
              { cardAttr2 }
            </span>
          </p>
          <p data-testid="attr3-card">
            Defesa
            <span>
              { cardAttr3 }
            </span>
          </p>
        </div>
        <p
          data-testid="description-card"
          className="container-card-description"
        >
          { cardDescription }
        </p>
        {isAListCard && (
          <button
            type="button"
            id={ cardName }
            onClick={ onDeleteButtonClick }
            data-testid="delete-button"
          >
            <img src={ trash } alt="ícone de lixo" />
          </button>
        )}
      </div>
    );
  }
}

Card.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  isAListCard: PropTypes.bool.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
};

export default Card;
