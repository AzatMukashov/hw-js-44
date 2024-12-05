
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