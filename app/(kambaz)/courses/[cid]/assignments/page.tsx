import Link from "next/link";
import AssignmentsControls from "./AssignmentsControl";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "../modules/LessonControlButtons";
import ModuleControlButtons from "../modules/ModuleControlButtons";
import AssignmentsControlButtons from "./AssignmentsControlButtons";

export default function Assignments() {
    return (
<div>
  <AssignmentsControls /><br /><br /><br /><br />
  <ListGroup className="rounded-0" id="wd-modules">
    <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
      <div className="wd-title p-3 ps-2 bg-secondary"> 
      <BsGripVertical className="me-2 fs-3" /> Assignments <AssignmentsControlButtons /> </div>
      <ListGroup className="wd-lessons rounded-0">
        <ListGroupItem className="wd-lesson p-3 ps-1">
        <BsGripVertical className="me-2 fs-3" />  
        <Link href="/courses/1234/assignments/123" className="wd-assignment-link"> A1 </Link>
         <LessonControlButtons />
        <p className="wd-assignment-subtext">Multiple Modules | Not Available until May 6 at 12:00pm</p>
        <p className="wd-assignment-subtext">Due May 13 at 11:59 pm | 100 pts</p>
        </ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
        <BsGripVertical className="me-2 fs-3" />  
        <Link href="/courses/1234/assignments/123" className="wd-assignment-link"> A2 </Link>
         <LessonControlButtons />
        <p className="wd-assignment-subtext">Multiple Modules | Not Available until May 13 at 12:00pm</p>
        <p className="wd-assignment-subtext">Due May 21 at 11:59 pm | 100 pts</p>
        </ListGroupItem>
        <ListGroupItem className="wd-lesson p-3 ps-1">
        <BsGripVertical className="me-2 fs-3" />  
        <Link href="/courses/1234/assignments/123" className="wd-assignment-link"> A3 </Link>
         <LessonControlButtons />
        <p className="wd-assignment-subtext">Multiple Modules | Not Available until May 21 at 12:00pm</p>
        <p className="wd-assignment-subtext">Due May 27 at 11:59 pm | 100 pts</p>
        </ListGroupItem>
      </ListGroup>
    </ListGroupItem>
  </ListGroup>
</div>
   );}
   