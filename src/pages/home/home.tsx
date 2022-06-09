import { useEffect, useState } from 'react';
import ConverterStickyPanel from '../../components/featured/converter-sticky-panel/converterStickyPanel';
import Card from '../../components/shared/card/card';
import './home.scss'
const Home = () => {
    useEffect(() => {
        setCurrencies(['Currency 1', 'Currency 2', 'Currency 3', 'Currency 4', 'Currency 5', 'Currency 6', 'Currency 7', 'Currency 8', 'Currency 9'])
    }, []);
    const [currencies, setCurrencies] = useState<string[]>([]);
    return (
        <>
            <ConverterStickyPanel displayDetailsButton={true}></ConverterStickyPanel>
            <div className='currencies-grid'>
                {currencies.map((currency: string, index: number) => (
                    <div key={index} className='column'>
                        <Card cardBody={currency}></Card>
                    </div>

                ))}
            </div>
        </>
    )

}
export default Home;