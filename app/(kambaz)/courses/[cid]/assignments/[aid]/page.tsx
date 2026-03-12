"use client";
import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import FormControl from "react-bootstrap/esm/FormControl";
import { FormCheck, FormLabel, FormSelect } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { addAssignment, updateAssignment } from "../reducer";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer);

  const assignment = assignments.find((a: any) => a._id === aid);

  const [title, setTitle] = useState(assignment?.title || "");
  const [description, setDescription] = useState(
    assignment?.description ||
      "The assignment is available online, submit a link to the landing page of your web application.");
  const [points, setPoints] = useState(assignment?.points || 100);
  const [dueDate, setDueDate] = useState(assignment?.dueDate || "2024-05-13");
  const [availableFrom, setAvailableFrom] = useState(
    assignment?.availableFrom || "2024-05-06");
  const [availableUntil, setAvailableUntil] = useState(
    assignment?.availableUntil || "");

  const saveAssignment = () => {
    const updatedAssignment = {
      _id: aid,
      title,
      description,
      points,
      dueDate,
      availableFrom,
      availableUntil,
      course: cid,
    };

    if (assignment) {
      dispatch(updateAssignment(updatedAssignment));
    } else {
      dispatch(addAssignment(updatedAssignment));
    }

    router.push(`/courses/${cid}/assignments`);
  };

  return (
    <div id="wd-assignments-editor">
      <FormLabel>Assignment Name</FormLabel>
      <FormControl
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}/>

      <FormControl
        as="textarea"
        style={{ height: "200px" }}
        value={description}
        onChange={(e) => setDescription(e.target.value)}/>

      <div className="float-end">
        <Row>
          <Col sm={10}>
            <FormLabel column sm={2}>Points</FormLabel>
            <FormControl
              type="number"
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
            />
          </Col>
        </Row>

        <Row>
          <Col sm={10}>
            <FormLabel column sm={2}>Assignment Group</FormLabel>
            <FormSelect>
              <option>Assignments</option>
              <option>Quizzes</option>
              <option>Exams</option>
            </FormSelect>
          </Col>
        </Row>

        <Row>
          <Col sm={10}>
            <FormLabel column sm={2}>Display Grades as</FormLabel>
            <FormSelect>
              <option>Percentage</option>
              <option>Points</option>
              <option>Letter Grade</option>
            </FormSelect>
          </Col>
        </Row>

        <Row>
          <Col sm={10}>
            <FormLabel column sm={2}>Submission Type</FormLabel>
            <FormSelect>
              <option>Online</option>
              <option>Paper</option>
            </FormSelect>

            <FormLabel column sm={2}>Online Entry Options</FormLabel>
            <FormCheck type="switch" label="Text Entry" />
            <FormCheck type="switch" defaultChecked label="Website URL" />
            <FormCheck type="switch" label="Media Recordings" />
            <FormCheck type="switch" label="Student Annotations" />
            <FormCheck type="switch" label="File Uploads" />
          </Col>
        </Row>

        <FormLabel column sm={2}>Assign to</FormLabel>
        <FormControl type="text" defaultValue="Everyone" />

        <Row>
          <Col sm={2}>
            <FormLabel column sm={2}>Due</FormLabel>
            <FormControl
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}/>
          </Col>
        </Row>

        <Row>
          <Col sm={2}>
            <FormLabel column sm={2}>Available From</FormLabel>
            <FormControl
              type="date"
              value={availableFrom}
              onChange={(e) => setAvailableFrom(e.target.value)}/>
          </Col>
        </Row>

        <Row>
          <Col sm={2}>
            <FormLabel column sm={2}>Until</FormLabel>
            <FormControl
              type="date"
              value={availableUntil}
              onChange={(e) => setAvailableUntil(e.target.value)}/>
          </Col>
        </Row>

        <Button
          variant="danger"
          size="lg"
          className="me-1 float-end"
          id="wd-save-assignment"
          onClick={saveAssignment}>
          Save
        </Button>

        <Button
          variant="secondary"
          size="lg"
          className="me-1 float-end"
          onClick={() => router.push(`/courses/${cid}/assignments`)}>
          Cancel
        </Button>

      </div>
      <br />
    </div>
  );
}