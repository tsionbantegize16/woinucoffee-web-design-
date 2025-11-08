import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import toast, { Toaster } from 'react-hot-toast';

const Messages = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const { data } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
    setMessages(data || []);
  };

  const markAsRead = async (id) => {
    await supabase.from('contact_messages').update({ is_read: true }).eq('id', id);
    fetchMessages();
  };

  return (
    <div className="space-y-6">
      <Toaster />
      <h1 className="text-3xl font-bold text-coffee-900">Contact Messages</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {messages.map(msg => (
              <tr key={msg.id} className={`hover:bg-gray-50 ${!msg.is_read ? 'bg-yellow-50' : ''}`}>
                <td className="px-6 py-4">{msg.name}</td>
                <td className="px-6 py-4">{msg.email}</td>
                <td className="px-6 py-4">{msg.subject}</td>
                <td className="px-6 py-4">{msg.message.substring(0, 50)}...</td>
                <td className="px-6 py-4 text-sm">{new Date(msg.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  {!msg.is_read && (
                    <button onClick={() => markAsRead(msg.id)} className="text-xs btn-primary">Mark Read</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Messages;
