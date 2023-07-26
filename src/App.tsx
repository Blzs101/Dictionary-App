import { Suspense, lazy } from "react";
import "./App.css"
import { Search } from "./Components/Search";
import { useSelector } from "react-redux";
import Loading from "./Components/Loading"

const Result = lazy(async () => import("./Components/Result"))


function App() {
  const isLoading = useSelector((state: any) => { return state.isLoading.isLoading })
  const fetchData = useSelector((state: any) => { return state.fetchedData.value })
  const font = useSelector((state: any) => state.main.value.font);
  const theme = useSelector((state: any) => state.main.value.theme);

  return (
    <div className={`${font.replace(/\s+/g, '')} ${theme} inset-0 w-full h-full fixed overflow-auto`} >
      <div className="w-full p-2 md:mx-auto md:w-1/2 ">
        <Search />

        {fetchData ?
          <Suspense fallback={<Loading />}>
            {isLoading ? <Loading /> : <Result />}
          </Suspense>
          : null
        }
      </div >
    </div >
  )
}

export default App
