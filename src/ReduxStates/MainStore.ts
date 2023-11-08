
import { PayloadAction, configureStore,createSlice } from '@reduxjs/toolkit'
import { DictionaryEntry } from '../Components/Search';

interface mainTypes {
    value:{
        theme: string,
       font:string,
       fontArray:string[],
       wrong:string,
       word:string
    }
}
const mainState : mainTypes = {
    value: {
        theme: "light", 
        font: "Serif", 
        fontArray:["Serif", "Arial", "Courier New"],
        wrong:"",
        word:""
    }
}
const mainSlice = createSlice({
    name: "main",
    initialState:mainState,
    reducers:{
        setTheme: (state, action:PayloadAction<string>) =>{
            state.value.theme = action.payload;
        },
        setFont: (state, action:PayloadAction<string>) =>{
            state.value.font = action.payload;
        },
        setWrong: (state, action:PayloadAction<string>) =>{
            state.value.wrong = action.payload;
        },
        setWord: (state, action:PayloadAction<string>) =>{
            state.value.word = action.payload;
        }
    }
});
interface fetchedData {
    value : null |DictionaryEntry
}
const fetchedDataInitalState: fetchedData ={
    value: null
}
const fetchedData = createSlice({
    name:"fetchedData",
    initialState: fetchedDataInitalState,
    reducers : {
        setFetchedData:  (state, action:PayloadAction<DictionaryEntry>) =>{
            state.value = action.payload;
        }
    }
})
const isLoading = createSlice({
    name:"isLoading",
    initialState:{isLoading: false },
    reducers : {
        setIsLoading: (state, action) =>{
            state.isLoading = action.payload;
        }
    }
})

export const {setTheme, setFont, setWrong, setWord} = mainSlice.actions;
export const {setFetchedData} = fetchedData.actions;
export const {setIsLoading} = isLoading.actions;


export const mainStore = configureStore({
    reducer:{
        main: mainSlice.reducer,
        fetchedData: fetchedData.reducer,
        isLoading: isLoading.reducer
     }
});

export type RootState = ReturnType<typeof mainStore.getState>
export type AppDispatch = typeof mainStore.dispatch
