
import React, {Fragment, useState, useEffect} from "react"
import EditTodo from "./EditTodo"

interface IList {
  todos: {
    description: string,
    todo_id: number,
  }[]
}

const ListTodos = () => {


  const [todos, setTodos] = useState<IList["todos"]>([])

  //GET TODO FUNCTION
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
  // DELETE TODO FUNCTION
  const deleteTodo = async (id: number) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${id}`,{
        method: "DELETE",
      })
      console.log(deleteTodo)
      setTodos((prevTodos) => {
        return prevTodos.filter(todo => todo.todo_id !== id)
      })
    } catch (err: any) {
      console.error(err)
    }
  }
  useEffect(() => {
    getTodos();
  }, [])
  console.log("TODOS: ", todos)
  return (<Fragment>
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
          <td><EditTodo /></td>
          <td> <button onClick={() => {deleteTodo(todo.todo_id)}} className="btn btn-danger">Delete</button></td>
        </tr>
      )
    })}
  </tbody>
</table>
  </Fragment>)
}

export default ListTodos;