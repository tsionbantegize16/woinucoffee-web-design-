import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import toast, { Toaster } from 'react-hot-toast';
import { X, Mail, Calendar, User, MessageSquare } from 'lucide-react';

const Messages = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const openMessageModal = async (message) => {
    setSelectedMessage(message);
    setShowModal(true);
    // Mark as read when opening the modal
    if (!message.is_read) {
      await supabase.from('contact_messages').update({ is_read: true }).eq('id', message.id);
      fetchMessages();
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedMessage(null);
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
              <tr 
                key={msg.id} 
                className={`hover:bg-gray-50 cursor-pointer ${!msg.is_read ? 'bg-yellow-50' : ''}`}
                onClick={() => openMessageModal(msg)}
              >
                <td className="px-6 py-4 font-medium">{msg.name}</td>
                <td className="px-6 py-4">{msg.email}</td>
                <td className="px-6 py-4">{msg.subject}</td>
                <td className="px-6 py-4">{msg.message.substring(0, 50)}...</td>
                <td className="px-6 py-4 text-sm">{new Date(msg.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  {!msg.is_read ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      New
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Read
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Message Detail Modal */}
      {showModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 px-6 py-4 border-b border-amber-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-coffee-900">Message Details</h2>
                <button
                  onClick={closeModal}
                  className="p-2 rounded-lg hover:bg-amber-100 transition-colors"
                >
                  <X className="w-5 h-5 text-coffee-600" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              {/* Sender Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                  <User className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="text-sm text-gray-500">From</p>
                    <p className="font-semibold text-coffee-900">{selectedMessage.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                  <Mail className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold text-coffee-900">{selectedMessage.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="text-sm text-gray-500">Received</p>
                    <p className="font-semibold text-coffee-900">
                      {new Date(selectedMessage.created_at).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      selectedMessage.is_read 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedMessage.is_read ? 'Read' : 'New'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-coffee-900 mb-2">Subject</h3>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedMessage.subject}</p>
              </div>

              {/* Message */}
              <div>
                <h3 className="text-lg font-semibold text-coffee-900 mb-2">Message</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {selectedMessage.message}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-6 py-3 font-bold shadow-md border-2 rounded-xl transition-all hover:shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #D4A574 0%, #C19A6B 100%)',
                    color: '#FFFFFF',
                    borderColor: '#B8956A'
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
