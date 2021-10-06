import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	_getQuestions,
	_saveQuestion,
	_saveQuestionAnswer,
} from "../../services/_data.js";

export const getQuestions = createAsyncThunk(
	"questions/getQuestions",
	async () => {
		const response = await _getQuestions();
		return Object.keys(response).map((key) => response[key]);
	}
);

export const saveQuestion = createAsyncThunk(
	"questions/saveQuestion",
	async (question) => {
		await _saveQuestion(question);
	}
);

export const saveQuestionAnswer = createAsyncThunk(
	"questions/saveQuestion",
	async (question) => {
		await _saveQuestionAnswer(question);
	}
);

const initialState = {
	entities: [],
	loading: null,
	addingQuestionStatus: null,
	saveQuestionAnswerStatus: null,
	filterCondition: "unanswered",
};

const questionsSlice = createSlice({
	name: "questions",
	initialState,
	reducers: {
		setFilterCondition: (state, action) => {
			state.filterCondition = action.payload;
		},
	},
	extraReducers: {
		[getQuestions.pending]: (state) => {
			state.loading = "loading";
		},
		[getQuestions.fulfilled]: (state, action) => {
			state.entities = action.payload;
			state.loading = "success";
		},
		[getQuestions.rejected]: (state) => {
			state.loading = "failed";
		},
		[saveQuestion.pending]: (state) => {
			state.addingQuestionStatus = "starting";
		},
		[saveQuestion.fulfilled]: (state, action) => {
			state.addingQuestionStatus = "success";
		},
		[saveQuestion.rejected]: (state) => {
			state.addingQuestionStatus = "failed";
		},
		[saveQuestionAnswer.pending]: (state) => {
			state.saveQuestionAnswerStatus = "starting";
		},
		[saveQuestionAnswer.fulfilled]: (state, action) => {
			state.saveQuestionAnswerStatus = "success";
		},
		[saveQuestionAnswer.rejected]: (state) => {
			state.saveQuestionAnswerStatus = "failed";
		},
	},
});

export const { setFilterCondition } = questionsSlice.actions;
export default questionsSlice.reducer;
