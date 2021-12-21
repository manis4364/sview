import './Account.css';
import React, { Component } from 'react';
import Util from './Util';
import App from './App';
import { getDefaultNormalizer } from '@testing-library/react';

class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);     
        this.postData = this.postData.bind(this);
        this.getSurgeInfo=this.getSurgeInfo.bind(this);
      }

    componentDidMount() {
        let u = Util.getInstance();

        let address = u.getCookie("address");
        this.setState({value: address});
        // temporarily commented out. Make sure you undo
        this.getSurgeInfo();
        console.log("mount");
      
    }

    // Example POST method implementation:
    async postData(url = '', data = {}) 
    {
        // Default options are marked with *
        // mode: 'cors'
        // credentials: 'same-orgin'        
        try
        {
            console.log(data);
            const response = await fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'no-cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'omit', // include, *same-origin, omit
                headers: {
                    'content-type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            });
                                  
            return response.json(); // parses JSON response into native JavaScript objects
            
           /*
           const response = await fetch(url);
           return response.json();
           */
        }
        catch(err)
        {
            var errObj = { Error: 'Error in fetching url'};
            return errObj;
        }        
    }

    getSurgeInfo()
    {
      let u = Util.getInstance();
      let addressValue = u.getCookie("address");
      let pageValue = u.getCookie("pageNumber");

      let jsonObj = {address: addressValue,
                     pageNumber: pageValue}
      console.log("called post data");

        this.postData('https://subscribe.manraj.ca/api/getSurge', jsonObj)
            .then(data => {
                console.log(data); // JSON data parsed by `data.json()` call

                let u = Util.getInstance();
                if(u.getHoldingsUI() != null)
                {
                  let h=u.getHoldingsUI();
                  h.setValueUSD(data.balanceUSD);
                  h.setValueBNB(data.balanceBNB);
                  h.setValueETH(data.balanceETH);
                  h.setValueBTC(data.balanceBTC);
                  h.setValueADA(data.balanceADA);
                  h.setValueUSELESS(data.balanceUSELESS);
                  h.setValueXUSD(data.balanceXUSD);
                  
                  h.setBnbPrice(data.bnbPrice);
                  h.setEthPrice(data.ethPrice);
                  h.setBtcPrice(data.btcPrice);
                  h.setAdaPrice(data.adaPrice);
                  h.setUselessPrice(data.uselessPrice);

                  let bnbUsd = data.balanceBNB*data.bnbPrice;
                  let rBnbUsd = (Math.round(bnbUsd * 100) / 100).toFixed(2);
                  h.setValueBNB_USD(rBnbUsd);

                  let ethUsd =data.balanceETH*data.ethPrice;
                  let rEthUsd = (Math.round(ethUsd * 100) / 100).toFixed(2);
                  h.setValueETH_USD(rEthUsd);

                  let btcUsd =data.balanceBTC*data.btcPrice;
                  let rBtcUsd = (Math.round(btcUsd * 100) / 100).toFixed(2);
                  
                  h.setValueBTC_USD(rBtcUsd);

                  let adaUsd =data.balanceADA*data.adaPrice;
                  let rAdaUsd = (Math.round(adaUsd * 100) / 100).toFixed(2);
                  h.setValueADA_USD(rAdaUsd);

                  let uselessUsd =data.balanceUSELESS*data.uselessPrice;
                  let rUselessUsd = (Math.round(uselessUsd * 100) / 100).toFixed(2);
                  h.setValueUSELESS_USD(rUselessUsd);


                  // console.log("MY ADA USD PRICE: " + rAdaUsd + " " + data.balanceADA + " " + data.adaPrice);

                  h.setNumUSD(data.numTokensUSD);
                  h.setNumBNB(data.numTokensBNB);
                  h.setNumETH(data.numTokensETH);
                  h.setNumBTC(data.numTokensBTC);
                  h.setNumADA(data.numTokensADA);
                  h.setNumUSELESS(data.numTokensUSELESS);
                  h.setNumXUSD(data.numTokensXUSD);
                  
                  let b={
                      fmDaysToUnlock: data.fmDaysToUnlock,
                      fmNumFarmTokens: data.fmNumFarmTokens,
                      fmPendingRewards: data.fmPendingRewards,
                      fmRedeemableBNB: data.fmRedeemableBNB,
                      fmRedeemableXUSD: data.fmRedeemableXUSD
                        }
                  h.setFarmInfo(b);

                  let c={
                    bnbDaysToUnlock: data.bnbDaysToUnlock,
                    bnbNumFarmTokens: data.bnbNumFarmTokens,
                    bnbPendingRewards: data.bnbPendingRewards,
                    bnbRedeemableBNB: data.bnbRedeemableBNB,
                    bnbRedeemableXUSD: data.bnbRedeemableXUSD
                  }
                  h.setBnbFarmInfo(c);

                  let d={
                    btcDaysToUnlock: data.btcDaysToUnlock,
                    btcNumFarmTokens: data.btcNumFarmTokens,
                    btcPendingRewardsXUSD: data.btcPendingRewardsXUSD,
                    btcPendingRewardsSBTC: data.btcPendingRewardsSBTC,
                    btcRedeemableSBTC: data.btcRedeemableSBTC,
                    btcRedeemableXUSD: data.btcRedeemableXUSD
                  }
                  h.setSbtcFarmInfo(d);

                  let e={
                    adaDaysToUnlock: data.adaDaysToUnlock,
                    adaNumFarmTokens: data.adaNumFarmTokens,
                    adaPendingRewardsXUSD: data.adaPendingRewardsXUSD,
                    adaPendingRewardsSADA: data.adaPendingRewardsSADA,
                    adaRedeemableSADA: data.adaRedeemableSADA,
                    adaRedeemableXUSD: data.adaRedeemableXUSD
                  }
                  h.setSadaFarmInfo(e);                 

                  let f={
                    uslsDaysToUnlock: data.uslsDaysToUnlock,
                    uslsNumFarmTokens: data.uslsNumFarmTokens,
                    uslsPendingRewardsXUSD: data.uslsPendingRewardsXUSD,
                    uslsPendingRewardsSUSLS: data.uslsPendingRewardsSUSLS,
                    uslsRedeemableSUSLS: data.uslsRedeemableSUSLS,
                    uslsRedeemableXUSD: data.uslsRedeemableXUSD
                  }
                  h.setSuslsFarmInfo(f);

                  let g = {
                      totalSupply : data.totalSupply,
                      totalShares : data.totalShares,
                      totalBNBPaidBack : data.totalBNBPaidBack,
                      minimumClaim : data.minimumClaim,
                      isVictim : data.isVictim,
                      isLocked : data.isLocked,
                      initialPaybackAmount: data.initialPaybackAmount,
                      claimWaitPeriod: data.claimWaitPeriod,
                      bnbToClaimForVictim: data.bnbToClaimForVictim,
                      balanceOf: data.balanceOfRefund
                  }
                  h.setRefundInfo(g);

                  h.setTotalUSD();

                  let r=u.getRefreshUI();
                  r.setRefreshed(true);
                  if (data.status ==="ERROR")
                  {
                    r.setError(true);
                  }
                  else
                  {
                    r.setError(false);
                  }
                }
                else
                {
                  console.log("Holdings obj is null");
                }                     
            });
    }


    handleChange(event) {
        this.setState({value: event.target.value});

        let u =  Util.getInstance();
        u.setCookie("address",event.target.value,365);        
      }

    render() {          
      /*
      let u = Util.getInstance();
      if(u.getHoldingsUI() != null)
      {
        let h= u.getHoldingsUI();
        h.setBalanceUSD(350);
        h.setBalanceBNB(100);
      }
      else
      {
        console.log("Holdings obj is null");
      }
     */ 
      return (     
        <div className="Account">
          <header >
          <label id="AccountLabel">
          Your BEP 20 Address:
          <input id="AccountInput" type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
          </header>
        </div>
      );     
    }
}

export default Account;
