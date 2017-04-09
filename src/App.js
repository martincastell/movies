import React from 'react';
import './App.css';

function App ({state}) {
  return (
    <div className="App">
      Movies playing near {state.page.location}
    </div>
  );
}

export default App;
