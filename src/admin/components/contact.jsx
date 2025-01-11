import React, { useState } from 'react';
import { Search, Trash2, Eye, X } from "lucide-react";

const DeleteModal = ({ isOpen, onClose, onConfirm, itemName }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full mx-4">
        <h3 className="text-lg font-semibold mb-4">Confirmer la suppression</h3>
        <p className="text-gray-600 mb-6">
          Êtes-vous sûr de vouloir supprimer {itemName} ?
        </p>
        <div className="flex justify-end space-x-4">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            Annuler
          </button>
          <button 
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

const MessagePreviewModal = ({ isOpen, onClose, item, type }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {type === 'contact' ? 'Détails du message' : 'Détails de la demande'}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">De</p>
              <p className="font-medium">{item.prenom} {item.nom}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium">{item.date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{item.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Téléphone</p>
              <p className="font-medium">{item.telephone}</p>
            </div>
            {type === 'quote' && (
              <>
                <div>
                  <p className="text-sm text-gray-500">Type de service</p>
                  <p className="font-medium">{item.typePrestation}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Budget</p>
                  <p className="font-medium">{item.budget}€</p>
                </div>
              </>
            )}
          </div>
          
          <div>
            <p className="text-sm text-gray-500 mb-2">Message</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="whitespace-pre-wrap">{item.message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TableComponent = ({ data, columns, onDelete, onView }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th 
                key={column.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item[column.key]}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onDelete(item)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => onView(item)}
                    className="text-blue-600 hover:text-blue-900"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ContactManagement = () => {
  const [contacts] = useState([
    {
      id: 1,
      prenom: 'Jean',
      nom: 'Dupont',
      email: 'jean@example.com',
      telephone: '0123456789',
      message: 'Message content here\nWith multiple lines\nAnd more content',
      date: '2024-12-26'
    }
  ]);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'prenom', label: 'Prénom' },
    { key: 'nom', label: 'Nom' },
    { key: 'email', label: 'Email' },
    { key: 'telephone', label: 'Téléphone' },
    { key: 'date', label: 'Date' }
  ];

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isMessagePreviewOpen, setIsMessagePreviewOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const handleDelete = (contact) => {
    setSelectedContact(contact);
    setIsDeleteModalOpen(true);
  };

  const handleView = (contact) => {
    setSelectedContact(contact);
    setIsMessagePreviewOpen(true);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Gestion des Contacts</h2>
      <TableComponent 
        data={contacts} 
        columns={columns} 
        onDelete={handleDelete}
        onView={handleView}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          setIsDeleteModalOpen(false);
          setSelectedContact(null);
        }}
        itemName={`le message de ${selectedContact?.prenom} ${selectedContact?.nom}`}
      />
      <MessagePreviewModal
        isOpen={isMessagePreviewOpen}
        onClose={() => setIsMessagePreviewOpen(false)}
        item={selectedContact}
        type="contact"
      />
    </div>
  );
};

const QuoteManagement = () => {
  const [quotes] = useState([
    {
      id: 1,
      prenom: 'Marie',
      nom: 'Martin',
      email: 'marie@example.com',
      telephone: '0987654321',
      typePrestation: 'Consulting',
      budget: '5000-10000',
      message: 'Detailed quote request\nWith specific requirements\nAnd budget constraints',
      date: '2024-12-26'
    }
  ]);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'prenom', label: 'Prénom' },
    { key: 'nom', label: 'Nom' },
    { key: 'email', label: 'Email' },
    { key: 'telephone', label: 'Téléphone' },
    { key: 'date', label: 'Date' }
  ];

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isMessagePreviewOpen, setIsMessagePreviewOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);

  const handleDelete = (quote) => {
    setSelectedQuote(quote);
    setIsDeleteModalOpen(true);
  };

  const handleView = (quote) => {
    setSelectedQuote(quote);
    setIsMessagePreviewOpen(true);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Gestion des Devis</h2>
      <TableComponent 
        data={quotes} 
        columns={columns} 
        onDelete={handleDelete}
        onView={handleView}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          setIsDeleteModalOpen(false);
          setSelectedQuote(null);
        }}
        itemName={`la demande de ${selectedQuote?.prenom} ${selectedQuote?.nom}`}
      />
      <MessagePreviewModal
        isOpen={isMessagePreviewOpen}
        onClose={() => setIsMessagePreviewOpen(false)}
        item={selectedQuote}
        type="quote"
      />
    </div>
  );
};

const Messages = () => {
  const [activeTab, setActiveTab] = useState('contacts');

  return (
    <div className="p-6">
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`py-4 px-8 text-center border-b-2 font-medium text-sm ${
              activeTab === 'contacts'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Contacts
          </button>
          <button
            onClick={() => setActiveTab('quotes')}
            className={`py-4 px-8 text-center border-b-2 font-medium text-sm ${
              activeTab === 'quotes'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Demandes de Devis
          </button>
        </nav>
      </div>
      {activeTab === 'contacts' ? <ContactManagement /> : <QuoteManagement />}
    </div>
  );
};

export default Messages;