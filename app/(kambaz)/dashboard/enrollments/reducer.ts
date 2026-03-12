import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../../database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
 enrollments: enrollments,
};

const enrollmentsSlice = createSlice({
 name: "enrollments",
 initialState,
 reducers: {
   enroll: (state, { payload}) => {
     state.enrollments.push(payload);
   },
   unenroll: (state, { payload }) => {
     state.enrollments = state.enrollments.filter(
        (e: any) =>
          !(e.user === payload.user && e.course === payload.course)
     );
   },
 },
});
export const { enroll, unenroll } =
enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;