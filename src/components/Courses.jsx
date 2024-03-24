import React from 'react'
import CourseCard from './CourseCard'
import { courses } from '../data/courses'
import Slider from 'react-slick'
import { Link } from 'react-router-dom';

const Courses = () => {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          infinite: false,
          dots: true
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true
        }
      },
    ]
  }



  return (
    <section className='w-full bg-white py-24 p-4'>
      <div className='md:max-w-[1100px] m-auto max-w-[400px]'>
        <h1 className='py-4 text-3xl font-bold'>Note Store<span className='text-[#20B486]'> Atlas</span></h1>
        <p className='text-[#6D737A] py-3' style={{ backgroundColor: '#90EE90', borderRadius: '10px', textAlign: 'center' }}>Here are your notes</p>
      </div>
      <div className='md:max-w-[1100px] m-auto max-w-[400px] gap-5'>
        <div className='md:max-w-[1100px] m-auto max-w-[400px] gap-5 flex flex-row flex-wrap justify-center items-center'>
          {courses && courses.map((course) => (
              <CourseCard key={course.id} id={course.id} title={course.title} desc={course.desc} tags={course.tags} color={course.color} link={course.linkImg} />
          ))}
        </div>
      </div>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpBlWuPOE_ZTcTUrjThhV9yrRa3yQ8ngNF5R2X9vi13JQvOG_O8FRv8XT9lkpd4CkSplU&usqp=CAU" alt="description" style={{ position: 'absolute', top: '30px', right: '30px', width: '70px', height: '70px' }} />
      <h2 style={{ position: 'absolute', top: '100px', right: '30px' }}>Points Collected 5</h2> 

    </section>
  )
}

export default Courses