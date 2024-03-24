// import React from 'react';
// import { useLocation } from 'react-router-dom';

// function Template() {
//   console.log("Template component rendered");
//   const location = useLocation();
//   const data = location.state;
//   console.log("location", location);

//   return (
//     <div>
//       <h2>Template Component</h2>
//       {data ? (
//         <p>State value: {data}</p>
//       ) : (
//         <p>State is not defined</p>
//       )}
//     </div>
//   );
// }

// export default Template;

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useData } from './dataContext'; // Import the useData hook
import Markdown from 'react-markdown';
import { db } from '../../firebase';
import { collection, getDocs, updateDoc, addDoc, doc, serverTimestamp } from 'firebase/firestore';

const Template = () => {
  const [inputValue, setInputValue] = React.useState('bruh');
  const [editMode, setEditMode] = React.useState(false);
  const location = useLocation();
  console.log('location', location); // Add this line

  const { data } = useData(); // Get the data from the context

  useEffect(() => {
    // Perform any action you need to with the data
    console.log('Data from context:', data.title);
    console.log('here-->',data.desc);
    setInputValue(data.desc);
  }, [data]);

  const handleSaveClick = async () => {
    try {
      if (!data) {
        console.error('No data available to save');
        return;
      }
  
      const timestamp = serverTimestamp();
      // Use addDoc without specifying the document ID
      await addDoc(collection(db, "User1"), {
        title: data.title,
        desc: inputValue,
        tags: data.tags,
        color: data.color,
        timestamp: timestamp,
      });
      console.log("Note added successfully");
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <h1 style={{ fontWeight: 'bold', fontSize: '3em' }}>{data.title}</h1>
      <div className='flex flex-col justify-center items-center gap-5'>
      {
        editMode ? (
          <textarea
          value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ width: '100%', height: '300px' }}
            className='text-black'
            />
        ) : (
          <div className='w-[200px] h-[200px] text-black'>
            <Markdown>{inputValue}</Markdown>
          </div>
        )
      }
            <div className='bg-green-500'>
  <button onClick={() => setEditMode(!editMode)} style={{ marginLeft: '20px' }}> {editMode ? 'Preview' : 'Edit'}</button>
  <button onClick={handleSaveClick} className='p-2' style={{ marginLeft: '20px' }}>Save</button>
</div>

      </div>
    </div>
  );
};

export default Template;
