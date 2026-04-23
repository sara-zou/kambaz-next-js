"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { FaCheckCircle, FaBan, FaEllipsisV } from "react-icons/fa";

interface QuizzesControlButtonsProps {
  quizId: string;
  published: boolean;
  deleteQuiz: (id: string) => void;
  togglePublish: (id: string, published: boolean) => void;
}

export default function QuizzesControlButtons({
  quizId,
  published,
  deleteQuiz,
  togglePublish,
}: QuizzesControlButtonsProps) {
  const router = useRouter();
  const { cid } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <div className="float-end ms-auto d-flex align-items-center position-relative"
      ref={menuRef}>

      <span
        className="me-2"
        onClick={() => togglePublish(quizId, !published)}
        title={published ? "Click to unpublish" : "Click to publish"}
      >
        {published
          ? <FaCheckCircle className="text-success fs-5" />
          : <FaBan className="text-secondary fs-5" />}
      </span>

      <span onClick={() => setMenuOpen(!menuOpen)}>
        <FaEllipsisV className="text-dark fs-5" />
      </span>

      {menuOpen && (
        <div
          className="position-absolute bg-white border"
          style={{ top: "100%", right: 0, zIndex: 999, minWidth: "150px" }}>
          <div className="px-3 py-2"  style={{ cursor: "pointer" }}
            onClick={() => {
              setMenuOpen(false);
              router.push(`/courses/${cid}/quizzes/${quizId}/editor`);
            }}>
            Edit
          </div>
          <div className="px-3 py-2"  style={{ cursor: "pointer" }}
            onClick={() => {
              setMenuOpen(false);
              togglePublish(quizId, !published);
            }}>
            {published ? "Unpublish" : "Publish"}
          </div>
          <div className="px-3 py-2 text-danger"  style={{ cursor: "pointer" }}
            onClick={() => {
              setMenuOpen(false);
              if (confirm("Delete this quiz?")) deleteQuiz(quizId);
            }}>
            Delete
          </div>
        </div>
      )}
    </div>
  );
}