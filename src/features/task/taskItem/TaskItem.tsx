import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import Modal from '@mui/material/Modal';
import TaskForm from '../taskForm/TaskForm';
import styles from "./TaskItem.module.scss";
import EventNoteIcon from '@mui/icons-material/EventNote';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface PropTypes{
    task:{id:number; title:string;completed:boolean};
}

const TaskItem:React.FC<PropTypes> = ({task}) => {
    const label = { slotProps: { input: { 'aria-label': 'Checkbox demo' } } };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

  return (
    <div className={styles.root}>
        <div className={styles.title}>
            <EventNoteIcon/>
            <div className={styles.title_text}>{task.title}</div>
        </div>
        <div className={styles.right_item}>
            <Checkbox {...label} className={styles.checkbox} checked={task.completed}  onClick={()=>console.log(`check ${task.id}`)}/>
            <button onClick={handleOpen} className={styles.edit_button}>
                <EditIcon className={styles.icon}/>
            </button>
            <button onClick={()=>console.log(`delete ${task.id}`)} className={styles.delete_button}>
                <DeleteIcon className={styles.icon}/> 
            </button>
        </div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className={styles.modal}        >
            <div  className={styles.modal_content}>
                <div className={styles.modal_title}>Edit</div>
                <TaskForm edit/>
            </div>
        </Modal>
    </div>
  )
}

export default TaskItem
