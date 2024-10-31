import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  message: "Hello World, I am Reducer",
};
const helloSlice = createSlice({
  name: "hello",
  initialState,
  reducers: {},
});
export default helloSlice.reducer;