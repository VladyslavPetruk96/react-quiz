import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';

const initialState = {
  questions: [],

  // 'loading', 'error', 'active', 'ready', 'finished'
  status: 'loading',
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'dataFailed':
      return { ...state, status: 'error' };
    default:
      return new Error('Action unknown');
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch('http://localhost:3001/questions')
      .then(res => res.json())
      .then(data => dispatch({ type: 'dataReceived', payload: data }))
      .catch(error => dispatch({ type: 'dataFailed' }));
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        <p>1/15</p>
        <p>Question?</p>
      </Main>
    </div>
  );
}

export default App;
