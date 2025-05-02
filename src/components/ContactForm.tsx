import React, { useState } from 'react';
import { Tutor } from '../types';

interface ContactFormProps {
  tutor: Tutor;
  onSubmit: (message: string) => void;
  onCancel: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ tutor, onSubmit, onCancel }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSubmit(message);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Отправить сообщение {tutor.name}</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full border rounded p-2 mb-4"
          rows={5}
          placeholder="Введите ваше сообщение"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={onCancel}
          >
            Отмена
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={!message.trim()}
          >
            Отправить
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
