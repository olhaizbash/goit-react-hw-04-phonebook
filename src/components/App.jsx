import React from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import './App.module.css';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  formSubmitHandler = data => {
    const nameData = data.name;
    const cont = [...this.state.contacts];
    if (cont.filter(contact => contact.name === nameData).length > 0) {
      window.alert(`${data.name} is already in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [data, ...prevState.contacts],
    }));
  };

  filterChange = e => {
    console.log(e.currentTarget.value);
    this.setState({ filter: e.currentTarget.value });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const normalize = this.state.filter.toLowerCase();
    const visibleContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalize)
    );
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <Filter value={this.state.filter} onChange={this.filterChange} />
        <h2>Contacts</h2>
        <ContactList items={visibleContacts} onDelete={this.deleteContact} />
      </div>
    );
  }
}
