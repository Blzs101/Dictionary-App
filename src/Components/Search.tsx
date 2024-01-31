import axios from 'axios';
import { useEffect } from 'react';
import Switch from 'react-switch';
import '../App.css';
import {
  setFont,
  setTheme,
  setWrong,
  setWord,
  setIsLoading,
  setFetchedData,
} from '../ReduxStates/MainStore';
import { useQuery } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '../ReduxStates/MainStoreHooks';

interface license {
  name: string;
  url: string;
}
interface Phonetic {
  text: string;
  audio?: string;
}

interface Definition {
  definition: string;
  example: string;
  synonyms: string[];
  antonyms: string[];
}

interface Meaning {
  antonyms: string[];
  partOfSpeech: string;
  definitions: Definition[];
  synonyms: string[];
}

export interface DictionaryEntry {
  license: license;
  meanings: Meaning[];
  phonetic: string;
  phonetics: Phonetic[];
  sourceUrls: string[];
  word: string;
}

type DictionaryApiResponse = DictionaryEntry[];

export function Search() {
  const dispatch = useAppDispatch();
  const font = useAppSelector((state) => state.main.value.font);
  const theme = useAppSelector((state) => state.main.value.theme);
  const fontArray = useAppSelector((state) => state.main.value.fontArray);
  const word = useAppSelector((state) => state.main.value.word);
  const wrong = useAppSelector((state) => state.main.value.wrong);
  const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`;
  const wrongSubmit = () => {
    dispatch(setWrong('wrongSubmit'));
    setTimeout(() => dispatch(setWrong('')), 1000);
  };
  const fetchData = async () => {
    const fetchedResult = await axios
      .get<DictionaryApiResponse>(API_URL)
      .then((res) => res?.data[0])
      .catch((err) => {
        console.log(err.message);
        return null;
      });
    if (fetchedResult !== null) {
      dispatch(setFetchedData(fetchedResult));
    } else {
      wrongSubmit();
    }
    return fetchedResult;
  };

  const result = useQuery({
    queryKey: ['data'],
    queryFn: () => fetchData(),
    enabled: false,
  });

  useEffect(() => {
    dispatch(setIsLoading(result.isFetching));
  }, [result.isFetching]);

  const changeTheme = () => {
    dispatch(theme === 'light' ? setTheme('dark') : setTheme('light'));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (word === '') {
      wrongSubmit();
    } else {
      result.refetch();
      dispatch(setWord(''));
    }
  };
  return (
    <>
      <div className="flex items-center py-4">
        <a href="/">
          <img
            src={`${
              theme === 'dark'
                ? '/book-svgrepo-com-dark-mode.svg'
                : '/book-svgrepo-com.svg'
            }`}
            alt="book logo"
          />
        </a>
        <div className="flex justify-end w-full gap-2">
          <select
            onChange={(e) => dispatch(setFont(e.target.value))}
            value={font}
            className="p-1 border-r-2 "
          >
            {fontArray.map((value: string, id: number) => {
              return (
                <option key={id} data-testid="select-option">
                  {value}
                </option>
              );
            })}
          </select>
          <div className="flex items-center justify-center">
            <Switch
              onChange={changeTheme}
              checked={theme === 'dark'}
              uncheckedIcon={false}
              checkedIcon={false}
              height={16}
              width={30}
              handleDiameter={14}
              offColor="#343541"
              onColor="#9333ea"
            />
          </div>
          <img
            src={`${
              theme === 'dark'
                ? '/moon-svgrepo-com-dark-mode.svg'
                : '/moon-svgrepo-com.svg'
            }`}
            alt="half moon logo"
          />
        </div>
      </div>
      <form className={`h-[50px] ${wrong}`} onSubmit={handleSubmit}>
        <input
          data-testid="input-field"
          type="text"
          value={word}
          onChange={(e) => dispatch(setWord(e.target.value))}
          className="w-full h-full pl-4 font-bold bg-gray-300 rounded-lg"
        ></input>
        <button
          data-testid="submit-button"
          type="submit"
          className="absolute mt-[12.5px] ml-[-40px]"
        >
          <img
            src="/icons8-search.svg"
            alt="search logo"
            className="fill-purple-600"
          />
        </button>
      </form>
    </>
  );
}
