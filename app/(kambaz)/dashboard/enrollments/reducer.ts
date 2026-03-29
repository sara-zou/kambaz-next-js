import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrollments: [] as any[],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    enroll: (state, action) => {
      state.enrollments = [...state.enrollments, action.payload];
    },
    unenroll: (state, action) => {
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === action.payload.user && 
                 e.course === action.payload.course)
      );
    },
  },
});

export const { setEnrollments, enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;