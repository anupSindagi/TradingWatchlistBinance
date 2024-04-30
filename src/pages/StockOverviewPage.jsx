// This page is used to display the overview of the coins from the watchlist
// @author Martin Li

import { PageLoading } from "../components/PageLoading.jsx"
import { AutoComplete } from '../components/AutoComplete.jsx'
import { StockList } from '../components/StockList.jsx'
import { useGlobalContext } from '../AppContext.jsx'


export const StockOverviewPage = () => {

    const { pageLoading, apiError } = useGlobalContext();

    return (
        <div className="container bg-stone-50 w-[80vw] h-[90vh] mx-auto my-10 shadow-xl ring-1 ring-gray-900/5 rounded-md relative max-w-full">
            <div className="overflow-x-auto p-2">
                {pageLoading && <PageLoading />}
                <AutoComplete />
                <StockList />
            </div>
        </div>
    );
}