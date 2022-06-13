import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ConverterStickyPanel from '../../components/featured/converter-sticky-panel/converterStickyPanel';
import Matrix from '../../components/featured/matrix/matrix';
import Card from '../../components/shared/card/card';
import './home.scss'
const Home = () => {
    const [base, setBase] = useState<string>();
    const [amount, setAmount] = useState<number>();
    const setMatrixProps = (base: string, amount: number) => {
        setBase(base);
        setAmount(amount);
    }

    return (
        <>
            <ConverterStickyPanel callback={setMatrixProps}></ConverterStickyPanel>
            {base && amount && <Matrix base={base} amount={amount}></Matrix>}
        </>
    )

}
export default Home;