"use client"
import { useEffect, useState } from "react";
import * as client from "../courses/client";
import { setEnrollments, enroll, unenroll } from "./enrollments/reducer";
import Link from "next/link";
import React from "react";
import {
  Row, Col, Card, CardImg, CardBody,
  CardTitle, CardText, Button, FormControl
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { updateCourse, deleteCourse, setCourses } from "../courses/reducer";
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
    _id: "0", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15",
    image: "/images/reactjs.jpg", description: "New Description"
  });

  const fetchCourses = async () => {
    try {
      const courses = await client.findMyCourses();
      dispatch(setCourses(courses));
    } catch (error) { console.error(error); }
  };

  const fetchAllCourses = async () => {
    try {
      const allCourses = await client.fetchAllCourses();
      dispatch(setCourses(allCourses));
    } catch (error) { console.error(error); }
  };

  const fetchEnrollments = async () => {
    try {
      const enrollments = await client.fetchEnrollments();
      dispatch(setEnrollments(enrollments));
    } catch (error) { console.error(error); }
  };

  useEffect(() => {
    fetchEnrollments();
    if (showAllCourses) {
      fetchAllCourses();
    } else {
      fetchCourses();
    }
  }, [showAllCourses, currentUser]);

  const onEnroll = async (courseId: string) => {
    await client.enrollInCourse(courseId);
    dispatch(enroll({ user: currentUser._id, course: courseId }));
  };

  const onUnenroll = async (courseId: string) => {
    await client.unenrollFromCourse(courseId);
    dispatch(unenroll({ user: currentUser._id, course: courseId }));
    if (!showAllCourses) {
      dispatch(setCourses(courses.filter((c) => c._id !== courseId)));
    }
  };

  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };

  const onDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((c) => c._id !== courseId)));
  };

  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(setCourses(courses.map((c) =>
      c._id === course._id ? course : c
    )));
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h5>
        New Course
        <button onClick={onAddNewCourse} className="btn btn-primary float-end"
          id="wd-add-new-course-click">Add</button>
        <button onClick={onUpdateCourse} className="btn btn-secondary float-end"
          id="wd-update-course-click">Update</button>
        <button className="btn btn-primary float-end me-2"
          id="wd-enrollments-click"
          onClick={() => setShowAllCourses(!showAllCourses)}>
          Enrollments
        </button>
      </h5>
      <br />
      <FormControl value={course.name} className="mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })} />
      <FormControl value={course.description} rows={3} as="textarea"
        onChange={(e) => setCourse({ ...course, description: e.target.value })} />
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course: any) => {
            const isEnrolled = enrollments.some(
              (e: any) => e.user === currentUser?._id && e.course === course._id
            );
            return (
              <Col key={course._id} className="wd-dashboard-course"
                style={{ width: "300px" }}>
                <Card>
                  <Link href={`/courses/${course._id}/home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark">
                    <CardImg src="/images/reactjs.jpg" variant="top"
                      width="100%" height={160} />
                    <CardBody>
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name}
                      </CardTitle>
                      <CardText className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}>
                        {course.description}
                      </CardText>
                      <Button variant="primary">Go</Button>

                      {isEnrolled ? (
                        <Button variant="danger" className="float-end"
                          onClick={(event) => {
                            event.preventDefault();
                            onUnenroll(course._id); 
                          }}>
                          Unenroll
                        </Button>
                      ) : (
                        <Button variant="success" className="float-end"
                          onClick={(event) => {
                            event.preventDefault();
                            onEnroll(course._id); 
                          }}>
                          Enroll
                        </Button>
                      )}

                      <button className="btn btn-danger"
                        onClick={(event) => {
                          event.preventDefault();
                          onDeleteCourse(course._id);
                        }}>
                        Delete
                      </button>
                      <button id="wd-edit-course-click"
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