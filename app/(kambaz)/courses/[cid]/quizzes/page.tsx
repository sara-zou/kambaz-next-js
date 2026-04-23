"use client";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { IoRocketOutline } from "react-icons/io5";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import * as client from "../../client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import { setQuizzes, addQuiz, deleteQuiz, updateQuiz } from "./reducer";
import QuizzesControls from "./QuizzesControls";
import QuizzesControlButtons from "./QuizzesControlButtons";
import { GoTriangleDown } from "react-icons/go";

export default function Quizzes() {
  const { cid } = useParams<{ cid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();

  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser && (currentUser as any).role === "FACULTY";

  const fetchQuizzes = async () => {
    const data = await client.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(data));
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  const onAddQuiz = async () => {
    const newQuiz = await client.createQuizForCourse(cid as string, {
      title: "New Quiz",
      courseId: cid,
    });
    dispatch(addQuiz(newQuiz));
    router.push(`/courses/${cid}/quizzes/${newQuiz._id}/editor`);
  };

  const onDeleteQuiz = async (quizId: string) => {
    await client.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));
  };

  const onTogglePublish = async (quizId: string, published: boolean) => {
    await client.publishQuiz(quizId, published);
    dispatch(updateQuiz({ _id: quizId, published }));
  };

  const getAvailabilityLabel = (quiz: any) => {
    const now = new Date();
    const available = quiz.availableDate ? new Date(quiz.availableDate) : null;
    const until = quiz.availableUntilDate ? new Date(quiz.availableUntilDate) : null;
    if (until && now > until) return "Closed";
    if (available && now >= available && (!until || now <= until)) return "Available";
    if (available && now < available)
      return `Not available until ${available.toLocaleDateString()}`;
    return "Not available";
  };

  return (
    <div>
      <QuizzesControls addQuiz={onAddQuiz} isFaculty={!!isFaculty} />
      <br /><br /><br /><br />

      <ListGroup id="wd-quizzes">
        <ListGroupItem className="p-0 mb-5 border-gray">
          <div className="wd-title p-3 bg-secondary">
            <GoTriangleDown /> Assignment Quizzes
          </div>

          {quizzes.length === 0 && (
            <ListGroupItem>
              No quizzes yet. Click <strong>+ Quiz</strong> to add one.
            </ListGroupItem>
          )}

          <ListGroup>
            {quizzes.map((quiz: any) => (
              <ListGroupItem key={quiz._id}>
                <div className="wd-title d-flex">
                  <IoRocketOutline className="fs-3 text-secondary" />
                  <span
                    className="fw-bold"
                    onClick={() =>
                      router.push(`/courses/${cid}/quizzes/${quiz._id}`)
                    }>
                    {quiz.title}
                  </span>
                  {isFaculty && (
                    <QuizzesControlButtons
                      quizId={quiz._id}
                      published={quiz.published}
                      deleteQuiz={onDeleteQuiz}
                      togglePublish={onTogglePublish} />
                  )}
                </div>
                <div className="text-muted">
                  <span>{getAvailabilityLabel(quiz)}</span>
                  {quiz.dueDate && (
                    <>
                      <span> | </span>
                      <span>
                        <strong>Due</strong>{" "}
                        {new Date(quiz.dueDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </span>
                    </>
                  )}
                  <span> | </span>
                  <span>{quiz.points ?? 0} pts</span>
                  <span> | </span>
                  <span>{quiz.questions?.length ?? 0} Questions</span>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}