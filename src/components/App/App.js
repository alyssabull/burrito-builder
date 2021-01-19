import React, { Component } from 'react';
import './App.css';
import { getOrders, postNewOrder, deleteOrder } from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: []
    }
  }

  componentDidMount() {
    getOrders()
      .then(orders => this.setState({orders: orders.orders}))
      .catch(err => console.error('Error fetching:', err));
  }

  updateOrders = (newOrder) => {
    postNewOrder(newOrder)
    .then(data => this.setState([...this.state.orders, data]))
    .catch(error => console.log(error))  
  }

  deleteOrder = (id) => {
    deleteOrder(id)
    .then(data => console.log(data))
    .catch(error => console.log(error))
    this.componentDidMount()
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm 
            updateOrders={this.updateOrders}
          />
        </header>

        <Orders 
          orders={this.state.orders}
          deleteOrder={this.deleteOrder}
        />
      </main>
    );
  }
}


export default App;
