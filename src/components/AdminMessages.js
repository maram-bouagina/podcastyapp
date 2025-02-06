import React, { useEffect, useState } from 'react';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  // Fetch messages from the backend
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
    <div>
      <h1>Admin Messages</h1>
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {messages.map(msg => (
            <tr key={msg.id}>
              <td>{msg.username}</td>
              <td>{msg.email}</td>
              <td>{msg.subject}</td>
              <td>{msg.message}</td>
              <td>
                <button onClick={() => deleteMessage(msg.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMessages;
