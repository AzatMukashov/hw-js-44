import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import { FormEvent, useEffect } from 'react';
import { setError, setInputMessage, setOutputMessage } from '../features/cipherSlice.ts';
import axiosAPI from '../axiosApi.ts';

const CipherForm = () => {
  const dispatch = useAppDispatch();
  const {password, inputMessage, outputMessage, error} = useAppSelector(state => state.cipher);
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(setError(null));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);
const handleEncode = async (e: FormEvent) => {
  e.preventDefault();
  if (!password) {
    dispatch(setError('Password is required'));
    return;
  }
  try {
    const response = await axiosAPI.post('/encode', {password, message: inputMessage});
    dispatch(setOutputMessage(response.data.encoded));
    dispatch(setInputMessage(''));
  } catch (err) {
    dispatch(setError('Failed to encode'));
  }
};
const handleDecode = async (e: FormEvent) => {
  e.preventDefault();
  if (!password) {
    dispatch(setError('Password is required'));
    return;
  }
  try {
    const response = await axiosAPI.post('/decode', {password, message: outputMessage});
    dispatch(setInputMessage(response.data.decoded));
    dispatch(setOutputMessage(''));
  } catch (err) {
    dispatch(setError('Failed to decode'));
  }
};
  return (
    <div>

    </div>
  );
};

export default CipherForm;