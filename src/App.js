import './App.css';
import { Solvers } from './model/solvers';
import { Validators } from './model/validators';
import { useRef, useState, useEffect } from 'react';

function App() {

  let query = useRef('')
  let [checkResults, setCheckResults] = useState({})
  let [resultsDict, setResultsDictionary] = useState([])

  function validateQuery(event){
    event.preventDefault();
    setCheckResults(Validators.validateQuery(query.current.value));
  }

  useEffect(()=>{
    if(checkResults.isValid){  
      let truthTable = Solvers.createTruthTable(checkResults);
      setResultsDictionary(truthTable);
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
      <section id='truth-table'>
        {resultsDict.length !== 0 && Object.keys(resultsDict).map((key)=>{
          return(
            <div className='row' key={key}>
              <span className='row__head'>
                {key}
              </span>
              {resultsDict[key].map((value, index)=>
                <span className='row__content' key={`${key} ${index}`}>{value}</span>
              )}
            </div>
          )
        })}
      </section>
    </div>
  );
}

export default App;
