import { configureStore,createSlice } from '@reduxjs/toolkit'

const fontLocalStorage = JSON.parse(localStorage.getItem("font") || "Serif")
const themeLocalStorage = JSON.parse(localStorage.getItem("theme") || "light")
const mainSlice = createSlice({
    name: "main",
    initialState: {value: {theme: themeLocalStorage, font: fontLocalStorage, fontArray:["Serif", "Arial", "Courier New"], wrong: "", word: "" }},
    reducers:{
        setTheme: (state, action) =>{
            state.value.theme = action.payload;
            localStorage.setItem("theme", JSON.stringify(state.value.theme))
        },
        setFont: (state, action) =>{
            state.value.font = action.payload;
            localStorage.setItem("font", JSON.stringify(state.value.font))
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