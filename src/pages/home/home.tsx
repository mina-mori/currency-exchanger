import { useEffect, useState } from 'react';
import ConverterStickyPanel from '../../components/featured/converter-sticky-panel/converterStickyPanel';
import Matrix from '../../components/featured/matrix/matrix';
import './home.scss'
const Home = () => {
    const [base, setBase] = useState<string>();
    const [amount, setAmount] = useState<number>(1);
    const [hidden, hideMatrix] = useState<boolean>(false);
    const setMatrixProps = (base: string, amount: number) => {
        hideMatrix(false);
        setBase(base);
        setAmount(amount);
    }

    return (
        <>
            <h3 className='mb-3'>Currency Exchanger</h3>
            <ConverterStickyPanel amount={amount} currencyFrom='EUR' currencyTo='USD' onDataChange={() => { hideMatrix(true) }} onConvert={setMatrixProps}></ConverterStickyPanel>
            {!hidden && base && amount && <Matrix base={base} amount={amount}></Matrix>}
        </>
    )

}
export default Home;