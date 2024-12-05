import { createSlice } from '@reduxjs/toolkit';

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

  }
})