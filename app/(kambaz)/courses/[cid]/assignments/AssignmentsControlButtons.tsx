"use client";

import React from "react";
import { Button } from "react-bootstrap";
import { useRouter, useParams, redirect } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

interface AssignmentsControlButtonsProps {
  assignmentId: string;
  deleteAssignment: (id: string) => void;
}

export default function AssignmentsControlButtons({

  assignmentId,
  deleteAssignment,
}: AssignmentsControlButtonsProps) {
  const router = useRouter();
  const { cid } = useParams();

  return (
    <div className="float-end">
      <Button
        variant="secondary"
        size="sm"
        className="me-1"
        onClick={() =>
          router.push(`/courses/${cid}/assignments/${assignmentId}`)
        }
      >
        Edit
      </Button>

      <Button
        variant="danger"
        size="sm"
        onClick={() => {
          if (confirm("Delete this assignment?")) {
            deleteAssignment(assignmentId);
          }
        }}
      >
        Delete
      </Button>
    </div>
  );
}