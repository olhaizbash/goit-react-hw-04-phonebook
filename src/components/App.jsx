import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import './App.module.css';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = data => {
    const nameData = data.name;
    const cont = [...contacts];
    if (cont.filter(contact => contact.name === nameData).length > 0) {
      window.alert(`${data.name} is already in contacts`);
      return;
    }
    setContacts(prevState => [data, ...prevState]);
  };

  const filterChange = e => {
    console.log(e.currentTarget.value);
    setFilter(e.currentTarget.value);
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const normalize = filter.toLowerCase();
  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalize)
  );
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmitHandler} />
      <Filter value={filter} onChange={filterChange} />
      <h2>Contacts</h2>
      <ContactList items={visibleContacts} onDelete={deleteContact} />
    </div>
  );
}
