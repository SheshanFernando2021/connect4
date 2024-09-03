import React from 'react';
import ConnectFour from './Components/ConnectFour';
const App = () => {
  return (
    <div>
      <ConnectFour />
      <p>This is the Connect Four game built with React.</p>
      <p>
        <a href="https://github.com/johndoe/connect-four-react">
          View the source code on GitHub
        </a>
      </p>
    </div>
  );
};

export default App;
