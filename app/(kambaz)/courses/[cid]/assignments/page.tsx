"use client";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import AssignmentsControls from "./AssignmentsControl";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "../modules/LessonControlButtons";
import AssignmentsControlButtons from "./AssignmentsControlButtons";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import * as client from "../../client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import {
  setAssignments,
  addAssignment,
  updateAssignment,
  deleteAssignment,
} from "./reducer";

export default function Assignments() {
  const params = useParams<{ cid: string }>();
  const cid = params.cid;
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer
  );
  const dispatch = useDispatch();
  const onCreateAssignmentForCourse = async () => {
    if (!cid) return;
    const newAssignment = { title: assignmentTitle, course: cid };
    const assignment = await client.createAssignmentForCourse(cid, newAssignment);
    dispatch(setAssignments([...assignments, assignment]));
  };

  const fetchAssignments = async () => {
    const modules = await client.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(modules));
  };

  const onRemoveAssignment = async (assignmentId: string) => {
    await client.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId)); 
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const isFaculty = currentUser && (currentUser as any).role === "FACULTY";

  return (
    <div>
      <AssignmentsControls
        assignmentTitle={assignmentTitle}
        setAssignmentTitle={setAssignmentTitle}
        addAssignment={onCreateAssignmentForCourse}
      />
      <br /><br /><br /><br />

      <ListGroup id="wd-modules" className="rounded-0">
        {assignments
          .map((assignment: any) => (
            <ListGroupItem
              key={assignment._id}
              className="wd-module p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />

                {!assignment.editing && assignment.title}

                {assignment.editing && (
                  <FormControl
                    className="w-50 d-inline-block"
                    onChange={(e) =>
                      dispatch(
                        updateAssignment({ ...assignment, title: e.target.value })
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        dispatch(updateAssignment({ ...assignment, editing: false }));
                      }
                    }}
                    defaultValue={assignment.title}
                  />
                )}

                {isFaculty && <AssignmentsControlButtons
                  assignmentId={assignment._id}
                  deleteAssignment={(assignmentId) => onRemoveAssignment(assignmentId)
                  }
                />}
                
              </div>

              {assignment.modules && (
                <ListGroup className="wd-lessons rounded-0">
                  {assignment.modules.map((mod: any) => (
                    <ListGroupItem key={mod._id} className="wd-lesson p-3 ps-1">
                      <BsGripVertical className="me-2 fs-3" />
                      {mod.name}
                      <LessonControlButtons />
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}