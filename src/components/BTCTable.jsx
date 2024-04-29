export const BTCTable = ({btcWinner, btcLoser, usdtWinner, usdtLoser}) => {

    return (
        <div className="grid grid-cols-4 gap-4 mx-8 px-8 my-4">
            <div>
                <h2 className="text-center text-xl font-bold text-sky-500">
                    BTC Winner Table
                </h2>
                <table className="min-w-full">
                    <thead className="bg-sky-100">
                        <tr>
                            <th className="px-4 py-2">Symbol</th>
                            <th className="px-4 py-2">% Change</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {btcWinner.map((item, index) => (
                            <tr key={index} className="even:bg-sky-50">
                                <td className="px-4 py-2">{item.symbol}</td>
                                <td className="px-4 py-2 text-green-600">
                                    {item.priceChangePercent}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <h2 className="text-center text-xl font-bold text-sky-500">
                    BTC Loser Table
                </h2>
                <table className="min-w-full">
                    <thead className="bg-sky-100">
                        <tr>
                            <th className="px-4 py-2">Symbol</th>
                            <th className="px-4 py-2">% Change</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {btcLoser.map((item, index) => (
                            <tr key={index} className="even:bg-sky-50">
                                <td className="px-4 py-2">{item.symbol}</td>
                                <td className="px-4 py-2 text-red-600">
                                    {item.priceChangePercent}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <h2 className="text-center text-xl font-bold text-sky-500">
                    USDT Winner Table
                </h2>
                <table className="min-w-full">
                    <thead className="bg-sky-100">
                        <tr>
                            <th className="px-4 py-2">Symbol</th>
                            <th className="px-4 py-2">% Change</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {usdtWinner.map((item, index) => (
                            <tr key={index} className="even:bg-sky-50">
                                <td className="px-4 py-2">{item.symbol}</td>
                                <td className="px-4 py-2 text-green-600">
                                    {item.priceChangePercent}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <h2 className="text-center text-xl font-bold text-sky-500">
                    USDT Loser Table
                </h2>
                <table className="min-w-full">
                    <thead className="bg-sky-100">
                        <tr>
                            <th className="px-4 py-2">Symbol</th>
                            <th className="px-4 py-2">% Change</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {usdtLoser.map((item, index) => (
                            <tr key={index} className="even:bg-sky-50">
                                <td className="px-4 py-2">{item.symbol}</td>
                                <td className="px-4 py-2 text-red-600">
                                    {item.priceChangePercent}%
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};