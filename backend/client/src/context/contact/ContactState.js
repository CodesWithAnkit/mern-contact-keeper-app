import React, { useReducer } from 'react'
import { v4 } from 'uuid'
import ContactContext from './contactContext'
import contactReducer from './contactReducer'
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  CLEAR_FILTER,
  FILTER_CONTACTS,
} from '../types'

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: 'Ankit',
        email: 'ankit@gmail.fo',
        phone: '111-111-111',
        type: 'personal',
      },
      {
        id: 2,
        name: 'Ankit',
        email: 'ankit@gmail.fo',
        phone: '111-111-111',
        type: 'personal',
      },
      {
        id: 3,
        name: 'Ankit',
        email: 'ankit@gmail.fo',
        phone: '111-111-111',
        type: 'professional',
      },
    ],
    current: null,
    filtered: null,
  }

  const [state, dispatch] = useReducer(contactReducer, initialState)

  //  Add contact
  const addContact = (contact) => {
    contact.id = v4()
    dispatch({ type: ADD_CONTACT, payload: contact })
  }

  // delete contact

  const deletContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id })
  }

  // set Current contact
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact })
  }

  // clear current contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT })
  }

  // Update contact

  const updateContact = (contact) => {
    dispatch({ type: UPDATE_CONTACT, payload: contact })
  }

  // Filter contacts
  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text })
  }

  // clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER })
  }

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deletContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  )
}

export default ContactState
