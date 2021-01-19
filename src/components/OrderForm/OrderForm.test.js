import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import OrderForm from './OrderForm.js';

describe('Order Form', () => {
  let mockUpdateOrders;

  beforeEach(() => {
    mockUpdateOrders = jest.fn()
    render(
      <OrderForm 
        updateOrders={mockUpdateOrders}
      />
    )
  })

  it('should render correctly', () => {
    const nameInput = screen.getByPlaceholderText('Name')
    const beansButton = screen.getByText('beans')
    const quesoFrescoButton = screen.getByText('queso fresco')
    const sourCreamButton = screen.getByText('sour cream')
    const submitButton = screen.getByText('Submit Order')

    expect(nameInput).toBeInTheDocument()
    expect(beansButton).toBeInTheDocument()
    expect(quesoFrescoButton).toBeInTheDocument()
    expect(sourCreamButton).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })

  it('should be able to add a name to the order', () => {
    const nameInput = screen.getByPlaceholderText('Name')

    userEvent.type(nameInput, 'Alyssa')

    expect(nameInput.value).toBe('Alyssa')
  })

  it('should be able to select ingredients', () => {
    const steakButton = screen.getByText('steak')
    const lettuceButton = screen.getByText('lettuce')
    const hotsauceButton = screen.getByText('hot sauce')

    userEvent.click(steakButton)
    userEvent.click(lettuceButton)
    userEvent.click(hotsauceButton)

    const order = screen.getByText('Order: steak, lettuce, hot sauce')
    expect(order).toBeInTheDocument()
  })

  it('should not be able to select the same ingredient more than once', () => {
    const carnitasButton = screen.getByText('carnitas')
    const picoDeGalloButton = screen.getByText('pico de gallo')
    const gucamoleButton = screen.getByText('guacamole')

    userEvent.click(carnitasButton)
    userEvent.click(picoDeGalloButton)
    userEvent.click(gucamoleButton)
    userEvent.click(gucamoleButton)

    const order = screen.getByText('Order: carnitas, pico de gallo, guacamole')
    expect(order).toBeInTheDocument()
  })
})