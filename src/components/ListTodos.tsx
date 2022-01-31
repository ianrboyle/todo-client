import { json } from "body-parser"
import React, {Fragment, useState, useEffect} from "react"

interface IList {
  todos: {
    description: string,
    todo_id: number,
  }[]
}

const ListTodos = () => {


  const [todos, setTodos] = useState<IList["todos"]>([])

  const getTodos = async () => {
    try {
      await fetch("http://localhost:5000/todos").then(response => {
        return response.json();
      }).then (data => {
        console.log(data) 
        setTodos(data)
      })
    } catch (err: any) {
      console.error(err.message)
    }
  }
  useEffect(() => {
    getTodos();
  }, [])
  console.log("TODOS: ", todos)
  return (<Fragment>
    <p>Todo List</p>
    <table className="table m-5">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Description</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    {todos.map((todo) => {
      return (
        <tr key={todo.todo_id}>
          <th  scope="row">{todo.todo_id}</th>
          <td>{todo.description}</td>
          <td><button className="btn btn-primary">Edit</button></td>
          <td> <button className="btn btn-danger">Delete</button></td>
        </tr>
      )
    })}
    {/* <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr> */}
    {/* <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colSpan={2}>Larry the Bird</td>
      <td>@twitter</td>
    </tr> */}
  </tbody>
</table>
    <button onClick={getTodos}>Get</button>
  </Fragment>)
}

export default ListTodos;