import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useData } from './dataContext'; // Import the useData hook
import Markdown from 'react-markdown';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Template = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tags, setTags] = useState([]);
  const [color, setColor] = useState('');
  const [editMode, setEditMode] = useState(true); // Initially set to edit mode
  const location = useLocation();
  const { data } = useData(); // Get the data from the context

  useEffect(() => {
    if (data) {
      setTitle(data.title || '');
      setDesc(data.desc || '');
      setTags(data.tags || []);
      setColor(data.color || '');
    }
  }, [data]);

  const handleSaveClick = async () => {
    try {
      const timestamp = serverTimestamp();
      await addDoc(collection(db, 'User1'), {
        title,
        desc,
        tags,
        color,
        timestamp,
      });
      console.log('Note added successfully');
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center w-full gap-8'>
      <div className='font-bold text-3xl text-gray-700'>Title:</div>
      <input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className='border-2 border-gray-300 rounded-md p-2 w-80 text-lg focus:outline-none focus:border-blue-500'
      />
      <div className='font-bold text-3xl text-gray-700'>Description:</div>
      {editMode ? (
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder='Start Editing (Markdown Enabled)'
          className='border-2 border-gray-300 rounded-md p-2 w-96 h-60 text-lg focus:outline-none focus:border-blue-500'
        />
      ) : (
        <div className='w-96 h-60'>
          <Markdown>{desc}</Markdown>
        </div>
      )}
      <button
        onClick={() => setEditMode(!editMode)}
        className='bg-blue-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-blue-600 focus:outline-none'
      >
        {editMode ? 'Preview' : 'Edit'}
      </button>
      <div className='font-bold text-3xl text-gray-700'>Tags:</div>
      <ul>
        {tags.map((tag, index) => (
          <li key={index}>
            <input
              type='text'
              value={tag}
              onChange={(e) => {
                const newTags = [...tags];
                newTags[index] = e.target.value;
                setTags(newTags);
              }}
              className='border-2 border-gray-300 rounded-md p-2 w-80 text-lg focus:outline-none focus:border-blue-500'
            />
          </li>
        ))}
      </ul>
      <div className='font-bold text-3xl text-gray-700'>Color:</div>
      <input
        type='text'
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className='border-2 border-gray-300 rounded-md p-2 w-80 text-lg focus:outline-none focus:border-blue-500'
      />
      <button
        onClick={handleSaveClick}
        className='bg-green-500 text-white px-4 py-2 rounded-md transition duration-300 hover:bg-green-600 focus:outline-none'
      >
        Save
      </button>
    </div>
  );
};

export default Template;
