import React from 'react';
import {useDispatch,useSelector} from "react-redux";
import {useForm} from 'react-hook-form';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {createTask,handleModalOpen,selectSelectedTask,editTask} from "../taskSlice"
import styles from "./TaskForm.module.scss";

type Inputs={
    taskTitle:string;
};

type PropsTypes={
    edit?:boolean;
}

const TaskForm:React.FC<PropsTypes> = ({edit}) => {
    const dispatch=useDispatch();
    const selectedTask = useSelector(selectSelectedTask);
    const {register,handleSubmit,reset}=useForm<Inputs>();
    const handleCreate=(data:Inputs)=>{
        dispatch(createTask(data.taskTitle));
        console.log(data);
        reset();
    };
    const handleEdit=(data:Inputs)=>{
        const sendDate={...selectedTask,title:data.taskTitle};
        dispatch(editTask(sendDate));
        dispatch(handleModalOpen(false)) ;       
    };

  return (
    <div className={styles.root}>
        <Box onSubmit={edit? handleSubmit(handleEdit): handleSubmit(handleCreate)}
        className={styles.form}
        component="form"
        sx={{ '& > :not(style)': { m: 1, } }}
        noValidate
        autoComplete="off"
        name='taskTitle'
        >
        <TextField 
            id="outlined-basic" 
            label={edit ? 'Edit Task' : 'New Task'} 
            defaultValue={edit ? selectedTask.title : ""}
            {...register("taskTitle")}
            variant="outlined" 
            className={styles.text_field}
        />
        {edit? (
            <div className={styles.button_wrapper}>
                <button type='submit' className={styles.submit_button}>Submit</button>
                <button 
                    type='button' 
                    className={styles.cancel_button}    
                    onClick={()=>dispatch(handleModalOpen(false))}
                    >cancel</button>
            </div>
        ):null}
        </Box>
    </div>
  )
}

export default TaskForm
