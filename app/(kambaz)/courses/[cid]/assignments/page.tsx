"use client"
import Link from "next/link";
import AssignmentsControls from "./AssignmentsControl";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "../modules/LessonControlButtons";
import AssignmentsControlButtons from "./AssignmentsControlButtons";
import { useParams } from "next/navigation";
import * as db from "../../../database";
import React from "react";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;

  return (
    <div>
      <AssignmentsControls /><br /><br /><br /><br />
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary"> 
            <BsGripVertical className="me-2 fs-3" /> Assignments <AssignmentsControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            {assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
                <ListGroupItem key={assignment._id} className="wd-lesson p-3 ps-1">
                  <BsGripVertical className="me-2 fs-3" />  
                  <Link 
                    href={`/courses/${cid}/assignments/${assignment._id}`}>
                    {assignment.title}
                  </Link>
                  <LessonControlButtons />
                  <p className="wd-assignment-subtext">
                    Multiple Modules | Not Available until May 6 at 12:00pm
                  </p>
                  <p className="wd-assignment-subtext">
                    Due May 13 at 11:59pm | 100 pts
                  </p>
                </ListGroupItem>
              ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}