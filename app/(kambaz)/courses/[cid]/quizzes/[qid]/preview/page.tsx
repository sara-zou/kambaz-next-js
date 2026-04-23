"use client";
import React, { useEffect, useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import * as client from "../../../../client";

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const [quiz, setQuiz] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      const data = await client.findQuizById(qid as string);
      setQuiz(data);
    };
    fetchQuiz();
  }, [qid]);

  const saveAnswer = (questionId: string, answer: any) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const calculateScore = () => {
    let total = 0;
    quiz.questions.forEach((q: any) => {
      const answer = answers[q._id];
      if (q.type === "multiple_choice") {
        const correctChoice = q.choices.find((c: any) => c.isCorrect);
        if (correctChoice && answer === correctChoice.text) total += q.points;
      } else if (q.type === "true_false") {
        if (answer === q.correctAnswer) total += q.points;
      } else if (q.type === "fill_in_blank") {
        const correct = q.blanks.some(
          (b: string) => b.toLowerCase() === answer?.toLowerCase()
        );
        if (correct) total += q.points;
      }
    });
    return total;
  };

  const onSubmit = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setSubmitted(true);
  };

  if (!quiz) return;
  if (quiz.questions.length === 0)
    return (
      <div className="p-3">
        <p>This quiz has no questions yet</p>
        <Button variant="secondary"
          onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/questions`)}>
          Keep Editing This Quiz
        </Button>
      </div>
    );

  const currentQuestion = quiz.questions[currentIndex];
  const totalPoints = quiz.questions.reduce(
    (sum: number, q: any) => sum + q.points, 0
  );

  if (submitted) {
    return (
      <div className="p-3">
        <div className="mb-3">
          This is a preview of the published version of the quiz.
        </div>
        <h4>{quiz.title}</h4>
        <h5 className="mb-4">
          Score: {score} / {totalPoints}
        </h5>

        {quiz.questions.map((q: any, index: number) => {
          const answer = answers[q._id];
          let isCorrect = false;
          if (q.type === "multiple_choice") {
            const correctChoice = q.choices.find((c: any) => c.isCorrect);
            isCorrect = correctChoice && answer === correctChoice.text;
          } else if (q.type === "true_false") {
            isCorrect = answer === q.correctAnswer;
          } else if (q.type === "fill_in_blank") {
            isCorrect = q.blanks.some(
              (b: string) => b.toLowerCase() === answer?.toLowerCase()
            );
          }

          return (
            <div
              key={q._id}
              className={`border p-3 mb-3 ${
                isCorrect ? "border-success" : "border-danger"
              }`}>
              <div className="d-flex justify-content-between">
                <span className="fw-bold">Question {index + 1}: {q.question}</span>
                <span>{isCorrect ? "✅" : "❌"} {q.points} pts</span>
              </div>
              <div className="mt-2 text-muted">
                Your answer: {answer?.toString() ?? "No answer"}
              </div>
            </div>
          );
        })}

        <div className="d-flex gap-2 mt-3">
          <Button variant="secondary"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/questions`)}>
            Keep Editing This Quiz
          </Button>
          <Button variant="danger"
            onClick={() => {
              setSubmitted(false);
              setAnswers({});
              setCurrentIndex(0);
              setScore(0);
            }}>
            Retake Preview
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3">

      <h4 className="mb-3">{quiz.title}</h4>

      <div className="border p-3 mb-3">
        <div className="d-flex justify-content-between mb-2">
          <span className="fw-bold">Question {currentIndex + 1}</span>
          <span>{currentQuestion.points} pts</span>
        </div>
        <p>{currentQuestion.question}</p>

        {currentQuestion.type === "multiple_choice" && (
          <div>
            {currentQuestion.choices.map((choice: any) => (
              <div key={choice._id} className="d-flex align-items-center gap-2 mb-2">
                <input
                  type="radio"
                  name={`answer-${currentQuestion._id}`}
                  checked={answers[currentQuestion._id] === choice.text}
                  onChange={() => saveAnswer(currentQuestion._id, choice.text)}/>
                <label>{choice.text}</label>
              </div>
            ))}
          </div>
        )}

        {currentQuestion.type === "true_false" && (
          <div>
            <div className="d-flex align-items-center gap-2 mb-2">
              <input
                type="radio"
                name={`answer-${currentQuestion._id}`}
                checked={answers[currentQuestion._id] === true}
                onChange={() => saveAnswer(currentQuestion._id, true)}/>
              <label>True</label>
            </div>
            <div className="d-flex align-items-center gap-2 mb-2">
              <input
                type="radio"
                name={`answer-${currentQuestion._id}`}
                checked={answers[currentQuestion._id] === false}
                onChange={() => saveAnswer(currentQuestion._id, false)}/>
              <label>False</label>
            </div>
          </div>
        )}

        {currentQuestion.type === "fill_in_blank" && (
          <FormControl
            placeholder="Type your answer here"
            value={answers[currentQuestion._id] || ""}
            onChange={(e) => saveAnswer(currentQuestion._id, e.target.value)}/>
        )}
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button
          variant="secondary"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex(currentIndex - 1)}>
          Back
        </Button>

        <div className="d-flex gap-1">
          {quiz.questions.map((_: any, i: number) => (
            <Button
              key={i}
              variant={i === currentIndex ? "danger" : "outline-secondary"}
              onClick={() => setCurrentIndex(i)}>
              {i + 1}
            </Button>
          ))}
        </div>

        {currentIndex < quiz.questions.length - 1 ? (
          <Button
            variant="secondary"
            onClick={() => setCurrentIndex(currentIndex + 1)}>
            Next
          </Button>
        ) : (
          <Button variant="danger" onClick={onSubmit}>
            Submit Quiz
          </Button>
        )}
      </div>

      <hr />
      <Button variant="secondary"
        onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/questions`)}>
        Keep Editing This Quiz
      </Button>
    </div>
  );
}