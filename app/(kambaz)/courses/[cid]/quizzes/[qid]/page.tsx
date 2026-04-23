"use client";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import * as client from "../../../client";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  

  const fetchQuiz = async () => {
    const data = await client.findQuizById(qid as string);
    setQuiz(data);
  };

  useEffect(() => {
    fetchQuiz();
  }, [qid]);

  const onPublishToggle = async () => {
    await client.publishQuiz(qid as string, !quiz.published);
    setQuiz({ ...quiz, published: !quiz.published });
  };

  if (!quiz) return;

  return (
    <div id="wd-quiz-details" >

      <div className="wd-top-buttons">
        <Button
          variant={quiz.published ? "success" : "secondary"}
          onClick={onPublishToggle}>
          {quiz.published ? "Published" : "Unpublished"}
        </Button>
        <Button
          variant="secondary"
          onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/preview`)}>
          Preview
        </Button>
        <Button
          variant="secondary"
          onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/editor`)}>
        Edit
        </Button>
      </div>

      <hr />

      <h2>{quiz.title}</h2>

      <hr />
      
      <table className="table">
        <tbody>
          <tr>
            <td><b>Quiz Type</b></td>
            <td>{quiz.quizType}</td>
          </tr>
          <tr>
            <td><b>Points</b></td>
            <td>{quiz.points ?? 0}</td>
          </tr>
          <tr>
            <td><b>Assignment Group</b></td>
            <td>{quiz.assignmentGroup}</td>
          </tr>
          <tr>
            <td><b>Shuffle Answers</b></td>
            <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td><b>Time Limit</b></td>
            <td>{quiz.timeLimitEnabled ? `${quiz.timeLimit} Minutes` : "No Limit"}</td>
          </tr>
          <tr>
            <td><b>Multiple Attempts</b></td>
            <td>{quiz.multipleAttempts ? "Yes" : "No"}</td>
          </tr>
          {quiz.multipleAttempts && (
            <tr>
              <td><b>How Many Attempts</b></td>
              <td>{quiz.howManyAttempts}</td>
            </tr>)}
          <tr>
            <td><b>Show Correct Answers</b></td>
            <td>{quiz.showCorrectAnswers}</td>
          </tr>
          <tr>
            <td><b>Access Code</b></td>
            <td>{quiz.accessCode || "None"}</td>
          </tr>
          <tr>
            <td><b>One Question at a Time</b></td>
            <td>{quiz.oneQuestionAtATime ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td><b>Webcam Required</b></td>
            <td>{quiz.webcamRequired ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td><b>Lock Questions After Answering</b></td>
            <td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
          </tr>
        </tbody>
      </table>

      <hr />

      <table className="table w-50">
        <thead>
          <tr>
            <th>Due</th>
            <th>For</th>
            <th>Available From</th>
            <th>Until</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {quiz.dueDate
                ? new Date(quiz.dueDate).toLocaleDateString("en-US", {
                    month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
                  })
                : "-"}
            </td>
            <td>Everyone</td>
            <td>
              {quiz.availableDate
                ? new Date(quiz.availableDate).toLocaleDateString("en-US", {
                    month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
                  })
                : "-"}
            </td>
            <td>
              {quiz.availableUntilDate
                ? new Date(quiz.availableUntilDate).toLocaleDateString("en-US", {
                    month: "short", day: "numeric", hour: "numeric", minute: "2-digit",
                  })
                : "-"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}