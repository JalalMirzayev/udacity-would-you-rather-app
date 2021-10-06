import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _getUsers } from "../../services/_data.js";

export const getUsers = createAsyncThunk("users/getUsers", async () => {
	const response = await _getUsers();
	return Object.keys(response).map((key) => response[key]);
});

const usersSlice = createSlice({
	name: "users",
	initialState: {
		loading: null,
		users: [],
	},
	extraReducers: {
		[getUsers.pending]: (state, action) => {
			state.loading = "loading";
		},
		[getUsers.fulfilled]: (state, action) => {
			state.users = action.payload;
			state.loading = "success";
		},
		[getUsers.rejected]: (state, action) => {
			state.status = "failed";
		},
	},
});

export default usersSlice.reducer;
