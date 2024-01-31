import { Suspense, lazy } from 'react';
import './App.css';
import { Search } from './Components/Search';
import Loading from './Components/Loading';
import { useAppSelector } from './ReduxStates/MainStoreHooks';

const Result = lazy(async () => import('./Components/Result'));

function App() {
  const isLoading = useAppSelector((state) => {
    return state.isLoading.isLoading;
  });
  const fetchData = useAppSelector((state) => {
    return state.fetchedData.value;
  });
  const font = useAppSelector((state) => state.main.value.font);
  const theme = useAppSelector((state) => state.main.value.theme);

  return (
    <div
      className={`${font.replace(
        /\s+/g,
        ''
      )} ${theme} inset-0 w-full h-full fixed overflow-auto`}
    >
      <div className="w-full p-2 md:mx-auto md:w-1/2 ">
        <Search />

        {fetchData ? (
          <Suspense fallback={<Loading />}>
            {isLoading ? <Loading /> : <Result />}
          </Suspense>
        ) : null}
      </div>
    </div>
  );
}

export default App;
