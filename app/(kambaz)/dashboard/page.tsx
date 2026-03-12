"use client"
import { useState } from "react";
import Link from "next/link";
import React from "react";
import {
  Row, Col, Card, CardImg, CardBody,
  CardTitle, CardText, Button, FormControl
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addNewCourse, updateCourse, deleteCourse } from "../courses/reducer";
import { enroll, unenroll } from "./enrollments/reducer";
import { RootState } from "../store";

export default function Dashboard() {

  const { courses } = useSelector((state: RootState) => state.coursesReducer);

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as { currentUser: any };

  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer
  );

  const dispatch = useDispatch();

  const [showAllCourses, setShowAllCourses] = useState(false);

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description"
  });

  return (

    <div id="wd-dashboard">

      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      <h5>
        New Course

        <button
          className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={() => dispatch(addNewCourse(course))}>
          Add
        </button>

        <button
          className="btn btn-warning float-end me-2"
          id="wd-update-course-click"
          onClick={() => dispatch(updateCourse(course))}>
          Update
        </button>

        <button
          className="btn btn-primary float-end me-2"
          id="wd-enrollments-click"
          onClick={() => setShowAllCourses(!showAllCourses)}>
          Enrollments
        </button>

      </h5>

      <br />

      <FormControl
        value={course.name}
        className="mb-2"
        onChange={(e) =>
          setCourse({ ...course, name: e.target.value })
        }/>

      <FormControl
        value={course.description}
        rows={3}
        as="textarea"
        onChange={(e) =>
          setCourse({ ...course, description: e.target.value })
        }/>

      <hr />

      <h2 id="wd-dashboard-published">
        Published Courses ({courses.length})
      </h2>

      <hr />

      <div id="wd-dashboard-courses">

        <Row xs={1} md={5} className="g-4">

          {courses
            .filter((course: any) =>
              showAllCourses
                ? true
                : enrollments.some(
                    (e: any) =>
                      e.user === currentUser?._id &&
                      e.course === course._id
                  )
            )
            .map((course: any) => {

              const isEnrolled = enrollments.some(
                (e: any) =>
                  e.user === currentUser?._id &&
                  e.course === course._id
              );

              return (

                <Col
                  key={course._id}
                  className="wd-dashboard-course"
                  style={{ width: "300px" }}>

                  <Card>

                    <Link
                      href={`/courses/${course._id}/home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark">

                      <CardImg
                        src="/images/reactjs.jpg"
                        variant="top"
                        width="100%"
                        height={160}/>

                      <CardBody>

                        <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                          {course.name}
                        </CardTitle>

                        <CardText
                          className="wd-dashboard-course-description overflow-hidden"
                          style={{ height: "100px" }}>
                          {course.description}
                        </CardText>

                        <Button variant="primary">
                          Go
                        </Button>

                        {isEnrolled ? (
                          <Button
                            variant="danger"
                            className="float-end"
                            onClick={(event) => {
                              event.preventDefault();
                              dispatch(
                                unenroll({
                                  user: currentUser._id,
                                  course: course._id
                                })
                              );
                            }} >
                            Unenroll
                          </Button>
                        ) : (
                          <Button
                            variant="success"
                            className="float-end"
                            onClick={(event) => {
                              event.preventDefault();
                              dispatch(
                                enroll({
                                  user: currentUser._id,
                                  course: course._id
                                })
                              );
                            }}>
                            Enroll
                          </Button>
                        )}

                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            dispatch(deleteCourse(course._id));
                          }}
                          className="btn btn-danger float-end me-2"
                          id="wd-delete-course-click">
                          Delete
                        </button>

                        <button
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end">
                          Edit
                        </button>

                      </CardBody>

                    </Link>

                  </Card>

                </Col>

              );
            })}

        </Row>

      </div>

    </div>
  );
}