import React, { useReducer } from 'react'
import uuid from 'uuid'
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
  }

  const [state, dispatch] = useReducer(contactReducer, initialState)

  //  Add contact

  // delete contact

  // set Current contact

  // clear current contact

  // Update contact

  // Filter contacts

  // clear Filter

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  )
}

export default ContactState
