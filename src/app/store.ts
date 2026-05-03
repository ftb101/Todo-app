import { configureStore} from "@reduxjs/toolkit";
import type { ThunkAction } from "@reduxjs/toolkit";
import type { Action } from "redux";
import taskReducer from "../features/task/taskSlice";

export const store=configureStore({
    reducer:{
        task:taskReducer,
    },
});

export type RootState=ReturnType<typeof store.getState>;
export type AppThunk<ReturnType=void>=ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>