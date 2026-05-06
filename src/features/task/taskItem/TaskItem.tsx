import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from '@mui/material/Checkbox';
import Modal from '@mui/material/Modal';
import TaskForm from '../taskForm/TaskForm';
import styles from "./TaskItem.module.scss";
import EventNoteIcon from '@mui/icons-material/EventNote';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { selectTask,handleModalOpen,selectIsModalOpen,completeTask ,deleteTask} from '../taskSlice';

interface PropTypes{
    task:{id:number; title:string;completed:boolean};
}

const TaskItem:React.FC<PropTypes> = ({task}) => {
    const isModalOpen=useSelector(selectIsModalOpen);
    const dispatch=useDispatch();
    const label = { slotProps: { input: { 'aria-label': 'Checkbox demo' } } };

    // const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        dispatch(selectTask(task))
        dispatch(handleModalOpen(true));
    }
    const handleClose = () => {
        dispatch(handleModalOpen(false));
    }

  return (
    <div className={styles.root}>
        <div className={styles.title}>
            <EventNoteIcon/>
            <div className={styles.title_text}>{task.title}</div>
        </div>
        <div className={styles.right_item}>
            <Checkbox {...label} className={styles.checkbox} checked={task.completed}  onClick={()=>dispatch(completeTask(task))}/>
            <button onClick={handleOpen} className={styles.edit_button}>
                <EditIcon className={styles.icon}/>
            </button>
            <button onClick={()=>dispatch(deleteTask(task))} className={styles.delete_button}>
                <DeleteIcon className={styles.icon}/> 
            </button>
        </div>
        <Modal
            open={isModalOpen}
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
