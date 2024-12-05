import { useAppDispatch, useAppSelector } from '../app/hooks.ts';
import { FormEvent, useEffect } from 'react';
import { setError, setInputMessage, setOutputMessage, setPassword } from '../features/cipherSlice.ts';
import axiosAPI from '../axiosApi.ts';
import { Alert, Container, TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';

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
    <Container style={{marginTop: '1rem'}}>
      <Grid container spacing={2} direction="column">
        {error ? <Alert severity="error">{error}</Alert> : null}
        <Grid>
          <TextField
            label="Decrypted message"
            value={inputMessage}
            onChange={(e) => dispatch(setInputMessage(e.target.value))}
            fullWidth
          />
        </Grid>
        <Grid container spacing={2} alignItems="center">
          <Grid size={11}>
            <TextField
              label="Password"
              value={password}
              onChange={(e) => dispatch(setPassword(e.target.value))}
              fullWidth
            />
          </Grid>
          <Grid>
            <ArrowDownward onClick={handleEncode}/>
          </Grid>
          <Grid>
            <ArrowUpward onClick={handleDecode}/>
          </Grid>
        </Grid>
        <Grid>
          <TextField
            label="Coded message"
            value={outputMessage}
            onChange={(e) => dispatch(setOutputMessage(e.target.value))}
            fullWidth
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CipherForm;