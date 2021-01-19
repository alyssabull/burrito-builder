import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import App from './App.js';
import { getOrders, postNewOrder } from '../../apiCalls.js';
jest.mock('../../apiCalls.js')

describe('App', () => {
  let sampleOrders;
  let newOrder;
  let updatedSampleOrders;

  beforeEach(() => {
    sampleOrders = {orders: [{
      id: 1,
      name: 'Pat',
      ingredients: ['beans', 'lettuce', 'carnitas', 'queso fresco', 'jalapeno']
    }, {
      id: 2,
      name: 'Alyssa',
      ingredients: ['steak', 'lettuce', 'sour cream', 'guacamole', 'jalapeno']
    }]}

    newOrder = {
      id: 3,
      name: 'Kara',
      ingredients: ['carnitas', 'pico de gallo', 'guacamole']
    }

    updatedSampleOrders = {orders: [{
      id: 1,
      name: 'Pat',
      ingredients: ['beans', 'lettuce', 'carnitas', 'queso fresco', 'jalapeno']
    }, {
      id: 2,
      name: 'Alyssa',
      ingredients: ['steak', 'lettuce', 'sour cream', 'guacamole', 'jalapeno']
    }, {
      id: 3,
      name: 'Kara',
      ingredients: ['carnitas', 'pico de gallo', 'guacamole']
    }]}

    getOrders.mockResolvedValueOnce(sampleOrders)
    postNewOrder.mockResolvedValueOnce(newOrder)
    getOrders.mockResolvedValueOnce(updatedSampleOrders)

    render(
      <App />
    )
  })

  it('should render correctly', () => {
    const title = screen.getByText('Burrito Builder')
    const nameInput = screen.getByPlaceholderText('Name')
    const beansButton = screen.getByTestId('beans')
    const quesoFrescoButton = screen.getByTestId('queso fresco')
    const sourCreamButton = screen.getByTestId('sour cream')
    const submitButton = screen.getByText('Submit Order')
    const orderName1 = screen.getByText('Pat')
    const orderName2 = screen.getByText('Alyssa')
    const orderIngredient1 = screen.getAllByText('carnitas')
    const orderIngredient2 = screen.getAllByText('steak')
    const orderIngredient3 = screen.getAllByText('beans')

    expect(title).toBeInTheDocument()
    expect(nameInput).toBeInTheDocument()
    expect(beansButton).toBeInTheDocument()
    expect(quesoFrescoButton).toBeInTheDocument()
    expect(sourCreamButton).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
    expect(orderName1).toBeInTheDocument()
    expect(orderName2).toBeInTheDocument()
    expect(orderIngredient1).toHaveLength(2)
    expect(orderIngredient2).toHaveLength(2)
    expect(orderIngredient3).toHaveLength(2)
  })
  it('should be able to add a new order', async () => {
    const nameInput = screen.getByPlaceholderText('Name')
    userEvent.type(nameInput, 'Kara')

    const carnitasButton = screen.getByTestId('carnitas')
    const picoDeGalloButton = screen.getByTestId('pico de gallo')
    const gucamoleButton = screen.getByTestId('guacamole')

    userEvent.click(carnitasButton)
    userEvent.click(picoDeGalloButton)
    userEvent.click(gucamoleButton)

    const submitButton = screen.getByText('Submit Order')
    userEvent.click(submitButton)

    const newOrderName = await waitFor(() => screen.getByText('Kara'))
    const newOrderIngredient = await waitFor(() => screen.getAllByText('carnitas'))
    
    expect(newOrderName).toBeInTheDocument()
    expect(newOrderIngredient).toHaveLength(3)
  })
})