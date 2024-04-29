import { useState, useEffect } from 'react';
import axios from 'axios';
import { AiFillCloseCircle, AiFillPlusCircle, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useGlobalContext } from '../AppContext.jsx';

export const AutoComplete = () => {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const { watchList, setWatchList} = useGlobalContext();
    const [searchLoading, setSearchLoading] = useState(false);
    useEffect(() => {
        if (!search) {
            setResults([]);
            return;
        }
        const fetchSymbols = async () => {
            try {
                setSearchLoading(true);
                const response = await axios.get("https://data-api.binance.vision/api/v3/ticker/price");
                const filteredSymbols = response.data.filter(symbol => symbol.symbol.toLowerCase().includes(search.toLowerCase()));
                setResults(filteredSymbols);
            } catch (error) {
                console.log(error);
            } finally {
                setSearchLoading(false);
            }
        };
        const timerId = setTimeout(() => {
            fetchSymbols();
        }, 500);
        return () => clearTimeout(timerId);

    }, [search]);
    
    return (
        <div className="realtive flex flex-col w-[80%] mx-auto justify-center items-center pt-4">
            <h1 className="text-center text-4xl text-sky-500 m-4 tracking-widest drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]">trade
                watchlist</h1>
            <div className="flex w-full justify-center items-center">
                <input
                    className="p-3 rounded-xl border-2 border-sky-200 w-[50%] focus:outline-sky-300 text-sky-800 shadow"
                    type="text" placeholder="Search symbol.." onChange={(e) => setSearch(e.target.value)}
                    value={search}></input>
                <AiFillCloseCircle size={32}
                                   className="fill-sky-400 -ml-10 transisation duration-500 hover:scale-105 cursor-pointer"
                                   onClick={() => {
                                       setSearch("")
                                   }}/>
            </div>

            {
                <ul className="fixed top-48 max-h-[35%] overflow-y-auto bg-white w-[45%] rounded-xl border-2 border-sky-100 m-2">
                    {searchLoading &&
                        <li className="text-center p-5">
                            <AiOutlineLoading3Quarters size={30}
                                                       className="animate-spin fill-sky-400 stroke-2 inline self-center self-align-center"/>
                        </li>}
                    {results && !searchLoading && results.filter(ele => !ele.symbol.includes(".")).map(ele =>
                        <li key={ele.symbol} className="flex flow-row justify-between p-3 text-sky-800">
                        <span className="font-bold"> <AiFillPlusCircle size={24}
                                                                       className="inline self-end fill-sky-400 transisation duration-500 hover:scale-105 cursor-pointer mr-3"
                                                                       onClick={() => {
                                                                           console.log(!watchList.includes(ele.symbol));
                                                                           if (!watchList.includes(ele.symbol)) setWatchList(w => [...w, ele.symbol]);
                                                                           setSearch("");
                                                                       }}/>
                            {ele.symbol}
                        </span>
                            {ele.description}
                        </li>)}
                </ul>
            }
        </div>
);
}