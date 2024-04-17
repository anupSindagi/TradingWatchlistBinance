import { useState, useEffect } from 'react';
import finnhub from '../apis/finnhub.js'
import { AiFillCaretDown, AiFillCaretUp, AiFillCloseCircle } from 'react-icons/ai'
import { useGlobalContext } from '../AppContext.jsx'
import { useNavigate } from 'react-router-dom';

export const StockList = () => {
    const { watchList, setWatchList, pageLoading, setPageLoading, setApiError } = useGlobalContext();
    const [stock, setStock] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            setApiError("false")
            setPageLoading(true);
            try {
                const symbolsParam = encodeURIComponent(JSON.stringify(watchList));
                const baseUrl = "https://data-api.binance.vision/api/v3/ticker/24hr";
                const url = `${baseUrl}?symbols=${symbolsParam}&type=FULL`;
                fetch(url)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`API call failed with status: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log("Ticker Data:", data);
                        if (isMounted) {
                            setStock(data);
                            console.log("stock mount", stock)
                            setPageLoading(false);
                        }
                    })
                    .catch(error => {
                        console.error("Error fetching data:", error);
                    });

            } catch (err) {
                console.log(err.response.data.error)
                setPageLoading(false)
                setApiError(err.response.data.error)
            }
        }
        fetchData()
        console.log("stock", stock)

        return () => (isMounted = false)
    }, [watchList])

    const handleRemoveSymbol = (symbol) => {
        // Prevent removing the last symbol
        if (watchList.length > 1) {
            setWatchList(watchList.filter(w => w !== symbol));
        } else {
            // Here you could show a message to the user indicating why they can't remove the last symbol
            alert("You cannot remove the last symbol from the watchlist.");
        }
    }

    return (
        <div className="flex justify-center max-h-[75vh] my-4 mb-20 overflow-x-auto">
            {console.log("stock in ele", stock)}
            <table className="mx-auto bg-sky-200 min-w-[1024px] w-auto">
                <thead className="text-sky-700 text-left">
                    <tr>
                        <th className="font-semibold p-2 border-4 border-sky-50">Symbol</th>
                        <th className="font-semibold border-4 p-2 border-sky-50">Last</th>
                        <th className="font-semibold border-4 p-2 border-sky-50">Change</th>
                        <th className="font-semibold border-4 p-2 border-sky-50">%Change</th>
                        <th className="font-semibold p-2 border-4 border-sky-50">High</th>
                        <th className="font-semibold p-2 border-4 border-sky-50">Low</th>
                        <th className="font-semibold p-2 border-4 border-sky-50">Open</th>
                        <th className="font-semibold p-2 border-4 border-sky-50">Close</th>
                    </tr>
                </thead>
                <tbody className="bg-sky-100 p-2 text-left text-sky-800 max-h-[65vh] overflow-auto">
                    {
                        stock && stock.map(ele =>
                            <tr key={ele.symbol} className="transition duration-100 hover:scale-[1.01] hover:cursor-pointer hover:bg-sky-200"
                                onClick={(e) => {
                                    console.log(e.target.tagName);
                                    if (!["path", "svg"].includes(e.target.tagName)) navigate(`detail/${ele.symbol}`)
                                }}
                            >
                                <th className="font-semibold p-2 border-4 border-sky-50">
                                    <span>{ele.symbol}</span>
                                </th>
                                <td className="p-2 border-4 border-sky-50">{parseFloat(ele.lastPrice).toFixed(3)}</td>
                                <td className={`p-2 border-4 border-sky-50 ${ele.priceChange && ele.priceChange > 0 ? `text-green-700` : `text-red-700`}`}>
                                    {parseFloat(ele.priceChange).toFixed(3)}
                                    {ele.priceChange > 0 ? <AiFillCaretUp className="inline" /> : <AiFillCaretDown className="inline" />}
                                </td>
                                <td className={`p-2 border-4 border-sky-50 ${ele.priceChangePercent && ele.priceChangePercent > 0 ? `text-green-700` : `text-red-700`}`}>
                                    {`${parseFloat(ele.priceChangePercent).toFixed(3)}%`}
                                    {ele.priceChangePercent > 0 ? <AiFillCaretUp className="inline" /> : <AiFillCaretDown className="inline" />}
                                </td>
                                <td className="p-2 border-4 border-sky-50">{parseFloat(ele.highPrice).toFixed(3)}</td>
                                <td className="p-2 border-4 border-sky-50">{parseFloat(ele.lowPrice).toFixed(3)}</td>
                                <td className="p-2 border-4 border-sky-50">{parseFloat(ele.openPrice).toFixed(3)}</td>
                                <td className="p-2 border-4 border-sky-50">
                                    <span className="flex justify-between">
                                        {parseFloat(ele.prevClosePrice).toFixed(3)}
                                        <AiFillCloseCircle size={18}
                                            className="inline fill-sky-300 transition duration-500 hover:scale-125 cursor-pointer hover:fill-sky-500"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent triggering the row's onClick
                                                handleRemoveSymbol(ele.symbol);
                                            }}
                                        />
                                    </span>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>

    );
}