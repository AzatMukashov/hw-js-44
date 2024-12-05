import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import { useEffect } from 'react';
import { setError } from '../features/cipherSlice.ts';

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

  return (
    <div>

    </div>
  );
};

export default CipherForm;