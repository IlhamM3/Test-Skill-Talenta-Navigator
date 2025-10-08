import { configureStore } from '@reduxjs/toolkit'
import taskSlice from "@/redux/SliceListData";
export default function Store () {
    return configureStore({
        reducer: {
            data: taskSlice,
        },    
    });
}