"use client";
import { ReactNode } from "react";
import CourseNavigation from "./Navigation";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "../../store";
import React from "react";
import { useState } from "react";
import { FaAlignJustify } from "react-icons/fa6";
export default function CoursesLayout({ children }: { children: ReactNode }) {
 const { cid } = useParams();
 const { courses } = useSelector((state: RootState) => state.coursesReducer);
 const course = courses.find((course: any) => course._id === cid);
 const [showSidebar, setShowSidebar] = useState(true);
 return (
   <div id="wd-courses">
     <h2>
       <FaAlignJustify 
       className="me-4 fs-4 mb-1 text-danger" 
       onClick={() => setShowSidebar(!showSidebar)}/>
       {course?.name}
     </h2>
     <hr />
     <div className="d-flex">
       {showSidebar && (
  <div>
    <CourseNavigation courseId={cid as string} />
  </div>
)}
       <div className="flex-fill">{children}</div>
     </div>
   </div>
 );
}
