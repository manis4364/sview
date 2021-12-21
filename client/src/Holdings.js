import './Holdings.css';
import React, { Component } from 'react';
import Util from './Util';
import ResetAnchorPage from './ResetAnchorPage.js';
import IncreasesPage from './IncreasesPage.js';
import PricePage from './PricePage.js';
import FarmPage from './FarmPage.js';
import Buttons from './Buttons';

class Holdings extends Component {
    // Initialize the state
    constructor(props){
      super(props);
      this.state = {
                    numUSD : 0,
                    numBNB : 0,
                    numETH: 0,
                    numBTC: 0,
                    numADA: 0,
                    numUSELESS: 0,
                    numXUSD: 0,
                    valueUSD : 0,
                    valueBNB : 0,
                    valueETH : 0,
                    valueBTC: 0,
                    valueADA: 0,
                    valueUSELESS: 0,
                    valueXUSD: 0,
                    valueBNB_USD : 0,
                    valueETH_USD : 0,
                    valueUSD_USD: 0,
                    valueBTC_USD: 0,
                    valueADA_USD: 0,
                    valueFARM_USD: 0,
                    bnbValueFARM_USD: 0,
                    btcValueFARM_USD: 0,
                    adaValueFARM_USD: 0,
                    valueUSELESS_USD: 0,
                    valueXUSD_USD: 0,
                    bnbPrice: 0,
                    ethPrice: 0,
                    btcPrice: 0,
                    adaPrice: 0,
                    uselessPrice: 0,
                    page: 1,
                    refundInfo: {
                      totalSupply : 0,
                      totalShares : 0,
                      totalBNBPaidBack : 0,
                      minimumClaim : 0,
                      isVictim : 0,
                      isLocked : 0,
                      initialPaybackAmount: 0,
                      claimWaitPeriod: 0,
                      bnbToClaimForVictim: 0,
                      balanceOf: 0
                    },
                    fmInfo: {
                      fmDaysToUnlock: 0,
                      fmNumFarmTokens: 0,
                      fmPendingRewards: 0,
                      fmRedeemableBNB: 0,
                      fmRedeemableXUSD: 0                      
                    },
                    bnbInfo: {
                      bnbDaysToUnlock: 0,
                      bnbNumFarmTokens: 0,
                      bnbPendingRewards: 0,
                      bnbRedeemableBNB: 0,
                      bnbRedeemableXUSD: 0
                    },
                    sbtcInfo: {
                      sbtcDaysToUnlock: 0,
                      sbtcNumFarmTokens: 0,
                      sbtcPendingRewardsXUSD: 0,
                      sbtcPendingRewardsSBTC: 0,
                      sbtcRedeemableSBTC: 0,
                      sbtcRedeemableXUSD: 0
                    },
                    sadaInfo: {
                      sadaDaysToUnlock: 0,
                      sadaNumFarmTokens: 0,
                      sadaPendingRewardsXUSD: 0,
                      sadaPendingRewardsSADA: 0,
                      sadaRedeemableSADA: 0,
                      sadaRedeemableXUSD: 0
                    },
                    suslsInfo: {
                      suslsDaysToUnlock: 0,
                      suslsNumFarmTokens: 0,
                      suslsPendingRewardsXUSD: 0,
                      suslsPendingRewardsSUSLS: 0,
                      suslsRedeemableSUSLS: 0,
                      suslsRedeemableXUSD: 0
                    }
                   };
    }

  
    // Fetch the list on first mount
    componentDidMount() 
    {      
        let u = Util.getInstance();
        u.setHoldingsUI(this);
        // this.getList();
    }

    setPage()
    {
      let p = this.state.page;
      p++;
      console.log("pageChange "+ p);
      this.setState({page:p});
    }
    setBnbPrice(p)
    {
      this.setState({bnbPrice: p});
    }

    setEthPrice(p)
    {
      this.setState({ethPrice: p});
    }
    setBtcPrice(p)
    {
      this.setState({btcPrice: p});
    }
    setAdaPrice(p)
    {
      this.setState({adaPrice: p});
    }
    setUselessPrice(p)
    {
      this.setState({uselessPrice: p});
    }

    getBnbPrice()
    {
      return this.state.bnbPrice;
    }

    getEthPrice()
    {
      return this.state.ethPrice;
    }
    getBtcPrice()
    {
      return this.state.btcPrice;
      
    }
    getAdaPrice()
    {
      return this.state.adaPrice;      
    }
    getUselessPrice()
    {
      return this.state.uselessPrice;      
    }

    getXUSDPrice()
    {
      if (this.state.numXUSD===0)
      {
        return -1;
      }      
      return this.state.valueXUSD/this.state.numXUSD;
    }

    getSBTCPrice()
    {
      if (this.state.numBTC===0)
      {
        return -1;
      }    
            
      return ((parseFloat(this.state.valueBTC)/parseFloat(this.state.numBTC))*this.getBtcPrice());
    }

    getSADAPrice()
    {
      if (this.state.numADA===0)
      {
        return -1;
      }    
            
      return ((parseFloat(this.state.valueADA)/parseFloat(this.state.numADA))*this.getAdaPrice());
    }

    getSUSLSPrice()
    {
      if (this.state.numUSELESS===0)
      {
        return -1;
      }    
            
      return ((parseFloat(this.state.valueUSELESS)/parseFloat(this.state.numUSELESS))*this.getUselessPrice());
    }


    setBnbNeeded(b)
    {
      this.setState({bnbNeeded: b});
    }

    getValueUSD()
    {
      return this.state.valueUSD;
    }

    getValueXUSD()
    {
      return this.state.valueXUSD;
    }

    getNumUSD()
    {
      return this.state.numUSD;
    }
    getNumXUSD()
    {
      return this.state.numXUSD;
    }

    getValueETH()
    {
      return this.state.valueETH;
    }
    getNumETH()
    {
      return this.state.numETH;
    }

    getValueBTC()
    {
      return this.state.valueBTC;
    }
    getNumBTC()
    {
      return this.state.numBTC;
    }

    getValueADA()
    {
      return this.state.valueADA;
    }
    getNumADA()
    {
      return this.state.numADA;
    }

    getValueUSELESS()
    {
      return this.state.valueUSELESS;
    }
    getNumUSELESS()
    {
      return this.state.numUSELESS;
    }

    setNumUSD(b)
    {
      this.setState({numUSD: b});
    }

    setNumXUSD(b)
    {
      this.setState({numXUSD: b});
    }

    setNumBTC(b)
    {
      this.setState({numBTC: b});
    }
    setNumADA(b)
    {
      this.setState({numADA: b});
    }

    setNumBNB(b)
    {
      this.setState({numBNB: b});
    }

    setNumETH(b)
    {
      this.setState({numETH: b});
    }

    setNumUSELESS(b)
    {
      this.setState({numUSELESS: b});
    }

    setValueBNB(b)
    {
      this.setState({valueBNB: b});
    }
    setValueBNB_USD(b)
    {
      this.setState({valueBNB_USD: b});
      
    }
    setValueETH_USD(b)
    {
      this.setState({valueETH_USD: b});
      
    }

    setValueBTC(b)
    {
      this.setState({valueBTC: b});
    }

    setValueADA(b)
    {
      this.setState({valueADA: b});
    }

    setValueBTC_USD(b)
    {
      this.setState({valueBTC_USD: b});      
    }

    setValueADA_USD(b)
    {
      this.setState({valueADA_USD: b});      
    }

    setValueUSELESS_USD(b)
    {
      this.setState({valueUSELESS_USD: b});      
    }

    setValueUSD(b)
    {
      this.setState({valueUSD: b});
      let rb = (Math.round(b * 100) / 100).toFixed(2);
      this.setState({valueUSD_USD: rb});
      
    }

    setValueXUSD(b)
    {
      this.setState({valueXUSD: b});
      let rb = (Math.round(b * 100) / 100).toFixed(2);
      this.setState({valueXUSD_USD: rb});
      
    }

    setTotalUSD()
    {
      let u = Util.getInstance();
      let s=u.getSummaryUI();

      let t=parseFloat(this.state.valueETH_USD) + 
            parseFloat(this.state.valueBNB_USD) + 
            parseFloat(this.state.valueUSD_USD) +
            parseFloat(this.state.valueBTC_USD) +
            parseFloat(this.state.valueADA_USD) +
            parseFloat(this.state.valueUSELESS_USD) +
            parseFloat(this.state.valueXUSD_USD) +
            parseFloat(this.state.valueFARM_USD) +
            parseFloat(this.state.bnbValueFARM_USD) +
            parseFloat(this.state.btcValueFARM_USD) +
            parseFloat(this.state.adaValueFARM_USD) +
            parseFloat(this.state.uslsValueFARM_USD); 

      let t1 = t.toFixed(2);

      s.setTotal(t1);
    }

    setRefundInfo(b)
    {
      this.setState({refundInfo: b});
    }

    getRefundInfo()
    {
      return this.state.refundInfo;
    }

    setFarmInfo(b)
    {
      this.setState({fmInfo: b});      

      let bnbUsd= b.fmRedeemableBNB*this.state.bnbPrice;
      let rBnbUsd = (Math.round(bnbUsd * 100) / 100).toFixed(2);
      
      let totalUsd = 0;
      if (this.state.numXUSD !==0)
      {
          let usdPrice=this.state.valueXUSD/this.state.numXUSD;
          let usd= b.fmRedeemableXUSD*usdPrice;
          let rUsd = (Math.round(usd * 100) / 100).toFixed(2);
  
          totalUsd += parseFloat(rUsd);

          usd= b.fmPendingRewards*usdPrice;
          rUsd = (Math.round(usd * 100) / 100).toFixed(2);
          
          totalUsd+=parseFloat(rUsd);

      }
      totalUsd += parseFloat(rBnbUsd);
      let rTotalUsd = (Math.round(totalUsd * 100) / 100).toFixed(2);
      this.setState({valueFARM_USD: rTotalUsd});
    }

    getValueFARM_USD(b)
    {
      return this.state.valueFARM_USD;
    }

    getFarmInfo()
    {
      return this.state.fmInfo;
    }

    setBnbFarmInfo(b)
    {
        this.setState({bnbInfo: b});    
        let bnbUsd= b.bnbRedeemableBNB*this.state.bnbPrice;
        let rBnbUsd = (Math.round(bnbUsd * 100) / 100).toFixed(2);
        
        let totalUsd = 0;
        if (this.state.numXUSD !==0)
        {
            let usdPrice=this.state.valueXUSD/this.state.numXUSD;
            let usd= b.bnbRedeemableXUSD*usdPrice;
            let rUsd = (Math.round(usd * 100) / 100).toFixed(2);
    
            totalUsd += parseFloat(rUsd);

            usd= b.bnbPendingRewards*usdPrice;
            rUsd = (Math.round(usd * 100) / 100).toFixed(2);
            
            totalUsd+=parseFloat(rUsd);
        }
        totalUsd += parseFloat(rBnbUsd);
        let rTotalUsd = (Math.round(totalUsd * 100) / 100).toFixed(2);
        this.setState({bnbValueFARM_USD: rTotalUsd});    
    }  

    getBnbFarmInfo()
    {
      return this.state.bnbInfo;
    }

    getBnbValueFARM_USD(b)
    {
      return this.state.bnbValueFARM_USD;
    }

    getBtcValueFARM_USD(b)
    {
      return this.state.btcValueFARM_USD;
    }

    getAdaValueFARM_USD(b)
    {
      return this.state.adaValueFARM_USD;
    }

    getUslsValueFARM_USD(b)
    {
      return this.state.uslsValueFARM_USD;
    }

    setSbtcFarmInfo(b)
    {
      this.setState({sbtcInfo: b});      
      
      let totalUsd = 0;
      if (this.state.numXUSD !==0)
      {
          let usdPrice=parseFloat(this.state.valueXUSD)/parseFloat(this.state.numXUSD);
          let usd= b.btcRedeemableXUSD*usdPrice;
          let rUsd = (Math.round(usd * 100) / 100).toFixed(2);
  
          totalUsd += parseFloat(rUsd);

          usd= b.btcPendingRewardsXUSD*usdPrice;
          rUsd = (Math.round(usd * 100) / 100).toFixed(2);
          
          totalUsd+=parseFloat(rUsd);
      }

      if (this.state.numBTC !==0)
      {
        let sBtcPrice = this.state.valueBTC/this.state.numBTC;
        let sBtcPriceUsd = sBtcPrice*this.getBtcPrice();

        let usd= b.btcRedeemableSBTC*sBtcPriceUsd;
        let rUsd = (Math.round(usd * 100) / 100).toFixed(2);
  
        totalUsd += parseFloat(rUsd);

        usd= b.btcPendingRewardsSBTC*sBtcPriceUsd;
        rUsd = (Math.round(usd * 100) / 100).toFixed(2);
        
        totalUsd+=parseFloat(rUsd);

      }

      let rTotalUsd = (Math.round(totalUsd * 100) / 100).toFixed(2);
      this.setState({btcValueFARM_USD: rTotalUsd});    
    }

    getSbtcFarmInfo()
    {
      return this.state.sbtcInfo;
    }

    setSadaFarmInfo(b)
    {
      this.setState({sadaInfo: b});      
      let totalUsd = 0;

      if (this.state.numXUSD !==0)
      {
          let usdPrice=parseFloat(this.state.valueXUSD)/parseFloat(this.state.numXUSD);
          let usd= b.adaRedeemableXUSD*usdPrice;
          let rUsd = (Math.round(usd * 100) / 100).toFixed(2);
  
          totalUsd += parseFloat(rUsd);

          usd= b.adaPendingRewardsXUSD*usdPrice;
          rUsd = (Math.round(usd * 100) / 100).toFixed(2);
          
          totalUsd+=parseFloat(rUsd);
      }

      if (this.state.numADA !==0)
      {
        let sAdaPrice = this.state.valueADA/this.state.numADA;
        let sAdaPriceUsd = sAdaPrice*this.getAdaPrice();

        let usd= b.adaRedeemableSADA*sAdaPriceUsd;
        let rUsd = (Math.round(usd * 100) / 100).toFixed(2);
  
        totalUsd += parseFloat(rUsd);

        usd= b.adaPendingRewardsSADA*sAdaPriceUsd;
        rUsd = (Math.round(usd * 100) / 100).toFixed(2);
        
        totalUsd+=parseFloat(rUsd);

      }

      let rTotalUsd = (Math.round(totalUsd * 100) / 100).toFixed(2);
      this.setState({adaValueFARM_USD: rTotalUsd});    
    }
    
    getSadaFarmInfo()
    {
      return this.state.sadaInfo;
    }

    setSuslsFarmInfo(b)
    {
      this.setState({suslsInfo: b});      
      let totalUsd = 0;
      if (this.state.numXUSD !==0)
      {
          let usdPrice=parseFloat(this.state.valueXUSD)/parseFloat(this.state.numXUSD);
          let usd= b.uslsRedeemableXUSD*usdPrice;
          let rUsd = (Math.round(usd * 100) / 100).toFixed(2);
  
          totalUsd += parseFloat(rUsd);

          usd= b.uslsPendingRewardsXUSD*usdPrice;
          rUsd = (Math.round(usd * 100) / 100).toFixed(2);
          
          totalUsd+=parseFloat(rUsd);
      }

      if (this.state.numUSELESS !==0)
      {
        let sUslsPrice = this.state.valueUSELESS/this.state.numUSELESS;
        let sUslsPriceUsd = sUslsPrice*this.getUselessPrice();

        let usd= b.uslsRedeemableSUSLS*sUslsPriceUsd;
        let rUsd = (Math.round(usd * 100) / 100).toFixed(2);
  
        totalUsd += parseFloat(rUsd);

        usd= b.uslsPendingRewardsSUSLS*sUslsPriceUsd;
        rUsd = (Math.round(usd * 100) / 100).toFixed(2);
        
        totalUsd+=parseFloat(rUsd);

      }

      let rTotalUsd = (Math.round(totalUsd * 100) / 100).toFixed(2);
      this.setState({uslsValueFARM_USD: rTotalUsd});    

    }
    getSuslsFarmInfo()
    {
      return this.state.suslsInfo;
    }

    setValueETH(b)
    {
      this.setState({valueETH: b});
    }
    setValueUSELESS(b)
    {
      this.setState({valueUSELESS: b});
    }

    render() {
      // console.log("render");
      let u =  Util.getInstance();
      let p = u.getCookie("pageNumber");
                  
      let bui = u.getButtonsUI();      
      // console.log("Holdings page: " + p);
      
      let totalSupplyUsd = this.state.refundInfo.totalSupply*this.getBnbPrice();
      let rTotalSupplyUsd = (Math.round(totalSupplyUsd * 100) / 100).toFixed(2);

      let totalBNBPaidBackUsd = this.state.refundInfo.totalBNBPaidBack*this.getBnbPrice();
      let rTotalBNBPaidBackUsd = (Math.round(totalBNBPaidBackUsd * 100) / 100).toFixed(2);

      let minimumClaimUsd = this.state.refundInfo.minimumClaim*this.getBnbPrice();
      let rMinimumClaimUsd = (Math.round(minimumClaimUsd * 100) / 100).toFixed(2);

      let initialPaybackAmountUsd = this.state.refundInfo.initialPaybackAmount*this.getBnbPrice();
      let rInitialPaybackAmountUsd = (Math.round(initialPaybackAmountUsd * 100) / 100).toFixed(2);
      
      let balanceOfUsd = this.state.refundInfo.balanceOf*this.getBnbPrice();
      let rBalanceOfUsd = (Math.round(balanceOfUsd * 100) / 100).toFixed(2);

      let bnbToClaimForVictimUsd=this.state.refundInfo.bnbToClaimForVictim*this.getBnbPrice();
      let rBnbToClaimForVictimUsd = (Math.round(bnbToClaimForVictimUsd * 100) / 100).toFixed(2);

      if (bui == null)
      {
        return <NoPage />
      }
      if (p !=="2")
      {        
        if(bui.getButtonsState()===Buttons.BTN_INCREASES_PAGE)
        {
          return <IncreasesPage />
        }

        if(bui.getButtonsState()===Buttons.BTN_ANCHOR_PAGE)
        {
          return <ResetAnchorPage />
        }
        if(bui.getButtonsState()===Buttons.BTN_PRICE_PAGE)
        {
          return <PricePage />
        }
        if(bui.getButtonsState()===Buttons.BTN_FARM_PAGE)
        {
          return <FarmPage />
        }

        let totalFarm = parseFloat(this.state.valueFARM_USD) + 
                        parseFloat(this.state.bnbValueFARM_USD) + 
                        parseFloat(this.state.btcValueFARM_USD) +
                        parseFloat(this.state.adaValueFARM_USD) +
                        parseFloat(this.state.uslsValueFARM_USD);

        let rb = (Math.round(totalFarm * 100) / 100).toFixed(2);
        if (isNaN(rb))
        {
          rb=0;
        }
        return (      
            <div className="Holdings">        
              <div className="HoldingsContainer">
                <ul className="HoldingsUl">
                  <li className="HoldingsL">{this.state.numUSD} sUSD</li>
                  <li className="HoldingsLV">{this.state.valueUSD} USD</li>
                  <li className="HoldingsUV">${this.state.valueUSD_USD} USD</li>
                </ul>
              </div>
              <div className="HoldingsContainer">
                <ul className="HoldingsUl">
                  <li className="HoldingsL">{this.state.numETH} sETH</li>
                  <li className="HoldingsLV">{this.state.valueETH} ETH</li>
                  <li className="HoldingsUV">${this.state.valueETH_USD} USD</li>
                </ul>
              </div>
              <div className="HoldingsContainer">
                <ul className="HoldingsUl">
                  <li className="HoldingsL">{this.state.numBTC} sBTC</li>
                  <li className="HoldingsLV">{this.state.valueBTC} BTC</li>
                  <li className="HoldingsUV">${this.state.valueBTC_USD} USD</li>
                </ul>
              </div>
              <div className="HoldingsContainer">
                <ul className="HoldingsUl">
                  <li className="HoldingsL">{this.state.numADA} sADA</li>
                  <li className="HoldingsLV">{this.state.valueADA} ADA</li>
                  <li className="HoldingsUV">${this.state.valueADA_USD} USD</li>
                </ul>
              </div>
              <div className="HoldingsContainer">
                <ul className="HoldingsUl">
                  <li className="HoldingsL">{this.state.numUSELESS} sUSLS</li>
                  <li className="HoldingsLV">{this.state.valueUSELESS} USLS</li>
                  <li className="HoldingsUV">${this.state.valueUSELESS_USD} USD</li>
                </ul>
              </div>
               <div className="HoldingsContainer">
                 <ul className="HoldingsUl">
                    <li className="HoldingsL">{this.state.numXUSD} xUSD</li>
                    <li className="HoldingsLV">{this.state.valueXUSD} USD</li>
                    <li className="HoldingsUV">${this.state.valueXUSD_USD} USD</li>
                    {/*
                    <li className="HoldingsUVR">${this.state.valueFARM_USD} USD (FARM)</li>
                    */}
                  </ul>              
              </div>
              <div className="HoldingsContainer">
                 <ul className="HoldingsUl">
                    <li className="HoldingsUV">${rb} USD (ALL FARMS)</li>
                  </ul>              
              </div>

            </div>        
          );      
      }
      else
      {
        return (      
          <div className="Holdings">        
            <div className="HoldingsContainer">
              <p className="HoldingsP"> Refund Contract</p>
              <ul className="HoldingsUl">
                <li className="HoldingsLV"> totalSupply: <b>{this.state.refundInfo.totalSupply}</b></li>
                <li className="HoldingsLV"> totalSupplyUSD: <b>${rTotalSupplyUsd}</b></li>
                <li className="HoldingsLV"> totalBNBPaidBack: <b>{this.state.refundInfo.totalBNBPaidBack }</b></li>
                <li className="HoldingsLV"> totalBNBPaidBackUSD: <b>${rTotalBNBPaidBackUsd}</b></li>                
                <li className="HoldingsLV"> minimumClaim: <b>{this.state.refundInfo.minimumClaim}</b></li>
                <li className="HoldingsLV"> minimumClaimUSD: <b>${rMinimumClaimUsd}</b></li>
                <li className="HoldingsLV"> isLocked: <b>{this.state.refundInfo.isLocked ? "true":"false"}</b></li>
                <li className="HoldingsLV"> claimWaitPeriod: <b>{this.state.refundInfo.claimWaitPeriod}</b></li>
                <li className="HoldingsLV"> initialPaybackAmount: <b>{this.state.refundInfo.initialPaybackAmount}</b></li>
                <li className="HoldingsLV"> initialPaybackAmountUSD: <b>${rInitialPaybackAmountUsd}</b></li>

              </ul>

              <ul className="HoldingsUl">
                <li className="HoldingsB"> balanceOf: <b>{this.state.refundInfo.balanceOf}</b></li>
                <li className="HoldingsB"> balanceOfUSD: <b>${rBalanceOfUsd}</b></li>
                <li className="HoldingsB"> bnbToClaimForVictim: <b>${this.state.refundInfo.bnbToClaimForVictim}</b></li>
                <li className="HoldingsB"> bnbToClaimForVictimUSD: <b>${rBnbToClaimForVictimUsd}</b></li>                
                <li className="HoldingsB"> isVictim: <b>{this.state.refundInfo.isVictim ? "true":"false"}</b></li>
              </ul>
            </div>                   
          </div>        
        );      
      }
    } 
  }
  
  function NoPage()
  {
    return (      
      <div className="Holdings">
        <p> No Page</p>
        </div>);    
  }

  export default Holdings;