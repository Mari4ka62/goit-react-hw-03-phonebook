import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  findContacts = e => {
    this.setState({ filter: e.currentTarget.value });
  };
  addContacts = ({ name, number }) => {
    const contact = {
      name,
      number,
      id: nanoid(3),
    };
    const duplicatedContact = this.state.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (duplicatedContact) {
      return alert(`${duplicatedContact.name} is already in contacts`);
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  render() {
    const actualContact = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    return (
      <div className="container">
        <h2 className="title">Phonebook</h2>
        <ContactForm onSubmit={this.addContacts} />

        <Filter filterData={this.state.filter} onChange={this.findContacts} />
        <h2 className="title">Contacts</h2>
        <ContactList
          contacts={actualContact}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
