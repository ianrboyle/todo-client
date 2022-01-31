import React, {Fragment} from 'react';

import EditTodo from './components/EditTodo';
import InputTodo from './components/InputTodo';
import ListTodos from './components/ListTodos';

function App() {
  return (
    <Fragment>
      <InputTodo />
      <ListTodos />
      <EditTodo />
    </Fragment>
  );
}

export default App;
