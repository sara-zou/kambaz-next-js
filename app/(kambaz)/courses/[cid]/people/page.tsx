"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PeopleTable from "./Table";
import * as client from "../../../courses/client";

export default function People() {
  const [users, setUsers] = useState<any[]>([]);
  const { cid } = useParams();

  const fetchUsers = async () => {
    try {
      console.log("fetching users for course:", cid);
      const users = await client.findUsersForCourse(cid as string);
      console.log("users:", users);
      setUsers(users);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [cid]);

  return (
    <div>
      <h2>People</h2>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}