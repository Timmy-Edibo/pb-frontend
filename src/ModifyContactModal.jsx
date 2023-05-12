import React, { useEffect, useState } from "react";

const ModifyContactModal = ({action, setShowContactModal, contact, getAllContacts}) => {
    const [ selectedContact, setSelectedContact ] = useState(
        contact?
        contact: 
        {
          firstname: '',
          lastname: '',
          phone_number: '',
        }
    );

    const createContact = (contact) => {
        setShowContactModal(false);
        console.log('Started creating contact');
        fetch(`https://phonebook-backend-production-a67d.up.railway.app/api/v1/phonebook/create`,
            {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(contact)
            }
        )
          .then(response => response.json())
          .then(contacts => {
            getAllContacts()
          })
          .catch(err => console.log(err))
    }

    const editContact = (contact) => {
        setShowContactModal(false);
        fetch(`https://phonebook-backend-production-a67d.up.railway.app/api/v1/phonebook/update/${contact.id}`,
            {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(contact)
            }
        )
          .then(response => response.json())
          .then(contacts => {
            getAllContacts();
          })
          .catch(err => console.log(err))
    }

    return (
        <div className='absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-gray-800 bg-opacity-40'>
            <div className="w-full max-w-3xl bg-white shadow px-6 py-4 rounded-md">
                <h3 className='text-[#0EA5E9] font-semibold text-2xl capitalize'>{action} Contact</h3>
                <form className="py-6 flex flex-col gap-5">
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='firstName' className='text-stone-500 text-lg font-semibold'>First Name</label>
                        <input
                            value={selectedContact.firstname}
                            onChange={(e) => setSelectedContact(contact => ({...contact, firstname: e.target.value}))}
                            className='border p-3 rounded-md focus:border-[#4fbef1] focus:shadow-md focus:outline-none'
                            name='firstName' id='firstName' type='text' placeholder='Type here...'
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='lastName' className='text-stone-500 text-lg font-semibold'>Last Name</label>
                        <input
                            value={selectedContact.lastname}
                            onChange={(e) => setSelectedContact(contact => ({...contact, lastname: e.target.value}))}
                            className='border p-3 rounded-md focus:border-[#4fbef1] focus:shadow-md focus:outline-none'
                            name='lastName' id='lastName' type='text' placeholder='Type here...'
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='phoneNumber' className='text-stone-500 text-lg font-semibold'>Phone Number</label>
                        <input
                            value={selectedContact.phone_number}
                            onChange={(e) => setSelectedContact(contact => ({...contact, phone_number: e.target.value}))}
                            className='border p-3 rounded-md focus:border-[#4fbef1] focus:shadow-md focus:outline-none'
                            name='phoneNumber' id='phoneNumber' type='number' placeholder='Type here...'
                        />
                    </div>
                    <div className='flex justify-center gap-6 pt-6'>
                        <button onClick={() => setShowContactModal(false)} type='button' className='w-full max-w-[250px] rounded-lg border p-2 text-red-500 border-red-500 hover:text-white hover:bg-red-500 font-semibold'>Cancel</button>
                        {
                            action === 'create'?
                            <button onClick={() => createContact(selectedContact)} type='button' className='w-full max-w-[250px] rounded-lg border p-2 text-[#4fbef1] border-[#4fbef1] hover:text-white hover:bg-[#4fbef1] font-semibold'>Submit</button>
                            :
                            <button onClick={() => editContact(selectedContact)} type='button' className='w-full max-w-[250px] rounded-lg border p-2 text-[#4fbef1] border-[#4fbef1] hover:text-white hover:bg-[#4fbef1] font-semibold'>Submit</button>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
};

export default ModifyContactModal;