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
    fetch('https://phonebook-backend-production-a67d.up.railway.app/api/v1/phonebook/list-all')
      .then(response => response.json())
      .then(contacts => {console.log(contacts); setContacts(contacts.data)})
      .catch(err => console.log(err))
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
        <h1 className='w-full text-2xl md:text-2xl font-bold text-stone-500 flex justify-start md:justify-center p-0 place-self-center'>Phone Book App</h1>
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
        {
          contacts && contacts.length > 0 &&
          contacts.map((contact, index) => (
            <ContactUnit
              key={index+1} contact={contact} setShowContactModal={setShowContactModal} getAllContacts={getAllContacts} 
              setContactModalAction={setContactModalAction} setSelectedContact={setSelectedContact}
            />
          ))
        }
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

// <div className="App px-5 py-2">
//   <div className='flex flex-col items-center justify-center bg-gray-100'>

//     <div className="flex items-center">
//       <PhoneBookIcon />
//       <h1 className=" text-2xl md:text-5xl font-bold ml-4">Phone Book App</h1>
//     </div>

//     <div className="my-4 w-full max-w-screen-lg text-lg font-bold">
//       <div className="flex justify-between items-center">
//         <div className="text-xl md:text-3xl font-bold">Contacts</div>
//         <div className="bg-blue-500 rounded-md px-2 md:px-4 py-2 text-white">
//           <AddButton handleAddContact={handleAddContact} />
//         </div>
//         {
//           showAddForm &&
//           <div className="fixed w-full h-full inset-0 bg-modal " >
//             <div className="bg-white rounded-2xl opacity-100 flex w-1/2 mx-auto my-28 py-10 px-10  justify-center items-center" >
//               <form htmlFor="addContact" className="flex flex-col items-center justify-center">
//                 <div className="flex flex-col ">
//                   <label htmlFor="name" className="text-blue-500">First Name</label>
//                   <input type="text" name="name" id="name" placeholder="Enter first Name" className="w-full shadow rounded-xl px-7 py-3" value={contacts.firstname} onChange={(e) => setContacts({ ...contacts, firstName: e.target.value })} />
//                 </div>
//                 <div className="flex flex-col ">
//                   <label htmlFor="name" className="text-blue-500">Last Name</label>
//                   <input type="text" name="name" id="name" placeholder="Enter individual's name" className="w-full shadow rounded-xl px-7 py-3" value={contacts.lastname} onChange={(e) => setContacts({ ...contacts, lastName: e.target.value })} />
//                 </div>
//                 <div className="flex flex-col ">
//                   <label htmlFor="phone" className="text-blue-500">Phone number</label>
//                   <input type="number" name="phone" id="phone" value={contacts.phone_number} onChange={(e) => setContacts({ ...contacts, phone_number: e.target.value })} placeholder="Enter individual's number" className=" w-full shadow rounded-xl px-7 py-3" />
//                 </div>
//                 <button onClick={() => setShowAddForm(false)} className="bg-red-500 px-5 py-2 my-5 rounded-md text-white" >Cancel </button>
//                 {
//                   isEdit ? <button onClick={closemodal} className="bg-blue-500 px-5 py-2 my-5 rounded-md text-white" >Update </button>
//                     :
//                     <button onClick={closemodal} className="bg-blue-500 px-5 py-2 my-5 rounded-md text-white" >Save </button>
//                 }
//               </form>
//             </div>
//           </div>
//         }
//       </div>
//     </div>
//     <div className="my-4 w-full max-w-screen-lg rounded-md shadow-md border-black">
//       <SearchButton
//         onChange={handleSearch}
//         value={searchValue}
//       // onClick={handleSearch} 
//       />
//     </div>
//     <div className="my-4 w-full max-w-screen-lg">
//       <Contact contacts={contacts} isEdit={isEdit} err={err} closemodal={closemodal} setIsedit={setIsedit} setContacts={setContacts} showAddForm={showAddForm} setShowAddForm={setShowAddForm} />
//     </div>

//   </div>
// </div>