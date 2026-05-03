import React from 'react';
import {useDispatch} from "react-redux";
import {useForm} from 'react-hook-form';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {createTask} from "../taskSlice"
import styles from "./TaskForm.module.css";

type Inputs={
    taskTitle:string;
};

const TaskForm:React.FC = () => {
    const dispatch=useDispatch();
    const {register,handleSubmit,reset}=useForm<Inputs>();
    const handleCreate=(data:Inputs)=>{
        dispatch(createTask(data.taskTitle));
        console.log(data);
        reset();
    };

  return (
    <div className={styles.root}>
        <Box onSubmit={handleSubmit(handleCreate)}
        className={styles.form}
        component="form"
        sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off"
        name='taskTitle'
        >
        <TextField 
        id="outlined-basic" 
        label="New Task" 
        {...register("taskTitle")}
        variant="outlined" 
        className={styles.text_field}/>
        </Box>
    </div>
  )
}

export default TaskForm
