
import React, {Fragment, useState} from "react"

// interface IDescription {
//   description: string,
// }

const InputTodo = () => {

  const [description, setDescription] = useState("")

  const onSubmitForm = async (e: any) => {
    e.preventDefault();
    try {
      const body = {description};
      const response = await fetch("http://localhost:5000/todos",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      })

      console.log(response)
    } catch (err: any) {
      console.error(err)
    }
  }
  return (<Fragment>
    <h1 className="text-center mt-5">Add a To Do</h1>
    <form className="d-flex m-5" onSubmit={onSubmitForm}>
      <input placeholder="To Do" type="text" className="form-control" value={description} onChange={(e) => {setDescription(e.target.value)}}/>
      <button className="btn btn-success">Add</button>
    </form>
    </Fragment>)
}

export default InputTodo;