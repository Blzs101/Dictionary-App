import { configureStore,createSlice } from '@reduxjs/toolkit'


const mainSlice = createSlice({
    name: "main",
    initialState: {value: {theme: "light", font: "Serif", fontArray:["Serif", "Arial", "Courier New"], wrong: "", word: "" }},
    reducers:{
        setTheme: (state, action) =>{
            state.value.theme = action.payload;
        },
        setFont: (state, action) =>{
            state.value.font = action.payload;
        },
        setWrong: (state, action) =>{
            state.value.wrong = action.payload;
        },
        setWord: (state, action) =>{
            state.value.word = action.payload;
        }
    }
});

const fetchedData = createSlice({
    name:"fetchedData",
    initialState: {value: null},
    reducers : {
        setFetchedData:  (state, action) =>{
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