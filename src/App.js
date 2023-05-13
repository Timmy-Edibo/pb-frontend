import { useEffect, useState } from 'react';
import './component/addContact'
import AddButton from './component/addContact';
import SearchButton from './component/searchButton';
import { ReactComponent as PhoneBookIcon } from './assets/phonebook.svg';
import ContactUnit from './component/ContactUnit';
import ModifyContactModal from './ModifyContactModal';

function App(props) {
  const [searchValue, setSearchValue] = useState('');
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state


  async function handleSearch(e) {
    const searchInputValue = e.target.value;
    setSearchValue(searchInputValue);
    
    try {
      let url = 'https://phonebook-backend-production-a67d.up.railway.app/api/v1/phonebook/search';
      
      if (searchInputValue.trim() !== '') {
        url += `?lastname=${searchInputValue}`;
      }
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ lastname: searchInputValue })
      });
  
      const data = await response.json();
      setContacts(data.data);
    } catch (error) {
      console.error(error);
    }

    if (searchInputValue === '') {
      getAllContacts();
    }
  }
  

  const [showContactModal, setShowContactModal] = useState(null);
  const [contactModalAction, setContactModalAction] = useState(null);
  const [selectedContact, setSelectedContact] = useState({});

  const createContactModal = () => {
    setShowContactModal(true);
    setContactModalAction('create');
  }

  const getAllContacts = () => {
    console.log('Started fetching contacts');
    setLoading(true); // Set loading to true before fetching contacts
    
    fetch('https://phonebook-backend-production-a67d.up.railway.app/api/v1/phonebook/list-all')
      .then(response => response.json())
      .then(contacts => {
        console.log(contacts); 
        setContacts(contacts.data);
        setLoading(false); // Set loading to false after fetching contacts
      })
      .catch(err => {
        console.log(err)
        setLoading(false); // Set loading to false if there's an error
      });
  }
  useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <div className="App px-5 py-6 flex flex-col w-full items-center gap-8">
      <div className='flex items-start gap-4 py-2'>
        <div>
          <PhoneBookIcon />
        </div>
        <h1 className='w-full text-4xl md:text-4xl font-bold text-stone-500 flex justify-start md:justify-center p-0 place-self-center'>Phone Book App</h1>
      </div>

      <div className='w-full max-w-5xl py flex items-center justify-between'>
        <h2 className='text-stone-800 text-4xl font-semibold'>Contacts</h2>
        <AddButton handleAddContact={createContactModal} />
      </div>

      <div className='relative w-full max-w-5xl py flex items-center justify-between'>
        <div className='relative'>
          <button></button>
        </div>
        <div className="my-4 w-full max-w-screen-lg rounded shadow-md border-black">
          <SearchButton
            onChange={handleSearch}
            value={searchValue}
          // onClick={handleSearch} 
          />
        </div>
      </div>


<div className='w-full max-w-5xl flex flex-col divide-y-2 divide-stone-300 border-2 border-stone-300 rounded overflow-hidden'>
    {loading ? (
      <div className="flex items-center justify-center h-24">
        <span className="text-stone-800">Loading contacts...</span>
      </div>
    ) : Array.isArray(contacts) && contacts.length > 0 ? (
      contacts.map((contact, index) => (
        <ContactUnit
          key={index + 1}
          contact={contact}
          setShowContactModal={setShowContactModal}
          getAllContacts={getAllContacts}
          setContactModalAction={setContactModalAction}
          setSelectedContact={setSelectedContact}
        />
      ))
    ) : (
      <div className="flex items-center justify-center h-24">
        <span className="text-stone-800">No contacts found.</span>
      </div>
    )}
  </div>
      {
        (showContactModal && contactModalAction === 'create') &&
        <ModifyContactModal getAllContacts={getAllContacts} action='create' setShowContactModal={setShowContactModal}/>
      }
      {
        (showContactModal && contactModalAction === 'edit') &&
        <ModifyContactModal getAllContacts={getAllContacts} contact={selectedContact} action='edit' setShowContactModal={setShowContactModal}/>
      }
    </div>
  );
}

export default App;