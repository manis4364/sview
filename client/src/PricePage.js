import './PricePage.css';
import { Component } from 'react';
import Util from './Util';
import 'bootstrap/dist/css/bootstrap.css';

class PricePage extends Component
{
    constructor(props) 
    {
        super(props);
        this.state = {};
    }

    componentDidMount() 
    {        
        let u =  Util.getInstance();        
        u.setIncreasesUI(this);        
    }
    
    getSignificantDigitCount(n) 
    {
        var log10 = Math.log(10);
        n = Math.abs(String(n).replace(".", "")); //remove decimal and make positive
        if (n == 0) return 0;
        while (n != 0 && n % 10 == 0) n /= 10; //kill the 0s at the end of n

        return Math.floor(Math.log(n) / log10) + 1; //get number of digits
    }

    render() 
    {
        let u = Util.getInstance();
        let hui = u.getHoldingsUI();
        
        let rEthUsd = hui.getEthPrice();
        let rBtcUsd = hui.getBtcPrice();
        let rAdaUsd = hui.getAdaPrice(); 
        let rUselessUsd = hui.getUselessPrice();

        
        let sUsdPrice=0;
        let sUsdPriceUsd=0;
        if (hui.getNumUSD() !==0)
        {
            sUsdPrice=hui.getValueUSD()/hui.getNumUSD();
            sUsdPriceUsd = sUsdPrice;
        }

        let xUsdPrice=0;
        let xUsdPriceUsd=0;
        if (hui.getNumXUSD() !==0)
        {
            xUsdPrice=hui.getValueXUSD()/hui.getNumXUSD();
            xUsdPriceUsd = xUsdPrice;
        }


        let sEthPrice=0;        
        let sEthPriceUsd = 0;
        if (hui.getNumETH() !==0)
        {
            sEthPrice=hui.getValueETH()/hui.getNumETH();
            sEthPriceUsd = sEthPrice*rEthUsd;
        }

        

        let sBtcPrice=0;        
        let sBtcPriceUsd = 0;
        if (hui.getNumBTC() !==0)
        {
            sBtcPrice=hui.getValueBTC()/hui.getNumBTC();
            sBtcPriceUsd = sBtcPrice*rBtcUsd;
        }

        let sAdaPrice=0;        
        let sAdaPriceUsd = 0;
        if (hui.getNumADA() !==0)
        {
            sAdaPrice=hui.getValueADA()/hui.getNumADA();
            sAdaPriceUsd =sAdaPrice*rAdaUsd;
        }

        let sUselessPrice=0;        
        let sUselessPriceUsd = 0;
        if (hui.getNumUSELESS() !==0)
        {
            sUselessPrice=hui.getValueUSELESS()/hui.getNumUSELESS();
            sUselessPriceUsd =sUselessPrice*rUselessUsd;
        }

        return (            
            <div className="Prices">
              <div className="PriceContainer">
                    <ul className="PriceUl">
                        <li className="PriceB">1 USD  = $1</li>
                        <li className="PriceL">1 SUSD = {sUsdPrice.toFixed(18)} USD  </li>
                        <li className="PriceB">1 SUSD = ${sUsdPriceUsd.toFixed(18)}</li>
                    </ul>
                </div>                
                <div className="PriceContainer">
                    <ul className="PriceUl">
                        <li className="PriceB">1 ETH  = ${rEthUsd.toFixed(3)}</li>
                        <li className="PriceL">1 SETH = {sEthPrice.toFixed(18)} ETH  </li>
                        <li className="PriceB">1 SETH = ${sEthPriceUsd.toFixed(18)}</li>
                    </ul>
                </div>
                <div className="PriceContainer">
                    <ul className="PriceUl">
                        <li className="PriceB">1 BTC  = ${rBtcUsd.toFixed(3)}</li>
                        <li className="PriceL">1 SBTC = {sBtcPrice.toFixed(18)} BTC  </li>
                        <li className="PriceB">1 SBTC = ${sBtcPriceUsd.toFixed(18)}</li>
                    </ul>
                </div>
                <div className="PriceContainer">
                    <ul className="PriceUl">
                        <li className="PriceB">1 ADA  = ${rAdaUsd.toFixed(3)}</li>
                        <li className="PriceL">1 SADA = {sAdaPrice.toFixed(18)} ADA  </li>
                        <li className="PriceB">1 SADA = ${sAdaPriceUsd.toFixed(18)}</li>
                    </ul>
                </div>
                <div className="PriceContainer">
                    <ul className="PriceUl">
                        <li className="PriceB">1 USLS  = ${rUselessUsd.toFixed(11)}</li>
                        <li className="PriceL">1 SUSLS = {sUselessPrice.toFixed(11)} USLS  </li>
                        <li className="PriceB">1 SUSLS = ${sUselessPriceUsd.toFixed(11)}</li>
                    </ul>
                </div>
                <div className="PriceContainer">
                    <ul className="PriceUl">
                        <li className="PriceB">1 USD  = $1</li>
                        <li className="PriceL">1 XUSD = {xUsdPrice.toFixed(18)} USD  </li>
                        <li className="PriceB">1 XUSD = ${xUsdPriceUsd.toFixed(18)}</li>
                    </ul>
                </div>                

           </div>);         
    }
}

export default PricePage;