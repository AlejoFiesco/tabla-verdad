import './App.css';
import { Validators } from './model/validators';
import { useRef, useState, useEffect } from 'react';

function App() {

  let query = useRef('')
  let [checkResults, setCheckResults] = useState({})

  function validateQuery(event){
    event.preventDefault();
    setCheckResults(Validators.validateQuery(query.current.value));
  }

  useEffect(()=>{
    if(checkResults.isValid){
      console.log(checkResults.parenthesisArray);
    }
  },[checkResults])

  return (
    <div className="App">
      <h2>Tablas de verdad</h2>
      <form onSubmit={validateQuery}>
        <input type='text' placeholder='p^(q->r)' ref={query} />
        <button>Crear tabla de verdad</button>
        {checkResults?.message && <span className='error-message'>{checkResults?.message}</span>}
      </form>
    </div>
  );
}

export default App;
