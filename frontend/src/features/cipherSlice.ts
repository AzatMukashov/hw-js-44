import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CipherState {
  password: string;
  inputMessage: string;
  outputMessage: string;
  error: string | null;
}

const initialState: CipherState = {
  password: '',
  inputMessage: '',
  outputMessage: '',
  error: null,
};

const cipherSlice = createSlice({
  name: 'cipher',
  initialState,
  reducers: {
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setInputMessage(state, action: PayloadAction<string>) {
      state.inputMessage = action.payload;
    },
    setOutputMessage(state, action: PayloadAction<string>) {
      state.outputMessage = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {setPassword, setInputMessage, setOutputMessage, setError} = cipherSlice.actions;
export default cipherSlice.reducer;