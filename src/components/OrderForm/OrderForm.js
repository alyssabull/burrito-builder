import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: []
    };
  }

  handleIngredientChange = e => {
    e.preventDefault();
    const checkIngredientList = this.state.ingredients.filter(ingredient => {
      return ingredient === e.target.name
    })
    if (checkIngredientList.length < 2) {
      this.setState({ingredients: [...this.state.ingredients, e.target.name]})
    }
  }

  handleNameChange = e => {
    e.preventDefault();
    this.setState({name: e.target.value})
  }

  handleSubmit = e => {
    if (this.state.name !== '' && this.state.ingredients.length > 0) {
      const newOrder = {
        name: this.state.name,
        ingredients: this.state.ingredients
      }
      this.props.updateOrders(newOrder)
    } else {
      alert('Please enter a name and choose at least one ingredient!')
    }
    this.clearInputs();
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  ingredientButtons = () => {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    return possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} data-testid={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });
  }
  

  render() {
    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { this.ingredientButtons() }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>

        <button onClick={e => this.handleSubmit(e)} >
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
