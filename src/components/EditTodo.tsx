import React, {Fragment, useState, ChangeEvent} from "react"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ITodo } from "./ListTodos";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
interface Props {
  todo: ITodo
}

const EditTodo: React.FC<Props> = ({todo}) => {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setDescription(todo.description)
    setOpen(false) }
    ;
  const [description, setDescription] = useState(todo.description)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
  }
  const handleClick = (e: any) => {
    e.preventDefault();
    updateDescription();
  }
  const updateDescription = async () => {
    try {
      const body = {description};
      const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
      window.location.href = "/"
      console.log(response);
    } catch (err: any) {
      console.error(err.message)
    }
  }
  return (
      <Fragment>
      <Button onClick={handleOpen}>Edit</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        data-target={`id${todo.todo_id}`}
      >
        <Box sx={style}>
          <Typography id={`id${todo.todo_id}`} variant="h6" component="h2">
            Edit Todo
          </Typography>
          <Typography id={`id${todo.todo_id}`} sx={{ mt: 2 }}>
            <input type="text" onChange={handleChange} placeholder="Edit Todo" value={description}/>
          </Typography>
          <Button onClick={handleClick}>Submit</Button>
        </Box>
      </Modal>
      </Fragment>
  );

}

export default EditTodo;