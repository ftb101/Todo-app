import {createSlice} from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit";
import type{AppThunk} from "../../app/store"
import type { RootState } from "../../app/store";

interface TaskState{
    idCount:number;
    tasks:{id:number;title:string;completed:boolean}[];
    selectedTask:{id:number;title:string;completed:boolean};
    isModalOpen:boolean;
}

const initialState:TaskState={
    idCount:1,
    tasks:[{id:1,title:'Task_A',completed:false}],
    selectedTask:{id:0,title:"",completed:false},
    isModalOpen:false,
};

export const taskSlice=createSlice({
    name:'task',
    initialState,
    reducers:{
        createTask:(state,action: PayloadAction<string>)=>{
            state.idCount++;
            const newTask={
                id:state.idCount,
                title:action.payload,
                completed:false
            };
            state.tasks=[newTask,...state.tasks];
        },

        editTask:(state,action: PayloadAction<{id:number; title:string}>)=>{
            const task=state.tasks.find((t)=>t.id===action.payload.id);
            if(task){
                task.title=action.payload.title;
            }
        },

        deleteTask:(state,action)=>{
            state.tasks=state.tasks.filter((t)=>t.id!==action.payload.id);
        },

        selectTask:(state,action: PayloadAction<{ id: number; title: string; completed: boolean }>)=>{
            state.selectedTask=action.payload;
        },

        handleModalOpen:(state,action: PayloadAction<boolean>)=>{
            state.isModalOpen=action.payload;
        
        },

        completeTask:(state,action)=>{
            const task=state.tasks.find((t)=>t.id===action.payload.id);
            if(task){
                task.completed=!task.completed;
            }
        },
    },
});

export const {createTask,handleModalOpen,selectTask,editTask,completeTask,deleteTask}=taskSlice.actions;

export const selectTasks=(state:RootState):TaskState['tasks']=>state.task.tasks;
export const selectIsModalOpen=(state:RootState):TaskState['isModalOpen']=>state.task.isModalOpen;
export const selectSelectedTask=(state:RootState):TaskState['selectedTask']=>state.task.selectedTask;

export default taskSlice.reducer;