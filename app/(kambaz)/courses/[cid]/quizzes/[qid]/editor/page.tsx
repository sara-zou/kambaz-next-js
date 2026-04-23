"use client";
import React, { useEffect, useState } from "react";
import { Button, Col, FormCheck, FormControl, 
         FormLabel, FormSelect, Nav, Row, Tab } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import * as client from "../../../../client";
import { useDispatch } from "react-redux";
import { updateQuiz } from "../../reducer";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const [quiz, setQuiz] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("details");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quizType, setQuizType] = useState("Graded Quiz");
  const [assignmentGroup, setAssignmentGroup] = useState("Quizzes");
  const [points, setPoints] = useState(0);
  const [shuffleAnswers, setShuffleAnswers] = useState(true);
  const [timeLimitEnabled, setTimeLimitEnabled] = useState(true);
  const [timeLimit, setTimeLimit] = useState(20);
  const [multipleAttempts, setMultipleAttempts] = useState(false);
  const [howManyAttempts, setHowManyAttempts] = useState(1);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState("Immediately");
  const [accessCode, setAccessCode] = useState("");
  const [oneQuestionAtATime, setOneQuestionAtATime] = useState(true);
  const [webcamRequired, setWebcamRequired] = useState(false);
  const [lockQuestionsAfterAnswering, setLockQuestionsAfterAnswering] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [availableDate, setAvailableDate] = useState("");
  const [availableUntilDate, setAvailableUntilDate] = useState("");

  const fetchQuiz = async () => {
    const data = await client.findQuizById(qid as string);
    setQuiz(data);
    setTitle(data.title || "");
    setDescription(data.description || "");
    setQuizType(data.quizType || "Graded Quiz");
    setAssignmentGroup(data.assignmentGroup || "Quizzes");
    setPoints(data.points || 0);
    setShuffleAnswers(data.shuffleAnswers ?? true);
    setTimeLimitEnabled(data.timeLimitEnabled ?? true);
    setTimeLimit(data.timeLimit || 20);
    setMultipleAttempts(data.multipleAttempts ?? false);
    setHowManyAttempts(data.howManyAttempts || 1);
    setShowCorrectAnswers(data.showCorrectAnswers || "Immediately");
    setAccessCode(data.accessCode || "");
    setOneQuestionAtATime(data.oneQuestionAtATime ?? true);
    setWebcamRequired(data.webcamRequired ?? false);
    setLockQuestionsAfterAnswering(data.lockQuestionsAfterAnswering ?? false);
    setDueDate(data.dueDate ? data.dueDate.substring(0, 10) : "");
    setAvailableDate(data.availableDate ? data.availableDate.substring(0, 10) : "");
    setAvailableUntilDate(data.availableUntilDate ? data.availableUntilDate.substring(0, 10) : "");
  };

  useEffect(() => {
    fetchQuiz();
  }, [qid]);

  const buildUpdatedQuiz = () => ({
    ...quiz,
    title,
    description,
    quizType,
    assignmentGroup,
    points,
    shuffleAnswers,
    timeLimitEnabled,
    timeLimit,
    multipleAttempts,
    howManyAttempts,
    showCorrectAnswers,
    accessCode,
    oneQuestionAtATime,
    webcamRequired,
    lockQuestionsAfterAnswering,
    dueDate: dueDate || null,
    availableDate: availableDate || null,
    availableUntilDate: availableUntilDate || null,
  });

  const onSave = async () => {
    const updated = buildUpdatedQuiz();
    await client.updateQuiz(updated);
    dispatch(updateQuiz(updated));
    router.push(`/courses/${cid}/quizzes/${qid}`);
  };

  const onSaveAndPublish = async () => {
    const updated = { ...buildUpdatedQuiz(), published: true };
    await client.updateQuiz(updated);
    await client.publishQuiz(qid as string, true);
    dispatch(updateQuiz(updated));
    router.push(`/courses/${cid}/quizzes`);
  };

  const onCancel = () => {
    router.push(`/courses/${cid}/quizzes`);
  };

  if (!quiz) return;

  return (
    <div id="wd-quiz-editor">

      <Nav variant="tabs">
        <Nav.Item>
          <Nav.Link
            active={activeTab === "details"}
            onClick={() => setActiveTab("details")}>
            Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            active={activeTab === "questions"}
            onClick={() => {
              router.push(`/courses/${cid}/quizzes/${qid}/questions`);
            }}>
            Questions
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <FormLabel>Title</FormLabel>
      <FormControl
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}/>

      <FormLabel>Quiz Instructions</FormLabel>
      <FormControl
        as="textarea"
        value={description}
        onChange={(e) => setDescription(e.target.value)}/>

      <Row>
        <Col sm={3} className="text-end">
          <FormLabel>Quiz Type</FormLabel>
        </Col>
        <Col sm={6}>
          <FormSelect
            value={quizType}
            onChange={(e) => setQuizType(e.target.value)}>
            <option>Graded Quiz</option>
            <option>Practice Quiz</option>
            <option>Graded Survey</option>
            <option>Ungraded Survey</option>
          </FormSelect>
        </Col>
      </Row>

      <Row>
        <Col sm={3} className="text-end">
          <FormLabel>Assignment Group</FormLabel>
        </Col>
        <Col sm={6}>
          <FormSelect
            value={assignmentGroup}
            onChange={(e) => setAssignmentGroup(e.target.value)}>
            <option>Quizzes</option>
            <option>Exams</option>
            <option>Assignments</option>
            <option>Project</option>
          </FormSelect>
        </Col>
      </Row>

      <Row>
  <Col sm={3} className="text-end">
    <FormLabel>Points</FormLabel>
  </Col>
  <Col sm={6}>
    <FormControl
      type="number"
      value={points}
      onChange={(e) => setPoints(Number(e.target.value))}/>
  </Col>
</Row>
      <Row>
        <Col sm={3} className="text-end">
          <FormLabel>Options</FormLabel>
        </Col>
        <Col sm={6}>
          <FormCheck
            type="checkbox"
            label="Shuffle Answers"
            checked={shuffleAnswers}
            onChange={(e) => setShuffleAnswers(e.target.checked)}/>

          <div>
            <FormCheck
              type="checkbox"
              label="Time Limit"
              checked={timeLimitEnabled}
              onChange={(e) => setTimeLimitEnabled(e.target.checked)}/>
            {timeLimitEnabled && (
              <>
                <FormControl
                  type="number"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(Number(e.target.value))}
                  style={{ width: "80px" }}/>
                <span>Minutes</span>
              </>
            )}
          </div>

          <FormCheck
            type="checkbox"
            label="Allow Multiple Attempts"
            checked={multipleAttempts}
            onChange={(e) => setMultipleAttempts(e.target.checked)}/>
          {multipleAttempts && (
            <Row>
              <Col sm={6}>
                <FormLabel>How Many Attempts</FormLabel>
                <FormControl
                  type="number"
                  value={howManyAttempts}
                  onChange={(e) => setHowManyAttempts(Number(e.target.value))}/>
              </Col>
            </Row>
          )}
        </Col>
      </Row>

      <Row>
        <Col sm={3}>
          <FormLabel>Show Correct Answers</FormLabel>
        </Col>
        <Col sm={6}>
          <FormSelect
            value={showCorrectAnswers}
            onChange={(e) => setShowCorrectAnswers(e.target.value)}>
            <option>Immediately</option>
            <option>After Due Date</option>
            <option>Never</option>
          </FormSelect>
        </Col>
      </Row>

      <Row >
        <Col sm={3}>
          <FormLabel>Access Code</FormLabel>
        </Col>
        <Col sm={6}>
          <FormControl
            type="text"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            placeholder="Leave blank for no access code"/>
        </Col>
      </Row>

      <Row>
        <Col sm={3}>
          <FormLabel>One Question at a Time</FormLabel>
        </Col>
        <Col sm={6}>
          <FormCheck
            type="checkbox"
            checked={oneQuestionAtATime}
            onChange={(e) => setOneQuestionAtATime(e.target.checked)}/>
        </Col>
      </Row>

      <Row>
        <Col sm={3}>
          <FormLabel>Webcam Required</FormLabel>
        </Col>
        <Col sm={6}>
          <FormCheck
            type="checkbox"
            checked={webcamRequired}
            onChange={(e) => setWebcamRequired(e.target.checked)}/>
        </Col>
      </Row>

      <Row>
        <Col sm={3}>
          <FormLabel>Lock Questions After Answering</FormLabel>
        </Col>
        <Col sm={6}>
          <FormCheck
            type="checkbox"
            checked={lockQuestionsAfterAnswering}
            onChange={(e) => setLockQuestionsAfterAnswering(e.target.checked)}/>
        </Col>
      </Row>

      <hr />

      <Row>
        <Col sm={3}>
          <FormLabel>Due Date</FormLabel>
        </Col>
        <Col sm={6}>
          <FormControl
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}/>
        </Col>
      </Row>

      <Row>
        <Col sm={3}>
          <FormLabel>Available From</FormLabel>
        </Col>
        <Col sm={6}>
          <FormControl
            type="date"
            value={availableDate}
            onChange={(e) => setAvailableDate(e.target.value)}/>
        </Col>
      </Row>

      <Row>
        <Col sm={3}>
          <FormLabel>Until</FormLabel>
        </Col>
        <Col sm={6}>
          <FormControl
            type="date"
            value={availableUntilDate}
            onChange={(e) => setAvailableUntilDate(e.target.value)}/>
        </Col>
      </Row>

      <hr />

      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="secondary" onClick={onSaveAndPublish}>
          Save & Publish
        </Button>
        <Button variant="danger" onClick={onSave}>
          Save
        </Button>
      </div>
    </div>
  );
}