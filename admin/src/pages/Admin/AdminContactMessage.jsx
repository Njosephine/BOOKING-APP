import React, { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';

const AdminContactMessages = () => {
  const { messages, fetchMessages } = useContext(AdminContext); 


  useEffect(() => {
    const loadMessages = async () => {
      try {
        await fetchMessages(); 
      } catch (err) {
        setError("Failed to fetch messages");
      } finally {
        setLoading(false); 
      }
    };

    loadMessages();
  }, [fetchMessages]); 

  return (
    <div className="p-4">
      <h2 className="text-2xl  mb-4">MESSAGES</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-2 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Message</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(messages) && messages.length > 0 ? (
            messages.map((msg) => (
              <tr key={msg._id}>
                <td className="border border-gray-300 px-4 py-2">{msg.name}</td>
                <td className="border border-gray-300 px-4 py-2">{msg.email}</td>
                <td className="border border-gray-300 px-4 py-2">{msg.message}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(msg.createdAt).toLocaleString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="border border-gray-300 px-4 py-2 text-center">No messages available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminContactMessages;
