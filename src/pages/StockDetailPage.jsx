import {useParams, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {StockChart} from '../components/StockChart.jsx'
import {StockData} from "../components/StockData.jsx"
import {AiOutlineLeft} from 'react-icons/ai'
import {useGlobalContext} from '../AppContext.jsx'
import {PageLoading} from '../components/PageLoading.jsx'


export const StockDetailPage = () => {
    const {symbol} = useParams();
    const [chartData, setChartData] = useState();
    const navigate = useNavigate()
    const {pageLoading,setPageLoading} = useGlobalContext();

    useEffect(() => {
        const fetchData = async () => {
        try {
            setPageLoading(true)
            const responses = await Promise.all([
                fetch(`https://data-api.binance.vision/api/v3/klines?symbol=${symbol}&interval=15m&limit=100`).then(response => response.json()),
                fetch(`https://data-api.binance.vision/api/v3/klines?symbol=${symbol}&interval=1h&limit=150`).then(response => response.json()),
                fetch(`https://data-api.binance.vision/api/v3/klines?symbol=${symbol}&interval=1w&limit=60`).then(response => response.json()),
            ]);
            setChartData({
                day : responses[0].map((val)=> ({x: val[0], y: Number.parseFloat(val[4]).toFixed(3)})),
                week : responses[1].map((val)=> ({x: val[0], y: Number.parseFloat(val[4]).toFixed(3)})),
                year : responses[2].map((val)=> ({x: val[0], y: Number.parseFloat(val[4]).toFixed(3)}))
            })
            setPageLoading(false)
            } catch(err) {
                console.log(err)
                setPageLoading(false)
            }
        }
        fetchData();
    }, [symbol]);    

    return(
        <div className="container flex flex-col bg-stone-50 w-[85%] overflow-y-auto h-[90vh] mx-auto shadow-xl my-10 ring-1 ring-gray-900/5 rounded-md">
            {pageLoading && <PageLoading />}
            <span className="grid grid-cols-10">
                <AiOutlineLeft size={50} 
                    className="col-span-1 place-self-center fill-sky-400 shadow rounded-full p-2 bg-sky-100 transition duration-100 hover:scale-[.9] hover:bg-sky-200 hover:cursor-pointer"
                    onClick={() => navigate("/")}   
                />
                <h1 className="col-span-9 place-self-center text-center text-4xl text-sky-500 m-6 -ml-20 tracking-widest drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]">
                trade watchlist
            </h1>
            </span>
            {  
                chartData &&
                <StockChart  chartData={chartData} symbol={symbol}/>    
            }
            <StockData symbol={symbol}/>
        </div>
    );
}