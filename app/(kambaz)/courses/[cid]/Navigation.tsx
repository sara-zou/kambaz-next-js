"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function CourseNavigation({ courseId }: { courseId: string }) {
  const pathname = usePathname();
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const linkPath = link === "People" 
          ? `/courses/${courseId}/people/table`
          : `/courses/${courseId}/${link.toLowerCase()}`;
        
        const isActive = pathname.includes(link.toLowerCase());
        
        return (
          <Link 
            key={link}
            href={linkPath}
            id={`wd-course-${link.toLowerCase()}-link`}
            className={`list-group-item border-0 ${isActive ? "active" : "text-danger"}`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}