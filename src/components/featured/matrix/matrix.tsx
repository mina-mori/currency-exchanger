import { useEffect, useState } from "react";
import { MatrixProps } from "../../../models/matrixProps";
import { CurrencyService } from "../../../services/currencyService";
import Card from "../../shared/card/card";

const Matrix = (props: MatrixProps) => {
    const [rates, setRates] = useState<string[]>([]);
    const currencyService = new CurrencyService();

    useEffect(() => {
        if (props.base && props.amount)
            getRates(props.base, props.amount);
    }, []);

    const getRates = (base: string, amount: number) => {
        currencyService.getLatest(base).then((response: any) => {
            if (response.success == true) {
                const rates: string[] = response.rates;
                let temp: string[] = [];
                if (rates) {
                    Object.entries(rates).forEach(
                        ([key, value]) => temp.push(`${(Number.parseFloat(value) * amount).toFixed(6)} ${key}`));
                    setRates([...temp]);
                }
            }
        });

    }

    return (
        <div className='currencies-grid'>
            {rates.map((currency: string, index: number) => (
                <div key={index} className='column'>
                    <Card cardBody={currency}></Card>
                </div>

            ))}
        </div>
    )
}
export default Matrix;