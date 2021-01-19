import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import App from './App.js';
import { getOrders, postNewOrder } from '../../apiCalls.js';
jest.mock('../../apiCalls.js')

describe('App', () => {
  let sampleOrders;

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

    getOrders.mockResolvedValueOnce(sampleOrders)

    render(
      <App />
    )
  })

  it('should render correctly', async () => {
    
    const title = screen.getByText('Burrito Builder')
    const nameInput = screen.getByPlaceholderText('Name')
    const beansButton = screen.getByTestId('beans')
    const quesoFrescoButton = screen.getByTestId('queso fresco')
    const sourCreamButton = screen.getByTestId('sour cream')
    const submitButton = screen.getByText('Submit Order')

    expect(title).toBeInTheDocument()
    expect(nameInput).toBeInTheDocument()
    expect(beansButton).toBeInTheDocument()
    expect(quesoFrescoButton).toBeInTheDocument()
    expect(sourCreamButton).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()

    const orderName1 = await waitFor(() => screen.getByText('Pat'))
    const orderName2 = await waitFor(() => screen.getByText('Alyssa'))
    const orderIngredient1 = await waitFor(() => screen.getAllByText('carnitas'))
    const orderIngredient2 = await waitFor(() => screen.getAllByText('steak'))
    const orderIngredient3 = await waitFor(() => screen.getAllByText('beans'))

    expect(orderName1).toBeInTheDocument()
    expect(orderName2).toBeInTheDocument()
    expect(orderIngredient1).toHaveLength(2)
    expect(orderIngredient2).toHaveLength(2)
    expect(orderIngredient3).toHaveLength(2)
  })

  // it('should be able to add a new order', async () => {
  //   render(
  //     <App />
  //   )
  //   const nameInput = screen.getByPlaceholderText('Name')

  //   userEvent.type(nameInput, 'Alyssa')

  //   const carnitasButton = screen.getByText('carnitas')
  //   const picoDeGalloButton = screen.getByText('pico de gallo')
  //   const gucamoleButton = screen.getByText('guacamole')

  //   userEvent.click(carnitasButton)
  //   userEvent.click(picoDeGalloButton)
  //   userEvent.click(gucamoleButton)
  //   userEvent.click(gucamoleButton)

  //   const submitButton = screen.getByText('Submit Order')

  //   userEvent.click(submitButton)
    
  //   const newOrder = {
  //     name: 'Alyssa',
  //     ingredients: ['carnitas', 'pico de gallo', 'guacamole']
  //   }

  //   postNewOrder.mockResolvedValueOnce(newOrder)

  //   const newOrderName = await waitFor(() => screen.getByText('Alyssa'))
  //   const newOrderIngredients = await waitFor(() => screen.getByText('carnitas'))

  //   expect(newOrderName).toBeInTheDocument()
  //   expect(newOrderIngredients).toBeInTheDocument()
  // })
})