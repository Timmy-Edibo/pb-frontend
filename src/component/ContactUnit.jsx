import React from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { ReactComponent as BasketIcon } from '../assets/basket.svg';
import { ReactComponent as PhoneCallIcon } from '../assets/phonecall.svg';

const ContactUnit = ({ setShowContactModal, setContactModalAction, contact, setSelectedContact, getAllContacts }) => {
    const phoneNumberArray = contact.phone_number.split('');
    phoneNumberArray.splice(3, 0, '-');
    phoneNumberArray.splice(7, 0, '-');
    // Join the array back into a string
    const formattedPhoneNumber = phoneNumberArray.join('');


    const deleteContact = () => {
        fetch(`https://phonebook-backend-production-a67d.up.railway.app/api/v1/phonebook/delete/${contact.id}`,
            {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({id: contact.id})
            }
        )
          .then(response => response.json())
          .then(contacts => {
            getAllContacts();
          })
          .catch(err => console.log(err))
        getAllContacts()
    }

    return (
        <div className="w-full bg-white shadow-2xl p-4">
            <div className="flex flex-col">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl md:text-2xl font-bold text-stone-600">{contact.firstname} {contact.lastname}</h3>
                    <div className='flex gap-3' >
                        <button
                            onClick={() => { setShowContactModal(true); setContactModalAction('edit'); setSelectedContact(contact) }}
                            className="bg-blue-500 rounded-lg w-8 h-8 flex items-center justify-center">
                            <AiOutlineEdit className="w-4 h-4 text-white" />
                        </button>
                        <button
                            setShowContactModal={setShowContactModal} onClick={deleteContact}
                            className="bg-red-500 rounded-lg w-8 h-8 flex items-center justify-center ml-auto">
                            <BasketIcon className="w-4 h-4 text-white" />
                        </button>
                    </div>
                </div>
                <div className="flex items-center mb-2 text-stone-400">
                    <span className="mr-2"><PhoneCallIcon /></span>
                    <h3 className="text-gray-600">{formattedPhoneNumber}</h3>
                </div>
            </div>
        </div>
    )
}

export default ContactUnit