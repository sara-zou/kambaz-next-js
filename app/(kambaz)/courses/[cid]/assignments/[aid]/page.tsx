"use client"
import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import FormControl from "react-bootstrap/esm/FormControl";
import { FormCheck, FormLabel, FormSelect } from "react-bootstrap";
import { useParams } from "next/navigation";
import Link from "next/link";
import * as db from "../../../../database";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignments = db.assignments;
  
  const assignment = assignments.find((a: any) => a._id === aid);

  if (!assignment) {
    return <div>Assignment not found</div>;
  }

  return (
    <div id="wd-assignments-editor">
      <FormLabel>Assignment Name</FormLabel>
      <FormControl type="text" defaultValue={assignment.title} />
      
      <FormControl 
        as="textarea"
        style={{ height: "200px" }}
        defaultValue="The assignment is available online, submit a link to the landing page of your web application."
      />
      
      <div className="float-end">
        <Row>
          <Col sm={10}>
            <FormLabel column sm={2}> Points </FormLabel>
            <FormControl type="number" defaultValue="100" />
          </Col>
        </Row>
                
        <Row>
          <Col sm={10}>
            <FormLabel column sm={2}> Assignment Group </FormLabel>
            <FormSelect>
              <option value="0" defaultChecked>Assignments</option>
              <option value="1">Quizzes</option>
              <option value="2">Exams</option>
            </FormSelect>
          </Col>
        </Row>

        <Row>
          <Col sm={10}>
            <FormLabel column sm={2}> Display Grades as </FormLabel>
            <FormSelect>
              <option value="0" defaultChecked>Percentage</option>
              <option value="1">Points</option>
              <option value="2">Letter Grade</option>
            </FormSelect>
          </Col>
        </Row>

        <Row>
          <Col sm={10}>
            <FormLabel column sm={2}> Submission Type </FormLabel>
            <FormSelect>
              <option value="0" defaultChecked>Online</option>
              <option value="1">Paper</option>
            </FormSelect>
            <FormLabel column sm={2}> Online Entry Options </FormLabel>
            <FormCheck type="switch" defaultChecked={false} label="Text Entry"/>
            <FormCheck type="switch" defaultChecked={true} label="Website URL"/>
            <FormCheck type="switch" defaultChecked={false} label="Media Recordings"/>
            <FormCheck type="switch" defaultChecked={false} label="Student Annotations"/>
            <FormCheck type="switch" defaultChecked={false} label="File Uploads"/>
          </Col>
        </Row>

        <FormLabel column sm={2}> Assign to </FormLabel>
        <FormControl type="text" defaultValue="Everyone"/>
       
        <Row>
          <Col sm={2}>
            <FormLabel column sm={2}> Due </FormLabel>
            <FormControl type="date" defaultValue="2024-05-13"/>
          </Col>
        </Row>

        <Row>
          <Col sm={2}>
            <FormLabel column sm={2}> Available From </FormLabel>
            <FormControl type="date" defaultValue="2024-05-06"/>
          </Col>
        </Row>

        <Row>
          <Col sm={2}>
            <FormLabel column sm={2}> Until </FormLabel>
            <FormControl type="date"/>
          </Col>
        </Row>

        <Link href={`/courses/${cid}/assignments`}>
          <Button variant="danger" size="lg" className="me-1 float-end" id="wd-save-assignment">
            Save
          </Button>
        </Link>
        
        <Link href={`/courses/${cid}/assignments`}>
          <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-cancel-assignment">
            Cancel
          </Button>
        </Link>
      </div>
      <br />
    </div>
  );
}