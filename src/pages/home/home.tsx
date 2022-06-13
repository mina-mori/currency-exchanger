import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ConverterStickyPanel from '../../components/featured/converter-sticky-panel/converterStickyPanel';
import Card from '../../components/shared/card/card';
import './home.scss'
const Home = () => {
    const [rates, setRates] = useState<string[]>([]);
    const retrieveRates = (allRates: string[], amount: number) => {
        let temp: string[] = [];
        Object.entries(allRates).map(
            ([key, value]): any => temp.push(`${Number.parseFloat(value) * amount} ${key}`));
        setRates([...temp]);
    }

    useEffect(() => {
    }, [rates]);


    return (
        <>
            <ConverterStickyPanel retrieveAllRates={retrieveRates}></ConverterStickyPanel>
            <div className='currencies-grid'>
                {rates.map((currency: string, index: number) => (
                    <div key={index} className='column'>
                        <Card cardBody={currency}></Card>
                    </div>

                ))}
            </div>
        </>
    )

}
export default Home;