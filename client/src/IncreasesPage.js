import './IncreasesPage.css';
import { Component } from 'react';
import Util from './Util';
import 'bootstrap/dist/css/bootstrap.css';
import { buildQueries } from '@testing-library/react';


class IncreasesPage extends Component
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

        let usdAnchorValue = u.getCookie("usdAnchorValue");
        let ethAnchorValue = u.getCookie("ethAnchorValue");
        let btcAnchorValue = u.getCookie("btcAnchorValue");
        let adaAnchorValue = u.getCookie("adaAnchorValue");
        let uselessAnchorValue = u.getCookie("uselessAnchorValue");
        let xusdAnchorValue = u.getCookie("xusdAnchorValue");

        let usdI = hui.getValueUSD()-usdAnchorValue;
        let ethI = hui.getValueETH()-ethAnchorValue;
        let btcI = hui.getValueBTC()-btcAnchorValue;
        let adaI = hui.getValueADA()-adaAnchorValue;
        let uselessI = hui.getValueUSELESS()-uselessAnchorValue;
        let xusdI = hui.getValueXUSD()-xusdAnchorValue;
        
        // let usdIF=(Math.round(usdI * 1000000000000000000) / 1000000000000000000).toFixed(18);        
        // let ethIF=(Math.round(ethI * 1000000000000000000) / 1000000000000000000).toFixed(18);        
        // let btcIF=(Math.round(btcI * 1000000000000000000) / 1000000000000000000).toFixed(18);        
        // let adaIF=(Math.round(adaI * 1000000000000000000) / 1000000000000000000).toFixed(18);        
                    
        
        let usdS=this.getSignificantDigitCount(usdI);
        let ethS=this.getSignificantDigitCount(ethI);
        let btcS=this.getSignificantDigitCount(btcI);
        let adaS=this.getSignificantDigitCount(adaI);
        let uselessS=this.getSignificantDigitCount(uselessI);
        let xusdS=this.getSignificantDigitCount(xusdI);

        let usdIF=usdI.toFixed(usdS);        
        let ethIF=ethI.toFixed(ethS);        
        let btcIF=btcI.toFixed(btcS);        
        let adaIF=adaI.toFixed(adaS);        
        let uselessIF=uselessI.toFixed(uselessS);        
        let xusdIF=xusdI.toFixed(xusdS);        

        let rUsd=0;
        let rEth=0;
        let rBtc=0;
        let rAda=0;
        let rUseless=0;
        let rXusd=0;


        let rUsdUsd=0;
        let rEthUsd=0;
        let rBtcUsd=0;
        let rAdaUsd=0;
        let rUselessUsd=0;
        let rXusdUsd=0;


        if (usdAnchorValue !== null && usdAnchorValue !==0)
        {
            let usdP = usdI/usdAnchorValue*100;
            rUsd = (Math.round(usdP * 100) / 100).toFixed(2);    
            rUsdUsd = usdI.toFixed(2);
        }
        if(ethAnchorValue != null && ethAnchorValue !==0)
        {
            let ethP = ethI/ethAnchorValue*100;
            rEth = (Math.round(ethP * 100) / 100).toFixed(2);

            let ethUsd = ethI*hui.getEthPrice();
            rEthUsd = (Math.round(ethUsd * 100) / 100).toFixed(2);

        }
        if (btcAnchorValue !==null && btcAnchorValue !==0)
        {
            let btcP = btcI/btcAnchorValue*100;
            rBtc = (Math.round(btcP * 100) / 100).toFixed(2);

            let btcUsd = btcI*hui.getBtcPrice();
            rBtcUsd = (Math.round(btcUsd * 100) / 100).toFixed(2);

        }
        if (adaAnchorValue !== null && adaAnchorValue !==0)
        {
            let adaP = adaI/adaAnchorValue*100;
            rAda = (Math.round(adaP * 100) / 100).toFixed(2);

            let adaUsd = adaI*hui.getAdaPrice();
            rAdaUsd = (Math.round(adaUsd * 100) / 100).toFixed(2);

        }

        if (uselessAnchorValue !== null && uselessAnchorValue !==0)
        {
            let uselessP = uselessI/uselessAnchorValue*100;
            rUseless = (Math.round(uselessP * 100) / 100).toFixed(2);

            let uselessUsd = uselessI*hui.getUselessPrice();
            rUselessUsd = (Math.round(uselessUsd * 100) / 100).toFixed(2);

        }

        if (xusdAnchorValue !== null && xusdAnchorValue !==0)
        {
            let xusdP = xusdI/xusdAnchorValue*100;
            rXusd = (Math.round(xusdP * 100) / 100).toFixed(2);    
            rXusdUsd = xusdI.toFixed(2);
        }


        return (            
            <div className="Increases">
                <div className="IncreasesContainer">
                    <ul className="IncreasesUl">
                        <li className="IncreasesB">Current: {hui.getValueUSD()} USD</li>
                        <li className="IncreasesL">Anchor:  {usdAnchorValue} USD</li>
                        <li className="IncreasesG">Incr:    {usdIF} USD</li>
                        <li className="IncreasesB">Incr:    {rUsd} %</li>
                        <li className="IncreasesG">USD:    ${rUsdUsd}</li>                
                    </ul>
                </div>
                <div className="IncreasesContainer">
                    <ul className="IncreasesUl">
                        <li className="IncreasesB">Current: {hui.getValueETH()} ETH</li>
                        <li className="IncreasesL">Anchor:  {ethAnchorValue} ETH</li>
                        <li className="IncreasesG">Incr:    {ethIF} ETH</li>
                        <li className="IncreasesB">Incr:    {rEth} %</li>
                        <li className="IncreasesG">USD:    ${rEthUsd}</li>                
                    </ul>
                </div>
                <div className="IncreasesContainer">
                    <ul className="IncreasesUl">
                        <li className="IncreasesB">Current: {hui.getValueBTC()} BTC</li>
                        <li className="IncreasesL">Anchor:  {btcAnchorValue} BTC</li>
                        <li className="IncreasesG">Incr:    {btcIF} BTC</li>
                        <li className="IncreasesB">Incr:    {rBtc} %</li>
                        <li className="IncreasesG">USD:    ${rBtcUsd}</li>                
                    </ul>
                </div>
                <div className="IncreasesContainer">
                    <ul className="IncreasesUl">
                        <li className="IncreasesB">Current: {hui.getValueADA()} ADA</li>
                        <li className="IncreasesL">Anchor:  {adaAnchorValue} ADA</li>
                        <li className="IncreasesG">Incr:    {adaIF} ADA</li>
                        <li className="IncreasesB">Incr:    {rAda} %</li>
                        <li className="IncreasesG">USD:    ${rAdaUsd}</li>                
                    </ul>
                </div>
                <div className="IncreasesContainer">
                    <ul className="IncreasesUl">
                        <li className="IncreasesB">Current: {hui.getValueUSELESS()} USLS</li>
                        <li className="IncreasesL">Anchor:  {uselessAnchorValue} USLS</li>
                        <li className="IncreasesG">Incr:    {uselessIF} USLS</li>
                        <li className="IncreasesB">Incr:    {rUseless} %</li>
                        <li className="IncreasesG">USD:    ${rUselessUsd}</li>                
                    </ul>
                </div>
                <div className="IncreasesContainer">
                    <ul className="IncreasesUl">
                        <li className="IncreasesB">Current: {hui.getValueXUSD()} XUSD</li>
                        <li className="IncreasesL">Anchor:  {xusdAnchorValue} XUSD</li>
                        <li className="IncreasesG">Incr:    {xusdIF} XUSD</li>
                        <li className="IncreasesB">Incr:    {rXusd} %</li>
                        <li className="IncreasesG">USD:    ${rXusdUsd}</li>                
                    </ul>
                </div>
           </div>);         
    }
}

export default IncreasesPage;