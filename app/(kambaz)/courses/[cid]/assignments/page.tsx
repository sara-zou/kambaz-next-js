import Link from "next/link";

export default function Assignments() {
    return (
     <div id="wd-assignments">
      <input placeholder="Search for Assignments"
             id="wd-search-assignment" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      <h3 id="wd-assignments-title">
       ASSIGNMENTS 40% of Total <button>+</button> </h3>
      <ul id="wd-assignment-list">
       <li className="wd-assignment-list-item">

        <Link href="/courses/1234/assignments/123"
              className="wd-assignment-link" >
         A1 - ENV + HTML
        </Link>
        </li>

       <li className="wd-assignment-list-item">
         <Link href="/courses/1234/assignments/123"
              className="wd-assignment-link" >
         A2 - CSS + BOOSTRAP
        </Link> 
       </li>

       <li className="wd-assignment-list-item">
         <Link href="/courses/1234/assignments/123"
              className="wd-assignment-link" >
         A3 - JAVASCRIPT + react
        </Link> 
       </li>
       
      </ul>
      <h3 id="wd-assignments-title">
       QUIZZES <button>+</button> </h3>

       <h3 id="wd-assignments-title">
       EXAMS <button>+</button> </h3>

       <h3 id="wd-assignments-title">
       PROJECTS <button>+</button> </h3>
     </div>
   );}
   