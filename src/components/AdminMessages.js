import React, { useEffect, useState } from 'react';
import './AdminMessages.css';
import Header from './Header';
const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

 
  useEffect(() => {
    fetch("http://localhost:8000/admin/contacts")
      .then(response => response.json())
      .then(data => setMessages(data))
      .catch(err => setError('Failed to load messages'));
  }, []);

  const deleteMessage = (id) => {
    fetch(`http://localhost:8000/admin/contacts/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setMessages(messages.filter(msg => msg.id !== id));
        } else {
          setError('Failed to delete the message');
        }
      })
      .catch(err => setError('Failed to delete the message'));
  };

  return (
    <div className='SuperDiv'>
    <Header className="headerOtherC" />
    <div className="admin-messages-container">
      <div className="admin-messages-content">
        <h1 className="admin-messages-title">Admin Messages</h1>
        {error && <p className="admin-messages-error">{error}</p>}
        <table className="admin-messages-table">
          <thead>
            <tr className="admin-messages-table-header">
              <th className="admin-messages-table-header-cell">Username</th>
              <th className="admin-messages-table-header-cell">Email</th>
              <th className="admin-messages-table-header-cell">Subject</th>
              <th className="admin-messages-table-header-cell">Message</th>
              <th className="admin-messages-table-header-cell">Action</th>
            </tr>
          </thead>
          <tbody>
            {messages.map(msg => (
              <tr key={msg.id} className="admin-messages-table-row">
                <td className="admin-messages-table-cell">{msg.username}</td>
                <td className="admin-messages-table-cell">{msg.email}</td>
                <td className="admin-messages-table-cell">{msg.subject}</td>
                <td className="admin-messages-table-cell">{msg.message}</td>
                <td className="admin-messages-table-cell">
                  <button
                    className="admin-messages-delete-button"
                    onClick={() => deleteMessage(msg.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
};

export default AdminMessages;
