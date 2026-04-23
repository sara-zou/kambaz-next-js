import { Button, InputGroup, FormControl } from "react-bootstrap";
import { FaPlus, FaMagnifyingGlass } from "react-icons/fa6";
import React from "react";

interface QuizzesControlsProps {
  addQuiz: () => void;
  isFaculty: boolean;
}

export default function QuizzesControls({
  addQuiz,
  isFaculty,
}: QuizzesControlsProps) {
  if (!isFaculty) return null;
  return (
    <div id="wd-quizzes-controls" className="text-nowrap">
      <Button
        variant="danger"
        size="lg"
        className="me-1 float-end"
        onClick={addQuiz}
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Quiz
      </Button>

      <InputGroup className="me-1 float-start">
        <FormControl placeholder="Search for Quiz..." />
        <InputGroup.Text>
          <FaMagnifyingGlass />
        </InputGroup.Text>
      </InputGroup>
    </div>
  );
}