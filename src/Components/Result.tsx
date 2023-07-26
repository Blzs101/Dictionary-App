import { useRef } from "react"
import { useSelector } from "react-redux";



export default function Result() {
    const word = useSelector((state: any) => { return state.fetchedData?.value?.word })
    const phonetics = useSelector((state: any) => { return state.fetchedData?.value?.phonetics })
    const phonetic = useSelector((state: any) => { return state.fetchedData?.value?.phonetic })
    const meanings = useSelector((state: any) => { return state.fetchedData?.value?.meanings })
    const sourceUrls = useSelector((state: any) => { return state.fetchedData?.value?.sourceUrls })
    const meaningResultOne = meanings?.[0].definitions.map((element: any) => element.definition);
    const meaningResultTwoDefinition = meanings?.[1] && meanings?.[1].definitions.map((element: any) => element.definition);
    const meaningResultTwoExample = meanings?.[1] && meanings?.[1].definitions.map((element: any) => element.example).filter((example: any) => example !== undefined);
    const audioFind = phonetics?.map((element: any) => element.audio !== "" ? element.audio : undefined).filter(Boolean);
    const audioRef = useRef<HTMLAudioElement>(null);

    return (
        <div>
            <div className="grid grid-cols-2">
                <div>
                    <h1 className="pt-4 pb-1 text-5xl font-bold md:text-6xl">{word}</h1>
                    <h2 className="pb-2 text-lg text-purple-600">{phonetic}</h2>
                </div>
                <div className="flex items-center justify-end">
                    <button onClick={() => audioRef.current && audioRef.current.play()} className="flex items-center justify-center w-16 h-16 bg-purple-300 rounded-full ">
                        <img src="public\play-button-svgrepo-com.svg" alt="play logo"></img>
                    </button>
                    {audioFind && <audio ref={audioRef} src={audioFind[0]}></audio>}

                </div>
            </div>

            <h2 className="py-3 text-lg font-bold ">{meanings?.[0].partOfSpeech}</h2>
            <div className="text-gray-400">Meaning(s)</div>
            <ul className="w-full ml-5 list-disc" >
                {meaningResultOne?.map((element: string, id: number) => <li key={id} className="w-full py-2 pr-4">{element}</li>)}
            </ul>
            {meanings?.[1] ?
                <div className="pb-4 border-b border-gray-400">
                    {meanings?.[0].synonyms[0] && <div className="text-gray-400">Synonyms <span className="text-purple-600">{meanings?.[0].synonyms[0]}</span></div>}
                    <h2 className="py-3 text-lg font-bold">{meanings?.[1].partOfSpeech}</h2>
                    <div className="text-gray-400">Meaning(s)</div>
                    <ul className="w-full ml-5 list-disc" >
                        {meaningResultTwoDefinition && meaningResultTwoDefinition.map((element: string, id: number) => {
                            return (
                                <li key={id} className="w-full py-2 pr-5">
                                    {element}
                                    {meaningResultTwoExample.length !== 0 && meaningResultTwoExample.map((e: string, key: number) => <p key={key} className="text-sm text-gray-400">{`"${e}"`}</p>)}
                                </li>
                            )
                        })}
                    </ul>
                </div> : null
            }
            <div className="pt-4 text-gray-400">Source:  <span className="text-black underline"><a href={sourceUrls?.[0]}>{sourceUrls?.[0]}</a></span></div>
        </div >
    )
}
