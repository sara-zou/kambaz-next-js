"use client";
import React, { useEffect, useState } from "react";
import { Button, FormControl, FormLabel, FormSelect, Nav } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import * as client from "../../../../client";
import { useDispatch } from "react-redux";
import { updateQuiz } from "../../reducer";

export default function QuestionsEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [originalQuestion, setOriginalQuestion] = useState<any>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      const data = await client.findQuizById(qid as string);
      setQuestions(data.questions || []);
    };
    fetchQuiz();
  }, [qid]);

  const addQuestion = () => {
    const newQuestion = {
      _id: Date.now().toString(),
      type: "multiple_choice",
      title: "New Question",
      question: "",
      points: 1,
      choices: [
        { _id: "c1", text: "", isCorrect: true },
        { _id: "c2", text: "", isCorrect: false },
      ],
      correctAnswer: true,
      blanks: [""],
    };
    setQuestions([...questions, newQuestion]);
    setEditingId(newQuestion._id);
  };

  const updateQuestion = (id: string, updates: any) => {
    setQuestions(questions.map((q) => (q._id === id ? { ...q, ...updates } : q)));
  };

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q._id !== id));
  };

  const onSave = async () => {
    await client.saveQuestions(qid as string, questions);
    dispatch(updateQuiz({ _id: qid, questions }));
    router.push(`/courses/${cid}/quizzes/${qid}`);
  };

  const onSaveAndPublish = async () => {
    await client.saveQuestions(qid as string, questions);
    await client.publishQuiz(qid as string, true);
    dispatch(updateQuiz({ _id: qid, questions, published: true }));
    router.push(`/courses/${cid}/quizzes`);
  };

const startEditing = (q: any) => {
    setOriginalQuestion(JSON.parse(JSON.stringify(q)));
    setEditingId(q._id);
  };
  
  const cancelEditing = () => {
    if (originalQuestion) {
      setQuestions(questions.map((q) =>
        q._id === originalQuestion._id ? originalQuestion : q
      ));
    }
    setEditingId(null);
    setOriginalQuestion(null);
  };
  
  const saveQuestion = () => {
    setEditingId(null);
    setOriginalQuestion(null);
  };

  return (
    <div className="p-3">
      <Nav variant="tabs">
        <Nav.Item>
          <Nav.Link onClick={() =>
            router.push(`/courses/${cid}/quizzes/${qid}/editor`)}>
            Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active>Questions</Nav.Link>
        </Nav.Item>
      </Nav>

      {questions.map((q, index) => (
        <div key={q._id} className="border mb-3 p-3">
          {editingId === q._id ? (
            <div>
              <div className="d-flex gap-2 mb-3 align-items-center">
                <FormControl
                  value={q.title}
                  onChange={(e) => updateQuestion(q._id, { title: e.target.value })}
                  placeholder="Question Title"/>

                <FormSelect
                  value={q.type}
                  onChange={(e) => updateQuestion(q._id, { type: e.target.value })}>

                  <option value="multiple_choice">Multiple Choice</option>
                  <option value="true_false">True/False</option>
                  <option value="fill_in_blank">Fill in the Blank</option>
                </FormSelect>
                <div className="d-flex align-items-center gap-1">
                  <FormLabel>pts:</FormLabel>
                  <FormControl
                    type="number"
                    value={q.points}
                    onChange={(e) =>
                      updateQuestion(q._id, { points: Number(e.target.value) })}/>

                </div>
              </div>

              <FormLabel>Question</FormLabel>
              <FormControl
                as="textarea"
                className="mb-3"
                value={q.question}
                onChange={(e) => updateQuestion(q._id, { question: e.target.value })}/>

              {q.type === "multiple_choice" && (
                <div>
                  <FormLabel>Answers</FormLabel>
                  {q.choices.map((choice: any, i: number) => (
                    <div key={choice._id} className="d-flex align-items-center gap-2 mb-2">
                      <input
                        type="radio"
                        name={`correct-${q._id}`}
                        checked={choice.isCorrect}
                        onChange={() =>
                          updateQuestion(q._id, {
                            choices: q.choices.map((c: any, ci: number) => ({
                              ...c,
                              isCorrect: ci === i,
                            })),
                          })}
                        title="Mark as correct"/>

                      <FormControl
                        value={choice.text}
                        placeholder={`Choice ${i + 1}`}
                        onChange={(e) =>
                          updateQuestion(q._id, {
                            choices: q.choices.map((c: any, ci: number) =>
                              ci === i ? { ...c, text: e.target.value } : c),})}/>
                      <Button
                        variant="danger"
                        onClick={() =>
                          updateQuestion(q._id, {
                            choices: q.choices.filter((_: any, ci: number) => ci !== i),
                          })}>
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="secondary"
                    onClick={() =>
                      updateQuestion(q._id, {
                        choices: [
                          ...q.choices,
                          { _id: Date.now().toString(), text: "", isCorrect: false },
                        ],})}>
                    Add Choice
                  </Button>
                </div>
              )}

              {q.type === "true_false" && (
                <div>
                  <FormLabel>Correct Answer</FormLabel>
                  <div className="d-flex gap-3">
                    <label className="d-flex align-items-center">
                      <input
                        type="radio"
                        checked={q.correctAnswer === true}
                        onChange={() => updateQuestion(q._id, { correctAnswer: true })}/>
                      True
                    </label>
                    <label className="d-flex align-items-center">
                      <input
                        type="radio"
                        checked={q.correctAnswer === false}
                        onChange={() => updateQuestion(q._id, { correctAnswer: false })}/>
                      False
                    </label>
                  </div>
                </div>
              )}

              {q.type === "fill_in_blank" && (
                <div>
                  <FormLabel>Possible Correct Answers</FormLabel>
                  {q.blanks.map((blank: string, i: number) => (
                    <div key={i} className="d-flex gap-2 mb-2">
                      <FormControl
                        value={blank}
                        placeholder={`Answer ${i + 1}`}
                        onChange={(e) =>
                          updateQuestion(q._id, {
                            blanks: q.blanks.map((b: string, bi: number) =>
                              bi === i ? e.target.value : b
                            ),})}/>

                      <Button
                        variant="danger"
                        onClick={() =>
                          updateQuestion(q._id, {
                            blanks: q.blanks.filter((_: string, bi: number) => bi !== i),
                          })}>
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="secondary"
                    onClick={() =>
                      updateQuestion(q._id, { blanks: [...q.blanks, ""] })
                    }>
                    Add Answer
                  </Button>
                </div>
              )}

              <div className="d-flex gap-2 mt-3">
                <Button variant="secondary" 
                  onClick={() => cancelEditing()}>
                  Cancel
                </Button>
                <Button variant="danger" 
                  onClick={() => saveQuestion()}>
                  Update Question
                </Button>
              </div>
            </div>
          ) : (

            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="fw-bold me-2">Question {index + 1}:</span>
                <span className="me-2">{q.title}</span>
                <span className="text-muted">({q.type.replace(/_/g, " ")}) — {q.points} pts</span>
              </div>
              <div className="d-flex gap-2">
                <Button variant="secondary"
                  onClick={() => startEditing(q)}>
                  Edit
                </Button>
                <Button variant="danger" 
                  onClick={() => deleteQuestion(q._id)}>
                  Delete
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}

      <Button variant="secondary" className="mb-4" onClick={addQuestion}>
        New Question
      </Button>

      <hr />

      <div className="d-flex gap-2">
        <Button variant="secondary"
          onClick={() => router.push(`/courses/${cid}/quizzes`)}>
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