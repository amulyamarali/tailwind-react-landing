import React from 'react'
import Rating from './Rating'
import blog1 from '../assets/blog-1.png'
import { Link } from 'react-router-dom';
import { DataProvider, useData } from './dataContext';
import notes from '../assets/notes-removebg-preview.png'
const courseData = {
  id: 0,
  title: "",
  category: "",
  rating: 0,
  price: [],
  linkImg: ""
};

const CourseCard = ({ key, id, title, desc, tags, color , linkImg}) => {

  const { setData } = useData();
  const handleClick = () => {
    const data = {
      key, id, title, desc, tags, color
    };
    setData(data);

  };
  ///TODO : use context api to push data with field name
  return (
    <DataProvider>
      <Link to={{ pathname: "/template", state: { value: {key, id, title, desc, color, tags} } }} className='bg-white drop-shadow-md overflow-hidden my-4 mr-2 w-[30%]' onClick={handleClick}>
        <img src={notes} alt="courses" className='h-40 w-full object-cover' />
        <div className='p-5'>
          <h1 className='py-2 truncate'>{title}</h1>
        </div>
        {tags.map((pr) => (
          <h3 key={pr} className='p-5 text-xl bottom-0' style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '25px', width: "100px" }}>{pr}</h3>
        ))}
        <div className='absolute top-0 bg-white m-3 px-2 py-[2.5px] rounded font-bold'>
          {desc}
        </div>
      </Link>
    </DataProvider>
  )
}

export default CourseCard
