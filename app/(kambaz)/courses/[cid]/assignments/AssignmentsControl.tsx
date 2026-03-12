import { Button, InputGroup, FormControl } from "react-bootstrap";
import { FaPlus, FaMagnifyingGlass } from "react-icons/fa6";
import React from "react";

interface AssignmentsControlsProps {
  assignmentTitle: string;
  setAssignmentTitle: React.Dispatch<React.SetStateAction<string>>;
  addAssignment: () => void;
}

export default function AssignmentsControls({
  assignmentTitle,
  setAssignmentTitle,
  addAssignment,
}: AssignmentsControlsProps) {
  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <Button
        variant="danger"
        size="lg"
        className="me-1 float-end"
        onClick={addAssignment}
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Assignment
      </Button>

      <InputGroup className="me-1 float-start">
        <FormControl
          placeholder="Assignment title..."
          value={assignmentTitle}
          onChange={(e) => setAssignmentTitle(e.target.value)}
        />
        <InputGroup.Text>
          <FaMagnifyingGlass />
        </InputGroup.Text>
      </InputGroup>
    </div>
  );
}