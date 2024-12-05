import { useAppDispatch, useAppSelector } from '../app/hooks.ts';

const CipherForm = () => {
  const dispatch = useAppDispatch();
  const {password, inputMessage, outputMessage, error} = useAppSelector(state => state.cipher);

  return (
    <div>

    </div>
  );
};

export default CipherForm;