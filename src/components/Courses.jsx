import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { courses } from "../data/courses";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

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
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
    ],
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("title");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesCollection = collection(db, "User1");
        const coursesSnapshot = await getDocs(coursesCollection);
        const coursesData = coursesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    return (
      (searchBy === "title" &&
        course.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (searchBy === "tags" &&
        course.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ))
    );
  });

  return (
    <section className="w-full bg-white py-24 p-4">
      <div className="md:max-w-[1100px] m-auto max-w-[400px]">
        <h1 className="py-4 text-3xl font-bold">
          Note Store<span className="text-[#20B486]"> Atlas</span>
        </h1>
        <div className="border-y-2 border-slate-300 p-4 flex justify-center items-center gap-5">
          <div className="flex justify-center items-center gap-4">
            <CiSearch />
            <input
              type="text"
              placeholder="Search by title or tags"
              value={searchTerm}
              className="p-2 "
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
            className="p-2 px-5 rounded-md "
          >
            <option value="title">Title</option>
            <option value="tags">Tags</option>
          </select>
        </div>
      </div>
      <div className="md:max-w-[1100px] m-auto max-w-[400px] gap-5">
        <div className="md:max-w-[1100px] m-auto max-w-[400px] gap-5 flex flex-row flex-wrap justify-center items-center">
          {filteredCourses &&
            filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                desc={course.desc}
                tags={course.tags}
                color={course.color}
                link={course.linkImg}
              />
            ))}
        </div>
      </div>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpBlWuPOE_ZTcTUrjThhV9yrRa3yQ8ngNF5R2X9vi13JQvOG_O8FRv8XT9lkpd4CkSplU&usqp=CAU"
        alt="description"
        style={{
          position: "absolute",
          top: "30px",
          right: "30px",
          width: "70px",
          height: "70px",
        }}
      />
      <h2 style={{ position: "absolute", top: "100px", right: "30px" }}>
        Points Collected 5
      </h2>
    </section>
  );
};

export default Courses;
