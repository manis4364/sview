import './FarmPage.css';
import { Component } from 'react';
import Util from './Util';
import 'bootstrap/dist/css/bootstrap.css';
import Buttons from './Buttons';



class FarmPage extends Component
{
    constructor(props) 
    {
        super(props);
        this.state = {};

    }

    componentDidMount() 
    {        
        let u =  Util.getInstance();        
        u.setFarmPageUI(this);        
    }

    
    render() 
    {
        let u = Util.getInstance();
        let hui = u.getHoldingsUI();
        let b = hui.getFarmInfo();
        let c = hui.getBnbFarmInfo();
        let d = hui.getSbtcFarmInfo();
        let e = hui.getSadaFarmInfo();
        let f = hui.getSuslsFarmInfo();
        let bui = u.getButtonsUI();

        let bnbUsd= b.fmRedeemableBNB*hui.getBnbPrice();
        let rBnbUsd = (Math.round(bnbUsd * 100) / 100).toFixed(2);
        
        let totalUsd = hui.getValueFARM_USD();

        /*The fm.daysLeftToUnlock is roughly 3 seconds/block, not 1 second like I assumed */
        let days = (b.fmDaysToUnlock*3)/(60*60*24);
        let rDays = (Math.round(days * 100) / 100).toFixed(2);

        let newBnbUsd= c.bnbRedeemableBNB*hui.getBnbPrice();
        let newRBnbUsd = (Math.round(newBnbUsd * 100) / 100).toFixed(2);
        
        let newTotalUsd = hui.getBnbValueFARM_USD();

        /*The fm.daysLeftToUnlock is roughly 3 seconds/block, not 1 second like I assumed */
        let newDays = (c.bnbDaysToUnlock*3)/(60*60*24);
        let newRDays = (Math.round(newDays * 100) / 100).toFixed(2);

        let btcTotalUsd = hui.getBtcValueFARM_USD();
        let btcDays = (d.btcDaysToUnlock*3)/(60*60*24);
        let btcRDays = (Math.round(btcDays * 100) / 100).toFixed(2);

        let adaTotalUsd = hui.getAdaValueFARM_USD();
        let adaDays = (e.adaDaysToUnlock*3)/(60*60*24);
        let adaRDays = (Math.round(adaDays * 100) / 100).toFixed(2);

        let uslsTotalUsd = hui.getUslsValueFARM_USD();
        let uslsDays = (f.uslsDaysToUnlock*3)/(60*60*24);
        let uslsRDays = (Math.round(uslsDays * 100) / 100).toFixed(2);


        if (bui.getFarmButtonState() === Buttons.FARM_OLD)
        {
            return (                        
                <div className="FarmPage">
                    <p className="FarmP"><b>Original Bnb Farm Contract</b></p>
                    <div className="FarmContainer">
                        <ul className="FarmUl">
                            <li className="FarmB"><b> Number Of Farm Tokens</b></li>
                            <li className="FarmL">{b.fmNumFarmTokens} BNB-XUSD </li>
                        </ul>
                    </div>
                    <div className="FarmContainer">
                        <ul className="FarmUl">
                            <li className="FarmB"><b> Paired Tokens</b></li>
                            <li className="FarmL">{b.fmRedeemableXUSD} XUSD </li>
                            <li className="FarmL">{b.fmRedeemableBNB} BNB </li>
                        </ul>
                    </div>
                    <div className="FarmContainer">
                        <ul className="FarmUl">
                            <li className="FarmB"><b> Value of Paired Tokens in USD</b></li>
                            <FarmXusdToUsd/>                        
                            <li className="FarmG">${rBnbUsd} USD (For BNB) </li>
                        </ul>
                    </div>
                    <div className="FarmContainer">
                        <ul className="FarmUl">
                            <li className="FarmB"><b> Pending Rewards</b></li>
                            <li className="FarmL">{b.fmPendingRewards} XUSD </li>
                            <FarmPendingXusdToUsd/>                        
                        </ul>
                    </div>
                    <div className="FarmContainer">
                        <ul className="FarmUl">
                            <li className="FarmB"><b> Total Known Value in Farm</b></li>                        
                            <li className="FarmG">${totalUsd} USD  </li>
                        </ul>
                    </div>
                    <div className="FarmContainer">
                        <ul className="FarmUl">
                            <li className="FarmB"><b> Time to Unlock Funds (1Block ~ 3 secs)</b></li>
                            <li className="FarmL">{b.fmDaysToUnlock} Blocks  </li>
                            <li className="FarmL">{rDays} Days  </li>
                        </ul>
                    </div>
            </div>);       
       }  

       if (bui.getFarmButtonState() === Buttons.FARM_BNB)
       {
            return (                        
                <div className="FarmPage">
                    <p className="FarmP"><b>New Bnb Farm Contract</b></p>
                    <div className="FarmContainer">
                        <ul className="FarmUl">
                            <li className="FarmB"><b> Number Of Farm Tokens</b></li>
                            <li className="FarmL">{c.bnbNumFarmTokens} BNB-XUSD </li>
                        </ul>
                    </div>
                    <div className="FarmContainer">
                        <ul className="FarmUl">
                            <li className="FarmB"><b> Paired Tokens</b></li>
                            <li className="FarmL">{c.bnbRedeemableXUSD} XUSD </li>
                            <li className="FarmL">{c.bnbRedeemableBNB} BNB </li>
                        </ul>
                    </div>
                    <div className="FarmContainer">
                        <ul className="FarmUl">
                            <li className="FarmB"><b> Value of Paired Tokens in USD</b></li>
                            <BnbFarmXusdToUsd/>                        
                            <li className="FarmG">${newRBnbUsd} USD (For BNB) </li>
                        </ul>
                    </div>
                    <div className="FarmContainer">
                        <ul className="FarmUl">
                            <li className="FarmB"><b> Pending Rewards</b></li>
                            <li className="FarmL">{c.bnbPendingRewards} XUSD </li>
                            <BnbFarmPendingXusdToUsd/>                        
                        </ul>
                    </div>
                    <div className="FarmContainer">
                        <ul className="FarmUl">
                            <li className="FarmB"><b> Total Known Value in Farm</b></li>                        
                            <li className="FarmG">${newTotalUsd} USD  </li>
                        </ul>
                    </div>
                    <div className="FarmContainer">
                        <ul className="FarmUl">
                            <li className="FarmB"><b> Time to Unlock Funds (1Block ~ 3 secs)</b></li>
                            <li className="FarmL">{c.bnbDaysToUnlock} Blocks  </li>
                            <li className="FarmL">{newRDays} Days  </li>
                        </ul>
                    </div>
            </div>);       
       }  

       if (bui.getFarmButtonState() === Buttons.FARM_SBTC)
       {
            return (                        
                <div className="FarmPage">
                    <p className="FarmP"><b>Sbtc Farm Contract</b></p>
                    <div className="FarmContainer">
                        <ul className="FarmUl">
                            <li className="FarmB"><b> Number Of Farm Tokens</b></li>
                            <li className="FarmL">{d.btcNumFarmTokens} SBTC-XUSD </li>
                        </ul>
                    </div>
                    <div className="FarmContainer">
                        <ul className="FarmUl">
                            <li className="FarmB"><b> Paired Tokens</b></li>                            
                            <li className="FarmL">{d.btcRedeemableXUSD} XUSD </li>
                            <li className="FarmL">{d.btcRedeemableSBTC} SBTC </li>
                        </ul>
                    </div>
                    <div className="FarmContainer">
                        <ul className="FarmUl">
                            <li className="FarmB"><b> Value of Paired Tokens in USD</b></li>
                            <BtcFarmXusdToUsd/> 
                            <BtcFarmSBtcToUsd/>                       
                        </ul>
                    </div>                    
                    <div className="FarmContainer">
                        <ul className="FarmUl">
                            <li className="FarmB"><b>Pending Rewards</b></li>                            
                            <li className="FarmL">{d.btcPendingRewardsXUSD} XUSD </li>
                            <li className="FarmL">{d.btcPendingRewardsSBTC} SBTC </li>
                        </ul>
                    </div>
                    <div className="FarmContainer">
                        <ul className="FarmUl">
                            <li className="FarmB"><b> Value Of Pending Rewards</b></li>                            
                            <BtcFarmPendingXusdToUsd/>                        
                            <BtcFarmPendingSBtcToUsd/>
                        </ul>
                    </div>
                    <div className="FarmContainer">
                        <ul className="FarmUl">
                            <li className="FarmB"><b> Total Known Value in Farm</b></li>                        
                            <li className="FarmG">${btcTotalUsd} USD  </li>
                        </ul>
                    </div>
                    <div className="FarmContainer">
                        <ul className="FarmUl">
                            <li className="FarmB"><b> Time to Unlock Funds (1Block ~ 3 secs)</b></li>
                            <li className="FarmL">{d.btcDaysToUnlock} Blocks  </li>
                            <li className="FarmL">{btcRDays} Days  </li>
                        </ul>
                    </div>
            </div>);       
       }  

       if (bui.getFarmButtonState() === Buttons.FARM_SADA)
       {
        return (                        
            <div className="FarmPage">
                <p className="FarmP"><b>Sada Farm Contract</b></p>
                <div className="FarmContainer">
                    <ul className="FarmUl">
                        <li className="FarmB"><b> Number Of Farm Tokens</b></li>
                        <li className="FarmL">{e.adaNumFarmTokens} SADA-XUSD </li>
                    </ul>
                </div>
                <div className="FarmContainer">
                    <ul className="FarmUl">
                        <li className="FarmB"><b> Paired Tokens</b></li>                            
                        <li className="FarmL">{e.adaRedeemableXUSD} XUSD </li>
                        <li className="FarmL">{e.adaRedeemableSADA} SADA </li>
                    </ul>
                </div>
                <div className="FarmContainer">
                    <ul className="FarmUl">
                        <li className="FarmB"><b> Value of Paired Tokens in USD</b></li>
                        <AdaFarmXusdToUsd/> 
                        <AdaFarmSAdaToUsd/>                       
                    </ul>
                </div>
                <div className="FarmContainer">
                        <ul className="FarmUl">
                            <li className="FarmB"><b>Pending Rewards</b></li>                            
                            <li className="FarmL">{e.adaPendingRewardsXUSD} XUSD </li>
                            <li className="FarmL">{e.adaPendingRewardsSADA} SADA </li>
                        </ul>
                    </div>
                <div className="FarmContainer">
                        <ul className="FarmUl">
                            <li className="FarmB"><b> Value Of Pending Rewards</b></li>                            
                            <AdaFarmPendingXusdToUsd/>                        
                            <AdaFarmPendingSAdaToUsd/>
                        </ul>
                </div>
                <div className="FarmContainer">
                    <ul className="FarmUl">
                        <li className="FarmB"><b> Total Known Value in Farm</b></li>                        
                        <li className="FarmG">${adaTotalUsd} USD  </li>
                    </ul>
                </div>
                <div className="FarmContainer">
                    <ul className="FarmUl">
                        <li className="FarmB"><b> Time to Unlock Funds (1Block ~ 3 secs)</b></li>
                        <li className="FarmL">{e.adaDaysToUnlock} Blocks  </li>
                        <li className="FarmL">{adaRDays} Days  </li>
                    </ul>
                </div>
        </div>);       

       }  

       if (bui.getFarmButtonState() === Buttons.FARM_SUSLS)
       {
        return (                        
            <div className="FarmPage">
                <p className="FarmP"><b>Susls Farm Contract</b></p>
                <div className="FarmContainer">
                    <ul className="FarmUl">
                        <li className="FarmB"><b> Number Of Farm Tokens</b></li>
                        <li className="FarmL">{f.uslsNumFarmTokens} SUSLS-XUSD </li>
                    </ul>
                </div>
                <div className="FarmContainer">
                    <ul className="FarmUl">
                        <li className="FarmB"><b> Paired Tokens</b></li>                            
                        <li className="FarmL">{f.uslsRedeemableXUSD} XUSD </li>
                        <li className="FarmL">{f.uslsRedeemableSUSLS} SUSLS </li>
                    </ul>
                </div>
                <div className="FarmContainer">
                    <ul className="FarmUl">
                        <li className="FarmB"><b> Value of Paired Tokens in USD</b></li>
                        <UslsFarmXusdToUsd/> 
                        <UslsFarmSUslsToUsd/>                       
                    </ul>
                </div>
                <div className="FarmContainer">
                        <ul className="FarmUl">
                            <li className="FarmB"><b>Pending Rewards</b></li>                            
                            <li className="FarmL">{f.uslsPendingRewardsXUSD} XUSD </li>
                            <li className="FarmL">{f.uslsPendingRewardsSUSLS} SUSLS </li>
                        </ul>
                    </div>
                <div className="FarmContainer">
                        <ul className="FarmUl">
                            <li className="FarmB"><b> Value Of Pending Rewards</b></li>
                            <UslsFarmPendingXusdToUsd/>                        
                            <UslsFarmPendingSUslsToUsd/>
                        </ul>
                </div>
                <div className="FarmContainer">
                    <ul className="FarmUl">
                        <li className="FarmB"><b> Total Known Value in Farm</b></li>                        
                        <li className="FarmG">${uslsTotalUsd} USD  </li>
                    </ul>
                </div>
                <div className="FarmContainer">
                    <ul className="FarmUl">
                        <li className="FarmB"><b> Time to Unlock Funds (1Block ~ 3 secs)</b></li>
                        <li className="FarmL">{f.uslsDaysToUnlock} Blocks  </li>
                        <li className="FarmL">{uslsRDays} Days  </li>
                    </ul>
                </div>
        </div>);        
       }  
    }
        
}

function FarmXusdToUsd()
{
    let u = Util.getInstance();
    let hui = u.getHoldingsUI();
    let b = hui.getFarmInfo();

    if (hui.getXUSDPrice()===-1)
    {
        return (
            <li className="FarmG">No XUSD Price. You need to buy a little XUSD to get price </li>
        );
    }
    else
    {

        let usd= b.fmRedeemableXUSD*hui.getXUSDPrice();
        let rUsd = (Math.round(usd * 100) / 100).toFixed(2);

        return(
            <li className="FarmG">${rUsd} USD (For XUSD) </li>
        );
    }
    
}

function FarmPendingXusdToUsd()
{
    let u = Util.getInstance();
    let hui = u.getHoldingsUI();
    let b = hui.getFarmInfo();

    if (hui.getXUSDPrice()===-1)
    {
        return (
            <li className="FarmG">No XUSD Price. You need to buy a little XUSD to get price </li>
        );
    }
    else
    {

        let usd= b.fmPendingRewards*hui.getXUSDPrice();
        let rUsd = (Math.round(usd * 100) / 100).toFixed(2);

        return(
            <li className="FarmG">${rUsd} USD </li>
        );
    }
    
}


function BnbFarmXusdToUsd()
{
    let u = Util.getInstance();
    let hui = u.getHoldingsUI();
    let b = hui.getBnbFarmInfo();

    if (hui.getXUSDPrice()===-1)
    {
        return (
            <li className="FarmG">No XUSD Price. You need to buy a little XUSD to get price </li>
        );
    }
    else
    {

        let usd= b.bnbRedeemableXUSD*hui.getXUSDPrice();
        let rUsd = (Math.round(usd * 100) / 100).toFixed(2);

        return(
            <li className="FarmG">${rUsd} USD (For XUSD) </li>
        );
    }
    
}

function BnbFarmPendingXusdToUsd()
{
    let u = Util.getInstance();
    let hui = u.getHoldingsUI();
    let b = hui.getBnbFarmInfo();

    if (hui.getXUSDPrice()===-1)
    {
        return (
            <li className="FarmG">No XUSD Price. You need to buy a little XUSD to get price </li>
        );
    }
    else
    {
        let usd= b.bnbPendingRewards*hui.getXUSDPrice();
        let rUsd = (Math.round(usd * 100) / 100).toFixed(2);

        return(
            <li className="FarmG">${rUsd} USD </li>
        );
    }    
}

function BtcFarmXusdToUsd()
{
    let u = Util.getInstance();
    let hui = u.getHoldingsUI();
    let b = hui.getSbtcFarmInfo();

    if (hui.getXUSDPrice()===-1)
    {
        return (
            <li className="FarmG">No XUSD Price. You need to buy a little XUSD to get price </li>
        );
    }
    else
    {

        let usd= b.btcRedeemableXUSD*hui.getXUSDPrice();
        let rUsd = (Math.round(usd * 100) / 100).toFixed(2);

        return(
            <li className="FarmG">${rUsd} USD (For XUSD) </li>
        );
    }
    
}

function BtcFarmPendingXusdToUsd()
{
    let u = Util.getInstance();
    let hui = u.getHoldingsUI();
    let b = hui.getSbtcFarmInfo();

    if (hui.getXUSDPrice()===-1)
    {
        return (
            <li className="FarmG">No XUSD Price. You need to buy a little XUSD to get price </li>
        );
    }
    else
    {
        let usd= b.btcPendingRewardsXUSD*hui.getXUSDPrice();
        let rUsd = (Math.round(usd * 100) / 100).toFixed(2);

        return(
            <li className="FarmG">${rUsd} USD (For XUSD)</li>
        );
    }    
}

function BtcFarmSBtcToUsd()
{
    let u = Util.getInstance();
    let hui = u.getHoldingsUI();
    let b = hui.getSbtcFarmInfo();

    if (hui.getSBTCPrice()===-1)
    {
        return (
            <li className="FarmG">No SBTC Price. You need to buy a little SBTC to get price </li>
        );
    }
    else
    {

        let usd= b.btcRedeemableSBTC*hui.getSBTCPrice();
        let rUsd = (Math.round(usd * 100) / 100).toFixed(2);

        return(
            <li className="FarmG">${rUsd} USD (For SBTC) </li>
        );
    }
    
}

function BtcFarmPendingSBtcToUsd()
{
    let u = Util.getInstance();
    let hui = u.getHoldingsUI();
    let b = hui.getSbtcFarmInfo();

    if (hui.getSBTCPrice()===-1)
    {
        return (
            <li className="FarmG">No SBTC Price. You need to buy a little SBTC to get price </li>
        );
    }
    else
    {
        let usd= b.btcPendingRewardsSBTC*hui.getSBTCPrice();
        let rUsd = (Math.round(usd * 100) / 100).toFixed(2);

        return(
            <li className="FarmG">${rUsd} USD (For SBTC) </li>
        );
    }    
}


function AdaFarmXusdToUsd()
{
    let u = Util.getInstance();
    let hui = u.getHoldingsUI();
    let b = hui.getSadaFarmInfo();

    if (hui.getXUSDPrice()===-1)
    {
        return (
            <li className="FarmG">No XUSD Price. You need to buy a little XUSD to get price </li>
        );
    }
    else
    {

        let usd= b.adaRedeemableXUSD*hui.getXUSDPrice();
        let rUsd = (Math.round(usd * 100) / 100).toFixed(2);

        return(
            <li className="FarmG">${rUsd} USD (For XUSD) </li>
        );
    }
    
}

function AdaFarmPendingXusdToUsd()
{
    let u = Util.getInstance();
    let hui = u.getHoldingsUI();
    let b = hui.getSadaFarmInfo();

    if (hui.getXUSDPrice()===-1)
    {
        return (
            <li className="FarmG">No XUSD Price. You need to buy a little XUSD to get price </li>
        );
    }
    else
    {
        let usd= b.adaPendingRewardsXUSD*hui.getXUSDPrice();
        let rUsd = (Math.round(usd * 100) / 100).toFixed(2);

        return(
            <li className="FarmG">${rUsd} USD (For XUSD)</li>
        );
    }    
}

function AdaFarmSAdaToUsd()
{
    let u = Util.getInstance();
    let hui = u.getHoldingsUI();
    let b = hui.getSadaFarmInfo();

    if (hui.getSADAPrice()===-1)
    {
        return (
            <li className="FarmG">No SADA Price. You need to buy a little SADA to get price </li>
        );
    }
    else
    {

        let usd= b.adaRedeemableSADA*hui.getSADAPrice();
        let rUsd = (Math.round(usd * 100) / 100).toFixed(2);

        return(
            <li className="FarmG">${rUsd} USD (For SADA) </li>
        );
    }
    
}

function AdaFarmPendingSAdaToUsd()
{
    let u = Util.getInstance();
    let hui = u.getHoldingsUI();
    let b = hui.getSadaFarmInfo();

    if (hui.getSADAPrice()===-1)
    {
        return (
            <li className="FarmG">No SADA Price. You need to buy a little SADA to get price </li>
        );
    }
    else
    {
        let usd= b.adaPendingRewardsSADA*hui.getSADAPrice();
        let rUsd = (Math.round(usd * 100) / 100).toFixed(2);

        return(
            <li className="FarmG">${rUsd} USD (For SADA) </li>
        );
    }    
}


function UslsFarmXusdToUsd()
{
    let u = Util.getInstance();
    let hui = u.getHoldingsUI();
    let b = hui.getSuslsFarmInfo();

    if (hui.getXUSDPrice()===-1)
    {
        return (
            <li className="FarmG">No XUSD Price. You need to buy a little XUSD to get price </li>
        );
    }
    else
    {

        let usd= b.uslsRedeemableXUSD*hui.getXUSDPrice();
        let rUsd = (Math.round(usd * 100) / 100).toFixed(2);

        return(
            <li className="FarmG">${rUsd} USD (For XUSD) </li>
        );
    }
    
}

function UslsFarmPendingXusdToUsd()
{
    let u = Util.getInstance();
    let hui = u.getHoldingsUI();
    let b = hui.getSuslsFarmInfo();

    if (hui.getXUSDPrice()===-1)
    {
        return (
            <li className="FarmG">No XUSD Price. You need to buy a little XUSD to get price </li>
        );
    }
    else
    {
        let usd= b.uslsPendingRewardsXUSD*hui.getXUSDPrice();
        let rUsd = (Math.round(usd * 100) / 100).toFixed(2);

        return(
            <li className="FarmG">${rUsd} USD (For XUSD)</li>
        );
    }    
}

function UslsFarmSUslsToUsd()
{
    let u = Util.getInstance();
    let hui = u.getHoldingsUI();
    let b = hui.getSuslsFarmInfo();

    if (hui.getSUSLSPrice()===-1)
    {
        return (
            <li className="FarmG">No SUSLS Price. You need to buy a little SASLS to get price </li>
        );
    }
    else
    {

        let usd= b.uslsRedeemableSUSLS*hui.getSUSLSPrice();
        let rUsd = (Math.round(usd * 100) / 100).toFixed(2);

        return(
            <li className="FarmG">${rUsd} USD (For SUSLS) </li>
        );
    }
    
}

function UslsFarmPendingSUslsToUsd()
{
    let u = Util.getInstance();
    let hui = u.getHoldingsUI();
    let b = hui.getSuslsFarmInfo();

    if (hui.getSUSLSPrice()===-1)
    {
        return (
            <li className="FarmG">No SUSLS Price. You need to buy a little SUSLS to get price </li>
        );
    }
    else
    {
        let usd= b.uslsPendingRewardsSUSLS*hui.getSUSLSPrice();
        let rUsd = (Math.round(usd * 100) / 100).toFixed(2);

        return(
            <li className="FarmG">${rUsd} USD (For SUSLS) </li>
        );
    }    
}
export default FarmPage;