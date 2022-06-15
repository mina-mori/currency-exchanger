import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ConverterStickyPanel from '../../components/featured/converter-sticky-panel/converterStickyPanel';
import LineChart from '../../components/shared/line-chart/lineChart';
import { currenciesSelector, setCurrenciesAbbr, setCurrenciesName } from '../../redux/currenciesSlice';
import { CurrencyService } from '../../services/currencyService';
import { DateHelper } from '../../utils/dateHelper';
import './details.scss';
const Details = () => {
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const currencyService = new CurrencyService();
    const dateHelper = DateHelper.getInstance();
    const { amount, from, to }: any = useParams();
    const { currenciesName } = useSelector(currenciesSelector);
    const [title, setTitle] = useState<string | undefined>();
    const [dimension, setDimention] = useState<string[]>([]);
    const [measure, setMeasure] = useState<number[]>([]);
    useEffect(() => {
        getTitle();
    }, []);
    const getTitle = () => {
        if (currenciesName && Object.keys(currenciesName).length > 0) {
            const currencyName = currenciesName[`${from}`];
            setTitle(currencyName);
        }
        else {
            currencyService.getAllCurrencies().subscribe((response: any) => {
                if (response?.success == true) {
                    const currencies = Object.keys(response.symbols)
                    dispatch(setCurrenciesAbbr([...currencies]));
                    dispatch(setCurrenciesName(response.symbols));
                    const currencyName = response.symbols[`${from}`];
                    setTitle(currencyName);
                }
            });
        }
    }
    const getMonthlyHistoricalData = () => {
        const currentDate = new Date();
        const DateFromOneYear = new Date(currentDate.setFullYear(currentDate.getFullYear() - 1));
        const endDate = new Date().toISOString().substring(0, 10);
        const startDate = DateFromOneYear.toISOString().substring(0, 10);
        return currencyService.getHistoricalData(from, to, startDate, endDate).subscribe((response: any) => {
            if (response?.success) {
                let monthes: string[] = [];
                let data: any[] = [];
                Object.entries(response.rates).map(
                    ([key, value]) => {
                        const currentDateArray = key.split('-');
                        const lastDayinMonth = dateHelper.getLastDayOfMonth(currentDateArray[0], currentDateArray[1])
                        if (lastDayinMonth == key) {
                            monthes.push(` ${currentDateArray[1]}/${currentDateArray[0]}`);
                            const val: any = value;
                            data.push(Object.values(val)[0]);
                        }
                    });

                setDimention(monthes);
                setMeasure(data);
            }
        });

    }
    const resetChartDate = () => {
        setDimention([]);
        setMeasure([]);
    }
    return (
        <>
            <div className='details-header'>
                <h3>{title}</h3>
                <button onClick={() => navigation('/home')}>Back to Home</button>
            </div>
            <ConverterStickyPanel inDetailsMode={true} amount={amount} currencyFrom={from} currencyTo={to} onConvert={getMonthlyHistoricalData} onDataChange={resetChartDate}></ConverterStickyPanel>
            {dimension.length > 0 && measure.length > 0 && <div>
                <h4 className='mt-4 mb-4'>Monthly Historical Rates</h4>
                <LineChart dimension={dimension} measure={measure}></LineChart>
            </div>}
        </>
    );
}
export default Details;