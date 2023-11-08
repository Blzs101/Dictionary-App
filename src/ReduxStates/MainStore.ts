
import { PayloadAction, configureStore,createSlice } from '@reduxjs/toolkit'
import { DictionaryEntry } from '../Components/Search';

const fontLocalStorage = JSON.parse(localStorage.getItem("font") || ' "Serif" ');
const themeLocalStorage = JSON.parse(localStorage.getItem("theme") || ' "light" ');
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
        theme: themeLocalStorage, 
        font: fontLocalStorage, 
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
            localStorage.setItem("theme", JSON.stringify(state.value.theme))
        },
        setFont: (state, action:PayloadAction<string>) =>{
            state.value.font = action.payload;
            localStorage.setItem("font", JSON.stringify(state.value.font))
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
