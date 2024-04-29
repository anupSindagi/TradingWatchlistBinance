import {useState, useEffect} from "react"
import axios from "axios";

export const BTCTable = () => {
    const [results, setResults] = useState([]);
    const [btcResults, setBtcResults] = useState([]);
    const [usdtResults, setUsdtResults] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get symbols
    useEffect(() => {
        const fetchSymbols = async () => {
            try {
                const response = await axios.get("https://data-api.binance.vision/api/v3/ticker/price");
                const symbolsArray = response.data.filter(item => {return item.hasOwnProperty('symbol');}).map(item => item.symbol);
                setResults(symbolsArray);
            } catch (error) {
                console.log(error);
            }
        };
        fetchSymbols();
    }, []);

    // Filter symbols
    const btcSymbolsArray = results.filter(symbol => {return symbol.endsWith('BTC');});
    const usdtSymbolsArray = results.filter(symbol => {return symbol.endsWith('USDT');});

    // Get price change percent
    const btcQuery = '[' + btcSymbolsArray.map(symbol => `"${symbol}"`).join(',') + ']';
    const usdtQuery = '[' + usdtSymbolsArray.map(symbol => `"${symbol}"`).join(',') + ']';
    // const testQuery = "[\"ETHBTC\",\"LTCBTC\",\"BNBBTC\",\"NEOBTC\",\"BCCBTC\",\"GASBTC\",\"HSRBTC\",\"MCOBTC\",\"WTCBTC\",\"LRCBTC\"]";
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [btcResponse, usdtResponse] = await Promise.all([
                    axios.get("https://data-api.binance.vision/api/v3/ticker/24hr?symbols=" + btcQuery),
                    axios.get("https://data-api.binance.vision/api/v3/ticker/24hr?symbols=" + usdtQuery)
                ]);
                const extractedBtcData = btcResponse.data.map(item => {
                    return {
                        symbol: item.symbol,
                        priceChangePercent: parseFloat(item.priceChangePercent)
                    };
                });
                extractedBtcData.sort((a, b) => b.priceChangePercent - a.priceChangePercent);
                setBtcResults(extractedBtcData);
                const extractedUsdtData = usdtResponse.data.map(item => {
                    return {
                        symbol: item.symbol,
                        priceChangePercent: parseFloat(item.priceChangePercent)
                    };
                });
                extractedUsdtData.sort((a, b) => b.priceChangePercent - a.priceChangePercent);
                setUsdtResults(extractedUsdtData);
                setLoading(false);
            } catch (error) {
                console.log("Error fetching data");
            }
        };
        fetchData();
    }, []);

    const btcWinner = btcResults.slice(0,10);
    const btcLoser = [...btcResults.slice(-10)].reverse();
    const usdtWinner = usdtResults.slice(0,10);
    const usdtLoser = [...usdtResults.slice(-10)].reverse();

    console.log(2);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>BTC Winner Table</h2>
            <table>
                <thead>
                <tr>
                    <th>Symbol</th>
                    <th>Price Change Percent</th>
                </tr>
                </thead>
                <tbody>
                {btcWinner.map((item, index) => (
                    <tr key={index}>
                        <td>{item.symbol}</td>
                        <td>{item.priceChangePercent}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <h2>BTC Loser Table</h2>
            <table>
                <thead>
                <tr>
                    <th>Symbol</th>
                    <th>Price Change Percent</th>
                </tr>
                </thead>
                <tbody>
                {btcLoser.map((item, index) => (
                    <tr key={index}>
                        <td>{item.symbol}</td>
                        <td>{item.priceChangePercent}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <h2>USDT Winner Table</h2>
            <table>
                <thead>
                <tr>
                    <th>Symbol</th>
                    <th>Price Change Percent</th>
                </tr>
                </thead>
                <tbody>
                {usdtWinner.map((item, index) => (
                    <tr key={index}>
                        <td>{item.symbol}</td>
                        <td>{item.priceChangePercent}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <h2>USDT Loser Table</h2>
            <table>
                <thead>
                <tr>
                    <th>Symbol</th>
                    <th>Price Change Percent</th>
                </tr>
                </thead>
                <tbody>
                {usdtLoser.map((item, index) => (
                    <tr key={index}>
                        <td>{item.symbol}</td>
                        <td>{item.priceChangePercent}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}