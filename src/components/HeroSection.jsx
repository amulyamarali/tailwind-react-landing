import React from 'react'
import heroImg from '../assets/atlas-logo.png'
import { AiOutlineSearch } from 'react-icons/ai'

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Courses from './Courses';




const HeroSection = () => {
    return (
        <section className='w-full bg-white py-24 p-4'>
            <div className='md:max-w-[1100px] m-auto grid md:grid-cols-2 max-w-[400px]'>
                <div className='flex flex-col justify-start gap-4'>
                    <p className='py-2 text-4xl text-[#208486] font-bold'>ATLAS 🧭</p>
                    <h1 className='md:leading-[42px] py-2 md:text-3xl text-lg font-semibold'>
                        Empowering productivity with a <span className='text-[#208486]'> frictionless  </span> <span className='text-[#208486]'>note-taking</span>  experience in your browser
                    </h1>
                    <p className='py-2 text-lg text-gray-900'>Effortless note taking experience !!!</p>
                </div>
                <img src={heroImg} alt="hero" className='md:order-last order-first' />
            </div>
            <div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Link to="/notes">
                        <span className='text-[#208486]' style={{ fontWeight: 'bold', fontSize: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
                            DASHBOARD
                        </span>
                    </Link>
                </div>

            </div>
        </section>
    )
}

export default HeroSection

