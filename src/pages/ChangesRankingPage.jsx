/*
 * This page fetches and processes the data used for winner and loser tables for BTC and USDT market
 * @author Martin Li
 */
import { useEffect, useState } from "react";
import { useGlobalContext } from "../AppContext.jsx";
import { useNavigate } from "react-router-dom";
import { AiOutlineLeft } from "react-icons/ai";
import { BTCTable } from "../components/BTCTable.jsx";
import { PageLoading } from "../components/PageLoading.jsx";

export const ChangesRankingPage = () => {
    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    const [btcResults, setBtcResults] = useState([]);
    const [usdtResults, setUsdtResults] = useState([]);
    const { pageLoading, setPageLoading } = useGlobalContext();

    // Get symbols
    useEffect(() => {
        const fetchSymbols = async () => {
            try {
                setPageLoading(true);
                const response = await fetch(
                    "https://data-api.binance.vision/api/v3/ticker/price",
                );
                const data = await response.json();
                const symbolsArray = data
                    .filter((item) => {
                        return item.hasOwnProperty("symbol");
                    })
                    .map((item) => item.symbol);
                setResults(symbolsArray);
                setPageLoading(false);
            } catch (error) {
                console.log(error);
                setPageLoading(false);
            }
        };
        fetchSymbols();
    }, [setPageLoading]);
    useEffect(() => {
        const fetchData = async () => {
            if (results.length > 0) {
                // Ensure we have symbols to query
                try {
                    setPageLoading(true); // Set loading true at the beginning of the fetch
                    // Filter symbols for BTC and USDT
                    const btcSymbolsArray = results.filter((symbol) =>
                        symbol.endsWith("BTC"),
                    );
                    const usdtSymbolsArray = results.filter((symbol) =>
                        symbol.endsWith("USDT"),
                    );

                    const btcQuery =
                        "[" +
                        btcSymbolsArray
                            .map((symbol) => `"${symbol}"`)
                            .join(",") +
                        "]";
                    const usdtQuery =
                        "[" +
                        usdtSymbolsArray
                            .map((symbol) => `"${symbol}"`)
                            .join(",") +
                        "]";

                    // Fetching BTC and USDT data
                    const [btcData, usdtData] = await Promise.all([
                        fetch(
                            `https://data-api.binance.vision/api/v3/ticker/24hr?symbols=${btcQuery}`,
                        ).then((res) => res.json()),
                        fetch(
                            `https://data-api.binance.vision/api/v3/ticker/24hr?symbols=${usdtQuery}`,
                        ).then((res) => res.json()),
                    ]);
                    // Processing data
                    const processResults = (data) =>
                        data
                            .map((item) => ({
                                symbol: item.symbol,
                                priceChangePercent: parseFloat(
                                    item.priceChangePercent,
                                ),
                            }))
                            .sort(
                                (a, b) =>
                                    b.priceChangePercent - a.priceChangePercent,
                            );
                    setBtcResults(processResults(btcData));
                    setUsdtResults(processResults(usdtData));
                    setPageLoading(false);
                } catch (error) {
                    console.log("Error fetching data");
                    setPageLoading(false);
                }
            }
        };
        fetchData();
    }, [results, setPageLoading]);
    const btcWinner = btcResults.slice(0, 10);
    const btcLoser = [...btcResults.slice(-10)].reverse();
    const usdtWinner = usdtResults.slice(0, 10);
    const usdtLoser = [...usdtResults.slice(-10)].reverse();

    return (
        <div className="container flex flex-col bg-stone-50 w-[85%] overflow-y-auto h-[90vh] mx-auto shadow-xl my-10 ring-1 ring-gray-900/5 rounded-md">
            {pageLoading && <PageLoading />}
            <span className="grid grid-cols-10">
                <AiOutlineLeft
                    size={50}
                    className="col-span-1 place-self-center fill-sky-400 shadow rounded-full p-2 bg-sky-100 transition duration-100 hover:scale-[.9] hover:bg-sky-200 hover:cursor-pointer"
                    onClick={() => navigate("/")}
                />
                <h1 className="col-span-9 place-self-center text-center text-4xl text-sky-500 m-6 -ml-20 tracking-widest drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]">
                    Trade Watchlist
                </h1>
            </span>
            <BTCTable
                btcWinner={btcWinner}
                btcLoser={btcLoser}
                usdtWinner={usdtWinner}
                usdtLoser={usdtLoser}
            />
        </div>
    );
};
