import React from 'react';

class Form extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="name">
          <input data-testid="name-input" type="text" name="name" id="name" />
        </label>
        <label htmlFor="description">
          <input
            data-testid="description-input"
            type="textarea"
            name="description"
            id="description"
          />
        </label>
        <label htmlFor="attr01">
          <input data-testid="attr1-input" type="number" name="attr01" id="attr01" />
        </label>
        <label htmlFor="attr02">
          <input data-testid="attr2-input" type="text" name="attr02" id="attr02" />
        </label>
        <label htmlFor="attr03">
          <input data-testid="attr3-input" type="text" name="attr03" id="attr03" />
        </label>
        <label htmlFor="image">
          <input data-testid="image-input" type="text" name="image" id="image" />
        </label>
        <label htmlFor="select">
          <select data-testid="rare-input" type="select" name="select" id="select">
            <option>normal</option>
            <option>raro</option>
            <option>muito raro</option>
          </select>
        </label>
        <label htmlFor="trunfo">
          <input data-testid="trunfo-input" type="checkbox" name="trunfo" id="trunfo" />
        </label>
        <button data-testid="save-button" type="submit">Salvar</button>
      </form>
    );
  }
}

export default Form;
