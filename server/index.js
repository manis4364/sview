const fs = require('fs');
const https = require('https');
const http = require("http");
const express = require('express');
const path = require('path');
const getJSON = require('get-json')
const jsdom = require('jsdom');
// const cors = require('cors');

const app = express();

class BinanceObject
{
	constructor()
    {
		this.addressValue=0;
		this.pageValue=0;
		this.balanceValueUSD=0;
		this.balanceValueBNB=0;
		this.balanceValueBTC=0;
		this.balanceValueADA=0;
		this.balanceValueUSELESS=0;
		this.balanceValueXUSD=0;

		this.numTokensUSDValue=0;
		this.numTokensBNBValue=0;
		this.numTokensBTCValue=0;
		this.numTokensADAValue=0;
		this.numTokensUSELESSValue=0;
		this.numTokensXUSDValue=0;

		// Refund Contract Info
		this.totalSupply = 0;
		this.totalShares = 0;
		this.totalBNBPaidBack = 0;
		this.minimumClaim = 0;
		this.isVictim = 0;
		this.isLocked = 0;
		this.initialPaybackAmount = 0;
		this.claimWaitPeriod = 0;
		this.bnbToClaimForVictim = 0;
		this.balanceOfRefund = 0;

		//Yield Farm Contract Info
		this.fmPendingRewardsValue=0;
		this.fmRedeemableXUSDValue=0;
		this.fmRedeemableBNBValue=0;
		this.fmDaysToUnlockValue=0;
	    this.fmNumFarmTokensValue=0;		

		this.bnbPendingRewardsValue=0;
		this.bnbRedeemableXUSDValue=0;
		this.bnbRedeemableBNBValue=0;
		this.bnbDaysToUnlockValue=0;
	    this.bnbNumFarmTokensValue=0;		

		this.btcPendingRewardsValueXUSD=0;
		this.btcPendingRewardsValueSBTC=0;
		this.btcRedeemableXUSDValue=0;
		this.btcRedeemableSBTCValue=0;
		this.btcDaysToUnlockValue=0;
	    this.btcNumFarmTokensValue=0;		

		this.adaPendingRewardsValueXUSD=0;
		this.adaPendingRewardsValueSADA=0;
		this.adaRedeemableXUSDValue=0;
		this.adaRedeemableSADAValue=0;
		this.adaDaysToUnlockValue=0;
	    this.adaNumFarmTokensValue=0;		

		this.uslsPendingRewardsValueXUSD=0;
		this.uslsPendingRewardsValueSUSLS=0;
		this.uslsRedeemableXUSDValue=0;
		this.uslsRedeemableSUSLSValue=0;
		this.uslsDaysToUnlockValue=0;
	    this.uslsNumFarmTokensValue=0;		



	}
}

var bnbPriceValue=0;
var ethPriceValue=0;
var btcPriceValue=0;
var adaPriceValue=0;
var uselessPriceValue=0;


/*
https://bsc-dataseed.binance.org
https://bsc-dataseed1.defibit.io
https://bsc-dataseed1.ninicoin.io

backup:
https://bsc-dataseed1.binance.org
*/

var httpProvider = 'https://bsc-dataseed.binance.org';
var usdAbi= 'https://api.bscscan.com/api?module=contract&action=getabi&address=0x14fEe7d23233AC941ADd278c123989b86eA7e1fF&apikey=PRGCYPP793E4PX9H18ZBXAG5WUYVC9T7B2';
var ethAbi= 'https://api.bscscan.com/api?module=contract&action=getabi&address=0x5B1d1BBDCc432213F83b15214B93Dc24D31855Ef&apikey=PRGCYPP793E4PX9H18ZBXAG5WUYVC9T7B2';
var btcAbi= 'https://api.bscscan.com/api?module=contract&action=getabi&address=0xb68c9D9BD82BdF4EeEcB22CAa7F3Ab94393108a1&apikey=PRGCYPP793E4PX9H18ZBXAG5WUYVC9T7B2';
var adaAbi='https://api.bscscan.com/api?module=contract&action=getabi&address=0xbF6bB9b8004942DFb3C1cDE3Cb950AF78ab8A5AF&apikey=PRGCYPP793E4PX9H18ZBXAG5WUYVC9T7B2';
var uselessAbi='https://api.bscscan.com/api?module=contract&action=getabi&address=0x2e62e57d1d36517d4b0f329490ac1b78139967c0&apikey=PRGCYPP793E4PX9H18ZBXAG5WUYVC9T7B2';
var xusdAbi='https://api.bscscan.com/api?module=contract&action=getabi&address=0x254246331cacbC0b2ea12bEF6632E4C6075f60e2&apikey=PRGCYPP793E4PX9H18ZBXAG5WUYVC9T7B2';
var farmAbi='https://api.bscscan.com/api?module=contract&action=getabi&address=0x579aaF9882A1941885fADa7A6243cEACf3037659&apikey=PRGCYPP793E4PX9H18ZBXAG5WUYVC9T7B2';
var bnbFarmAbi='https://api.bscscan.com/api?module=contract&action=getabi&address=0x6789432a7494DCC5061129e369fb3FF801121123&apikey=PRGCYPP793E4PX9H18ZBXAG5WUYVC9T7B2';
var btcFarmAbi='https://api.bscscan.com/api?module=contract&action=getabi&address=0xB51EA53058D4f548CbabFa7C639725EEf494e13d&apikey=PRGCYPP793E4PX9H18ZBXAG5WUYVC9T7B2';
var adaFarmAbi='https://api.bscscan.com/api?module=contract&action=getabi&address=0xb7207B3e14Eb50aA02A5AD76941e61a4EeF47b4b&apikey=PRGCYPP793E4PX9H18ZBXAG5WUYVC9T7B2';
var uslsFarmAbi='https://api.bscscan.com/api?module=contract&action=getabi&address=0x0cD3A3C1e1F246f13e45b4b0eD07C8De355a54F4&apikey=PRGCYPP793E4PX9H18ZBXAG5WUYVC9T7B2';

var refundAbi='https://api.bscscan.com/api?module=contract&action=getabi&address=0x8078380508c16C9F122D62771714701612Eb3fa8&apikey=PRGCYPP793E4PX9H18ZBXAG5WUYVC9T7B2';



var sUsdContractAddress= "0x14fEe7d23233AC941ADd278c123989b86eA7e1fF";
var sEthContractAddress= "0x5B1d1BBDCc432213F83b15214B93Dc24D31855Ef";
var sBtcContractAddress= "0xb68c9D9BD82BdF4EeEcB22CAa7F3Ab94393108a1";
var sAdaContractAddress= "0xbF6bB9b8004942DFb3C1cDE3Cb950AF78ab8A5AF";
var sUselessContractAddress= "0x2e62e57d1d36517d4b0f329490ac1b78139967c0";
var sXusdContractAddress = "0x254246331cacbC0b2ea12bEF6632E4C6075f60e2";
var farmContractAddress = "0x579aaF9882A1941885fADa7A6243cEACf3037659";
var bnbFarmContractAddress ="0x6789432a7494DCC5061129e369fb3FF801121123";
var btcFarmContractAddress = "0xB51EA53058D4f548CbabFa7C639725EEf494e13d";
var adaFarmContractAddress = "0xb7207B3e14Eb50aA02A5AD76941e61a4EeF47b4b";
var refundContractAddress = "0x8078380508c16C9F122D62771714701612Eb3fa8";
var uslsFarmContractAddress = "0x0cD3A3C1e1F246f13e45b4b0eD07C8De355a54F4";

var sUsdContractInstance= null;
var sEthContractInstance= null;
var sBtcContractInstance= null;
var sAdaContractInstance= null;
var sUselessContractInstance = null;
var sXusdContractInstance = null;
var farmContractInstance = null;
var bnbFarmContractInstance = null;
var btcFarmContractInstance = null;
var adaFarmContractInstance = null;
var refundContractInstance = null;
var uslsFarmContractInstance = null;
var initializationError = true;


var bnbPriceUrl='https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd';
var ethPriceUrl='https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';
var	btcPriceUrl='https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';
var	adaPriceUrl='https://api.coingecko.com/api/v3/simple/price?ids=cardano&vs_currencies=usd';
var	uselessPriceUrl='https://api.coingecko.com/api/v3/simple/price?ids=USELESS&vs_currencies=usd';


var logFile = "/home/manrajN/server/log/log.txt";

var cIx = 0;
var priceTime= 0
var resetMins=10;

app.use(function(req, res, next) {
	if (req.headers['content-type'] !== 'application/json;') {
	  req.headers['content-type'] = 'application/json';
	}
	next();
  });
// app.use(cors);
// app.use(express.static(__dirname, { dotfiles: 'allow' } ));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Certificate

const privateKey = fs.readFileSync('/etc/letsencrypt/live/subscribe.manraj.ca/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/subscribe.manraj.ca/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/subscribe.manraj.ca/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

const delay = ms => new Promise(res => setTimeout(res, ms));

getAllContractAbi();


// Starting both http & https servers
// const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});



// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'build')));


/*
const httpServer = http.createServer(app);
httpServer.listen(80, () => {
	console.log('HTTP Server running on port 80');
});

*/

// An api endpoint that returns a short list of items


app.set('trust proxy', true);

app.get('/api/getList', (req,res) => getList(req,res));

app.post('/api/getSurge', (req,res) => getSurge(req,res));

// Handles any requests that don't match the ones above


app.get('*', (req,res) =>{
	console.log("no api found");
    res.sendFile(path.join(__dirname+'/build/index.html'));
	});

app.use(express.static(__dirname, { dotfiles: 'allow' } ));


async function getSurge(req,res)
{	

	if (initializationError == true)
	{
		console.log("Waiting to be initialized");
		return;
	}

	cIx++

	var ip="";
	if (req.ip != null)
	{
		ip=req.ip;
	}

	var dt= new Date();
	var nowTime = dt.getTime();
	var interval = (nowTime-priceTime)/1000/60;
	if (interval > resetMins)
	{

		try
		{
			const gotPrice = new Promise(function(resolve, reject) 
			{
				getPrice(resolve,reject);
			});
			
		 	await gotPrice;
		}
		catch(err)
		{
			console.log("unable to get price");
		}	
	
		console.log("Interval: " + interval)
		priceTime = nowTime;

	}


	var cString="";
	cString += cIx +': '+ dt.toDateString() +' '+ dt.toTimeString().slice(0,8) +' '+ip+'\n';

	fs.appendFile(logFile,cString, function (err) {
			  if (err) return console.log("Write Error "+err);
			  console.log(`${cString}`);
			});

	if (req.body == null)
	{
		retObj = {status: 'Error'};
		res.json(retObj);
		return;
	}

	var bo = new BinanceObject();

	bo.addressValue = req.body.address;
	bo.pageValue = req.body.pageNumber;
	// console.log("pageNumber " + pageValue);
	

	// addressValue = "0xE1b5B93756c820EF417A4fD452976463D57abEBE";

	let errorFlag1=false;
	try
	{
		const gotUsd = new Promise(function(resolve, reject) {
			getSurgeUSD(bo,resolve,reject);
	 	});

		 await gotUsd;
	}
	catch(err)
	{
		errorFlag1 = true;

	}

	let errorFlag2=false;
	try
	{
		/*
		const gotBnb = new Promise(function(resolve, reject) {
		getSurgeBNB(resolve,reject);
 		});				
 		await gotBnb;
		*/
		errorFlag2 = true;
	}
	catch(err)
	{
		errorFlag2 = true;
	}	

	let errorFlag3=false;
	try
	{
 		const gotNumUsd = new Promise(function(resolve, reject) {
			getNumTokensUSD(bo,resolve,reject);
 		});

 		await gotNumUsd;
	}
	catch(err)
	{
		errorFlag3 = true;
	}


	let errorFlag4=false;
	try
	{
		/*
		const gotNumBnb = new Promise(function(resolve, reject) {
			getNumTokensBNB(resolve,reject);
		});

	 	await gotNumBnb;
		*/
		errorFlag4=true;
	}
	catch(err)
	{
		errorFlag4 = true;
	}

	let errorFlag5=false;
	try
	{
 		const gotNumEth = new Promise(function(resolve, reject) {
			getNumTokensETH(bo,resolve,reject);
 		});

 		await gotNumEth;
	}
	catch(err)
	{
		errorFlag5 = true;
	}

	let errorFlag6=false;
	try
	{
 		const gotEth = new Promise(function(resolve, reject) {
			getSurgeETH(bo,resolve,reject);
 		});

 		await gotEth;
	}
	catch(err)
	{
		errorFlag6 = true;
	}

	if (bo.pageValue==="2")
	{
		let errorFlag7=false;
		try
		{
 			const gotRefundInfo = new Promise(function(resolve, reject) {
				getRefundInfo(bo,resolve,reject);
	 		});

 			await gotRefundInfo;
		}
		catch(err)
		{
			errorFlag7 = true;
		}
	}
	else
	{
		errorFlag7=true;
	}


	let errorFlag8=false;
	try
	{
 		const gotNumBtc = new Promise(function(resolve, reject) {
			getNumTokensBTC(bo,resolve,reject);
 		});

 		await gotNumBtc;
	}
	catch(err)
	{
		errorFlag8 = true;
	}

	let errorFlag9=false;
	try
	{
 		const gotBtc = new Promise(function(resolve, reject) {
			getSurgeBTC(bo,resolve,reject);
 		});

 		await gotBtc;
	}
	catch(err)
	{
		errorFlag9 = true;
	}

	let errorFlag10=false;
	try
	{
 		const gotNumAda = new Promise(function(resolve, reject) {
			getNumTokensADA(bo,resolve,reject);
 		});

 		await gotNumAda;
	}
	catch(err)
	{
		errorFlag10 = true;
	}

	let errorFlag11=false;
	try
	{
 		const gotAda = new Promise(function(resolve, reject) {
			getSurgeADA(bo,resolve,reject);
 		});

 		await gotAda;
	}
	catch(err)
	{
		errorFlag11 = true;
	}

	let errorFlag12=false;
	try
	{
 		const gotNumUseless = new Promise(function(resolve, reject) {
			getNumTokensUSELESS(bo,resolve,reject);
 		});

 		await gotNumUseless;
	}
	catch(err)
	{
		errorFlag12 = true;
	}

	let errorFlag13=false;
	try
	{
 		const gotUseless = new Promise(function(resolve, reject) {
			getSurgeUSELESS(bo,resolve,reject);
 		});

 		await gotUseless;
	}
	catch(err)
	{
		errorFlag13 = true;
	}

	let errorFlag14=false;
	try
	{
 		const gotNumXusd = new Promise(function(resolve, reject) {
			getNumTokensXUSD(bo,resolve,reject);
 		});

 		await gotNumXusd;
	}
	catch(err)
	{
		errorFlag14 = true;
	}

	let errorFlag15=false;
	try
	{
 		const gotXusd = new Promise(function(resolve, reject) {
			getSurgeXUSD(bo,resolve,reject);
 		});

 		await gotXusd;
	}
	catch(err)
	{
		errorFlag15 = true;
	}


	let errorFlag16=false;
	try
	{
 		const gotFarm = new Promise(function(resolve, reject) {
			getFarmInfo(bo,resolve,reject);
 		});

 		await gotFarm;
	}
	catch(err)
	{
		errorFlag16 = true;
	}


	let errorFlag17=false;
	try
	{
 		const gotBnbFarm = new Promise(function(resolve, reject) {
			bnbGetFarmInfo(bo,resolve,reject);
 		});

 		await gotBnbFarm;
	}
	catch(err)
	{
		errorFlag17 = true;
	}

	let errorFlag18=false;
	try
	{
 		const gotBtcFarm = new Promise(function(resolve, reject) {
			btcGetFarmInfo(bo,resolve,reject);
 		});

 		await gotBtcFarm;
	}
	catch(err)
	{
		errorFlag18 = true;
	}

	let errorFlag19=false;
	try
	{
 		const gotAdaFarm = new Promise(function(resolve, reject) {
			adaGetFarmInfo(bo,resolve,reject);
 		});

 		await gotAdaFarm;
	}
	catch(err)
	{
		errorFlag19 = true;
	}

	let errorFlag20=false;
	try
	{
 		const gotUslsFarm = new Promise(function(resolve, reject) {
			uslsGetFarmInfo(bo,resolve,reject);
 		});

 		await gotUslsFarm;
	}
	catch(err)
	{
		errorFlag20 = true;
	}


	var statusValue = "OK";

	let errorFlag = errorFlag1 &&
					errorFlag2 &&
					errorFlag3 &&
					errorFlag4 &&
					errorFlag5 &&					
					errorFlag6 &&
					errorFlag7 &&
					errorFlag8 &&
					errorFlag9 &&
					errorFlag10 &&
					errorFlag11 &&
					errorFlag12 &&
					errorFlag13 &&
					errorFlag14 &&
					errorFlag15 &&
					errorFlag16 &&
					errorFlag17 &&
					errorFlag18 &&
					errorFlag19 &&
					errorFlag20;

	if (errorFlag == true)
	{
		statusValue = "ERROR";
	}
	let retObj = {
					status: statusValue,
					balanceBNB: bo.balanceValueBNB/1000000000000000000, 
					balanceUSD: bo.balanceValueUSD/1000000000000000000,
					balanceETH: bo.balanceValueETH/1000000000000000000,
					balanceBTC: bo.balanceValueBTC/1000000000000000000,
					balanceADA: bo.balanceValueADA/1000000000000000000,
					balanceUSELESS: bo.balanceValueUSELESS/1000000000,
					balanceXUSD: bo.balanceValueXUSD/1000000000000000000,
					numTokensUSD: bo.numTokensUSDValue,
					numTokensBNB: bo.numTokensBNBValue,
					numTokensETH: bo.numTokensETHValue,
					numTokensBTC: bo.numTokensBTCValue,
					numTokensADA: bo.numTokensADAValue,
					numTokensUSELESS: bo.numTokensUSELESSValue,
					numTokensXUSD: bo.numTokensXUSDValue/1000000000000000000,
					bnbPrice: bnbPriceValue,
					ethPrice: ethPriceValue,
					btcPrice: btcPriceValue,
					adaPrice: adaPriceValue,
					uselessPrice: uselessPriceValue,

					fmNumFarmTokens: bo.fmNumFarmTokensValue/1000000000000000000,
					fmRedeemableXUSD: bo.fmRedeemableXUSDValue/1000000000000000000,
					fmRedeemableBNB: bo.fmRedeemableBNBValue/1000000000000000000,
					fmPendingRewards: bo.fmPendingRewardsValue/1000000000000000000,
					fmDaysToUnlock: bo.fmDaysToUnlockValue,

					bnbNumFarmTokens: bo.bnbNumFarmTokensValue/1000000000000000000,
					bnbRedeemableXUSD: bo.bnbRedeemableXUSDValue/1000000000000000000,
					bnbRedeemableBNB: bo.bnbRedeemableBNBValue/1000000000000000000,
					bnbPendingRewards: bo.bnbPendingRewardsValue/1000000000000000000,
					bnbDaysToUnlock: bo.bnbDaysToUnlockValue,

					btcNumFarmTokens: bo.btcNumFarmTokensValue/1000000000000000000,
					btcRedeemableXUSD: bo.btcRedeemableXUSDValue/1000000000000000000,
					btcRedeemableSBTC: bo.btcRedeemableSBTCValue,
					btcPendingRewardsXUSD: bo.btcPendingRewardsValueXUSD/1000000000000000000,
					btcPendingRewardsSBTC: bo.btcPendingRewardsValueSBTC,
					btcDaysToUnlock: bo.btcDaysToUnlockValue,

					adaPendingRewardsXUSD: bo.adaPendingRewardsValueXUSD/1000000000000000000,
					adaPendingRewardsSADA: bo.adaPendingRewardsValueSADA,
					adaRedeemableXUSD: bo.adaRedeemableXUSDValue/1000000000000000000, 
					adaRedeemableSADA: bo.adaRedeemableSADAValue,
					adaDaysToUnlock: bo.adaDaysToUnlockValue,
	    			adaNumFarmTokens: bo.adaNumFarmTokensValue/1000000000000000000,

					uslsPendingRewardsXUSD: bo.uslsPendingRewardsValueXUSD/1000000000000000000,
					uslsPendingRewardsSUSLS: bo.uslsPendingRewardsValueSUSLS,
					uslsRedeemableXUSD: bo.uslsRedeemableXUSDValue/1000000000000000000, 
					uslsRedeemableSUSLS: bo.uslsRedeemableSUSLSValue,
					uslsDaysToUnlock: bo.uslsDaysToUnlockValue,
	    			uslsNumFarmTokens: bo.uslsNumFarmTokensValue/1000000000000000000,

					totalSupply: bo.totalSupply/1000000000000000000,
					totalShares: bo.totalShares/1000000000000000000,
					totalBNBPaidBack: bo.totalBNBPaidBack/1000000000000000000,
					minimumClaim: bo.minimumClaim/1000000000000000000,
					isVictim: bo.isVictim,
					isLocked: bo.isLocked,
					initialPaybackAmount: bo.initialPaybackAmount/1000000000000000000,
					claimWaitPeriod: bo.claimWaitPeriod,
					bnbToClaimForVictim: bo.bnbToClaimForVictim/1000000000000000000,
					balanceOfRefund: bo.balanceOf/1000000000000000000
				}
	res.json(retObj);
}


async function getSurgeUSD(bo,resolve, reject)
{
	// var result = 0;
	bo.balanceValueUSD=0;
							
	var result
	try
	{
    	result = sUsdContractInstance.methods.getValueOfHoldings(bo.addressValue).call(function(err,res){
			if (err) {
				reject(true);
				return
			}					  	
			bo.balanceValueUSD=res;
			resolve(true);
		});	
	}
	catch(err)
	{
		resolve(false);
		// console.log("Error in getSurgeUSD");
	}
}

async function getNumTokensUSD(bo,resolve, reject)
{
	// var result = 0;
	bo.numTokensUSDValue=0;
								
	var result;			
	try
	{
    	result = sUsdContractInstance.methods.balanceOf(bo.addressValue).call(function(err,res){
			if (err) {
				reject(true);
				return;
			}				
		  	bo.numTokensUSDValue=res;
			resolve(true);
		});	
	}
	catch(err)
	{
		resolve(false);
		// console.log("Error in getNumTokensUSD");
	}			

	await result;								
}

async function getSurgeXUSD(bo,resolve, reject)
{								
	// var result = 0;
	bo.balanceValueXUSD=0;
							
	var result
	try
	{
    	result = sXusdContractInstance.methods.getValueOfHoldings(bo.addressValue).call(function(err,res){
		if (err) {
			reject(true);
			return
	 	}					  	
		bo.balanceValueXUSD=res;
		resolve(true);
		});	
	}
	catch(err)
	{
		// console.log("Error in getSurgeXUSD");
		resolve(false);
	}
}

async function getNumTokensXUSD(bo,resolve, reject)
{								
	// var result = 0;
	bo.numTokensXUSDValue=0;
								
	var result;			
	try
	{
		result = sXusdContractInstance.methods.balanceOf(bo.addressValue).call(function(err,res){
			if (err) {
				//console.log("Reject " + err);
				reject(true);
				return
			}				
			bo.numTokensXUSDValue=res;
			resolve(true);
		});	
	}
	catch(err)
	{
		//console.log("Error in getNumTokensXUSD");
		resolve(false);
	}			
	await result;								
}

async function getSurgeETH(bo,resolve, reject)
{								
	// var result = 0;
	bo.balanceValueETH=0;
							
	var result
	try
	{
    	result = sEthContractInstance.methods.getValueOfHoldings(bo.addressValue).call(function(err,res){
			if (err) {
				reject(true);
				return
			}
			bo.balanceValueETH=res;
			resolve(true);
		});	
	}
	catch(err)
	{
		//console.log("Error in getSurgeETH");
		resolve(false);
	}
}

async function getNumTokensETH(bo,resolve, reject)
{								
	// var result = 0;
	bo.numTokensETHValue=0;
								
	var result
	try
	{
		result = sEthContractInstance.methods.balanceOf(bo.addressValue).call(function(err,res){
			if (err) {
				return
		  	}
		  	bo.numTokensETHValue=res;
			resolve(true);
		});	
	}
	catch(err)
	{
		//console.log("Error in getNumTokensETH");
		resolve(false);
	}

	await result;
}

async function getSurgeBTC(bo,resolve, reject)
{

	// var result = 0;
	bo.balanceValueBTC=0;
							
	var result
	try
	{
    	result = sBtcContractInstance.methods.getValueOfHoldings(bo.addressValue).call(function(err,res){
			if (err) {
				reject(true);
				return
			}
			bo.balanceValueBTC=res;
			resolve(true);
		});	
	}
	catch(err)
	{
		// console.log("Error in getSurgeBTC");
		resolve(false);
	}
}


async function getNumTokensBTC(bo,resolve, reject)
{				
	// var result = 0;
	bo.numTokensBTCValue=0;
	
	var result
	try
	{
    	result = sBtcContractInstance.methods.balanceOf(bo.addressValue).call(function(err,res){
			if (err) {
				return
			}
			bo.numTokensBTCValue=res;
			resolve(true);
		});	
	}
	catch(err)
	{
		// console.log("Error in getNumTokensBTC");
		resolve(false);
	}				
	await result;
}

async function getSurgeADA(bo,resolve, reject)
{
								
	// var result = 0;
	bo.balanceValueADA=0;
							
	var result
	try
	{
    	result = sAdaContractInstance.methods.getValueOfHoldings(bo.addressValue).call(function(err,res){
			if (err) {
				reject(true);
				return
			}
			bo.balanceValueADA=res;
			resolve(true);
		});	
	}
	catch(err)
	{
		// console.log("Error in getSurgeADA");
		resolve(false);
	}
}

async function getNumTokensADA(bo,resolve, reject)
{

	bo.numTokensADAValue=0;
	
	var result
	try
	{
    	result = sAdaContractInstance.methods.balanceOf(bo.addressValue).call(function(err,res){
			if (err) {
				reject(true);
				return
			}
			bo.numTokensADAValue=res;
			resolve(true);
		});	
	}
	catch(err)
	{
		// console.log("Error in getNumTokensADA");
		resolve(false);
	}
	await result;	
}

async function getSurgeUSELESS(bo,resolve, reject)
{

	bo.balanceValueUSELESS=0;
							
	var result;
	try
	{
    	result = sUselessContractInstance.methods.getValueOfHoldings(bo.addressValue).call(function(err,res){
			if (err) {
				reject(true);
				return
			}					  	
			bo.balanceValueUSELESS=res;
			resolve(true);
		});	
	}
	catch(err)
	{
		// console.log("Error in getSurgeUSELESS");
		resolve(false);
	}

}

async function getNumTokensUSELESS(bo,resolve, reject)
{
				
	bo.numTokensUSELESSValue=0;
							
	var result;			
	try
	{
    	result = sUselessContractInstance.methods.balanceOf(bo.addressValue).call(function(err,res){
			if (err) {
				reject(true);
				return
			}				
			bo.numTokensUSELESSValue=res;
			resolve(true);
		});	
	}
	catch(err)
	{
		// console.log("Error in getNumTokensUSELESS\n");
		resolve(false);
	}			
	await result;								

}


//-----------------------------  BEGIN REFUND CODE -----------------------------------
async function getRefundInfo(bo,resolve, reject)
{

	bo.refundBalanceValue=0;		
							
	var result				
	try
	{
		const gotTotalSupply = new Promise(function(ires, irej) {
			getTotalSupply (bo,refundContractInstance, ires,irej);
		});

		const gotTotalShares = new Promise(function(ires, irej) {
			getTotalShares (bo,refundContractInstance, ires,irej);
		});

		const gotTotalBNBPaidBack = new Promise(function(ires, irej) {
			getTotalBNBPaidBack (bo,refundContractInstance, ires,irej);
		});
		
		const gotMinimumClaim = new Promise(function(ires, irej) {
			getMinimumClaim (bo,refundContractInstance, ires,irej);
		});

		const gotIsVictim = new Promise(function(ires, irej) {
			getIsVictim (bo,refundContractInstance, ires,irej);
		});

		const gotIsLocked = new Promise(function(ires, irej) {
			getIsLocked (bo,refundContractInstance, ires,irej);
		});

		const gotInitialPaybackAmount = new Promise(function(ires, irej) {
			getInitialPaybackAmount (bo,refundContractInstance, ires,irej);
		});

		const gotClaimWaitPeriod = new Promise(function(ires, irej) {
			getClaimWaitPeriod (bo,refundContractInstance, ires,irej);
		});
	
		const gotBnbToClaimForVictim = new Promise(function(ires, irej) {							
			getBnbToClaimForVictim(bo,refundContractInstance, ires,irej);
		});
		

		const gotBalanceOf = new Promise(function(ires, irej) {
			getBalanceOfRefund (bo,refundContractInstance, ires,irej);
		});

		await gotTotalSupply;
		await gotTotalShares;
		await gotTotalBNBPaidBack;
		await gotMinimumClaim;
		await gotIsVictim ;
		await gotIsLocked;
		await gotInitialPaybackAmount;
		await gotClaimWaitPeriod;
		await gotBnbToClaimForVictim;
		await gotBalanceOf;

		resolve(true);
		
	}
	catch(err)
	{					
		// reject(true);
		// console.log("ERROR: getRefundInfo 1\n");
		resolve(false);
		return;
	}
}

function getTotalSupply(bo,contract, ires,irej)
{
	try
	{
		result = contract.methods.totalSupply().call(function(err,res){
			if (err) 
			{
				irej(true);
				return;
			}

			// refundBalanceValue=res;
			// console.log("totalSupply: " + res);						
			bo.totalSupply=res;
			ires(true);
		});			  	
	}
	catch(err)
	{
		// console.log("Error in getTotalSupply");
		ires(false);
		// irej(true);
	}
}

function getTotalShares(bo,contract, ires,irej)
{
	try
	{
		result = contract.methods.totalShares().call(function(err,res){
			if (err) 
			{
				irej(true);
				return;
			}

			// refundBalanceValue=res;
			// console.log("totalShares: " + res);						
			bo.totalShares=res;
			ires(true);
		});			  	
	}
	catch(err)
	{
		// console.log("Error in getTotalShares");
		ires(false);
		// irej(true);
	}
}

function getTotalBNBPaidBack(bo,contract, ires,irej)
{
	try
	{
		result = contract.methods.totalBNBPaidBack().call(function(err,res){
			if (err) 
			{
				irej(true);
				return;
			}

			// refundBalanceValue=res;
			// console.log("totalBNBPaidBack: " + res);						
			bo.totalBNBPaidBack=res;
			ires(true);
		});			  	
	}
	catch(err)
	{
		// console.log("Error in getTotalBNBPaidBack");
		ires(false);
		// irej(true);
	}
}

function getMinimumClaim(bo,contract, ires,irej)
{
	try
	{
		result = contract.methods.minimumClaim().call(function(err,res){
			if (err) 
			{
				irej(true);
				return;
			}

			// refundBalanceValue=res;
			// console.log("minimumClaim: " + res);						
			bo.minimumClaim=res;
			ires(true);
		});			  	
	}
	catch(err)
	{
		// console.log("Error in getMinimumClaim");
		ires(false);
		// irej(true);
	}
}
function getIsVictim(bo,contract, ires,irej)
{
	try
	{
		result = contract.methods.isVictim(bo.addressValue).call(function(err,res){
			if (err) 
			{
				irej(true);
				return;
			}

			// refundBalanceValue=res;
			// console.log("isVictim: " + res);						
			bo.isVictim=res;
			ires(true);
		});			  	
	}
	catch(err)
	{
		// console.log("Error in getIsVictim");
		ires(false);
		// irej(true);
	}
}
function getIsLocked(bo,contract, ires,irej)
{
	try
	{
		result = contract.methods.isLocked().call(function(err,res){
			if (err) 
			{
				irej(true);
				return;
			}

			// refundBalanceValue=res;
			// console.log("isLocked: " + res);						
			bo.isLocked=res;
			ires(true);
		});			  	
	}
	catch(err)
	{
		// console.log("Error in getIsLocked");
		ires(false);
		// irej(true);
	}
}
function getInitialPaybackAmount(bo,contract, ires,irej)
{
	try
	{
		result = contract.methods.initialPaybackAmount().call(function(err,res){
			if (err) 
			{
				irej(true);
				return;
			}

			// refundBalanceValue=res;
			// console.log("initialPaybackAmount: " + res);						
			bo.initialPaybackAmount=res;
			ires(true);
		});			  	
	}
	catch(err)
	{
		// console.log("Error in getInitialPaybackAmount");
		ires(false);
		// irej(true);
	}
}


function getClaimWaitPeriod(bo,contract, ires,irej)
{
	
	try
	{
		result = contract.methods.claimWaitPeriod().call(function(err,res){
			if (err) 
			{
				irej(true);
				return;
			}

			// refundBalanceValue=res;
			// console.log("claimWaitPeriod: " + res);						
			bo.claimWaitPeriod=res;
			ires(true);
		});			  	
	}
	catch(err)
	{
		// console.log("Error in getClaimWaitPeriod");
		// irej(true);
		ires(false);
	}
}

function getBnbToClaimForVictim(bo,contract, ires,irej)
{
	try
	{
		result = contract.methods.bnbToClaimForVictim(bo.addressValue).call(function(err,res){
			if (err) 
			{
				irej(true);
				return;
			}

			// refundBalanceValue=res;
			// console.log("bnbToClaimForVictim: " + res);						
			bo.bnbToClaimForVictim=res;
			ires(true);
		});			  	
	}
	catch(err)
	{
		// console.log("Error in getBnbToClaimForVictim");
		ires(false);
		// irej(true);
	}
}

function getBalanceOfRefund(bo,contract, ires,irej)
{
	try
	{
		result = contract.methods.balanceOf(bo.addressValue).call(function(err,res){
			if (err) 
			{
				irej(true);
				return;
			}

			// refundBalanceValue=res;
			bo.balanceOf=res;
			ires(true);
		});			  	
	}
	catch(err)
	{
		// console.log("Error in getBalanceOf");
		ires(false);
		// irej(true);
	}
}


// ---------------------------------- END REFUND CODE -------------------

//------------------------ FARM INFO -------------------------------------
async function getFarmInfo(bo,resolve,reject)
{								
	var result
	
	try
	{
		const gotBalanceOf = new Promise(function(ires, irej) {
			getBalanceOf (bo,farmContractInstance, ires,irej);
		});

		const gotRedeemableValue = new Promise(function(ires, irej) {
			getRedeemableValue (bo,farmContractInstance, ires,irej);
		});

		const gotPendingRewards = new Promise(function(ires, irej) {
			getPendingRewards (bo,farmContractInstance, ires,irej);
		});

		const gotTimeUntilUnlock = new Promise(function(ires, irej) {
			getTimeUntilUnlock (bo,farmContractInstance, ires,irej);
		});

		await gotBalanceOf;
		await gotRedeemableValue;
		await gotPendingRewards;
		await gotTimeUntilUnlock;

		resolve(true);

		
		
	}
	catch(err)
	{					
		// console.log("Error in getFarmInfo");
		resolve(false);
		return;
	}
}


function getBalanceOf(bo,contract, ires,irej)
{
	try
	{
		result = contract.methods.balanceOf(bo.addressValue).call(function(err,res){
			if (err) 
			{
				irej(true);
				return;
			}

			// console.log("balanceOf: "+res/1000000000000000000);								
	    	bo.fmNumFarmTokensValue=res;
			ires(true);
		});			  	
	}
	catch(err)
	{
		// console.log("Error in getBalanceOf");
		ires(false);
	}
}

function getRedeemableValue(bo,contract, ires,irej)
{
	try
	{
		result = contract.methods.getRedeemableValue(bo.addressValue).call(function(err,res){
			if (err) 
			{
				irej(true);
				return;
			}

			// const rv=JSON.stringify(res)
			//console.log("redeemableValue1: "+res[0]/1000000000000000000);
			// console.log("redeemableValue2: "+res[1]/1000000000000000000);
			bo.fmRedeemableXUSDValue=res[0];
			bo.fmRedeemableBNBValue=res[1];
			ires(true);
		});			  	
	}
	catch(err)
	{
		// console.log("Error in getBalanceOf");
		ires(false);
	}
}

function getPendingRewards(bo,contract, ires,irej)
{
	try
	{
		result = contract.methods.pendingRewards(bo.addressValue).call(function(err,res){
			if (err) 
			{
				irej(true);
				return;
			}

			// const rv=JSON.stringify(res)
			// console.log("pendingRewards: "+res/1000000000000000000);
			bo.fmPendingRewardsValue=res;

			ires(true);
		});			  	
	}
	catch(err)
	{
		// console.log("Error in getBalanceOf");
		ires(false);
	}
}

function getTimeUntilUnlock(bo,contract, ires,irej)
{
	try
	{
		result = contract.methods.getTimeUntilUnlock(bo.addressValue).call(function(err,res){
			if (err) 
			{
				irej(true);
				return;
			}

			// const rv=JSON.stringify(res)
			// console.log("timeUntilUnlock: "+res/(60*60*25));
			bo.fmDaysToUnlockValue=res;
			ires(true);
		});			  	
	}
	catch(err)
	{
		// console.log("Error in getBalanceOf");
		ires(false);
	}
}

// -------------------------------- END FARM INFO -------------------------



//------------------------ NEW BNB-XUSD FARM INFO -------------------------------------
async function bnbGetFarmInfo(bo,resolve,reject)
{
								
	var result
	
	try
	{
		const gotBalanceOf = new Promise(function(ires, irej) {
			bnbGetBalanceOf (bo,bnbFarmContractInstance, ires,irej);
		});

		const gotRedeemableValue = new Promise(function(ires, irej) {
			bnbGetRedeemableValue (bo,bnbFarmContractInstance, ires,irej);
		});

		const gotPendingRewards = new Promise(function(ires, irej) {
			bnbGetPendingRewards (bo,bnbFarmContractInstance, ires,irej);
		});

		const gotTimeUntilUnlock = new Promise(function(ires, irej) {
			bnbGetTimeUntilUnlock (bo,bnbFarmContractInstance, ires,irej);
		});

		await gotBalanceOf;
		await gotRedeemableValue;
		await gotPendingRewards;
		await gotTimeUntilUnlock;

		resolve(true);						
	}
	catch(err)
	{					
		resolve(false);
		return;
	}
}

function bnbGetBalanceOf(bo,contract, ires,irej)
{
	try
	{
		result = contract.methods.balanceOf(bo.addressValue).call(function(err,res){
			if (err) 
			{
				irej(true);
				return;
			}

			// console.log("balanceOf: "+res/1000000000000000000);								
	    	bo.bnbNumFarmTokensValue=res;
			ires(true);
		});			  	
	}
	catch(err)
	{
		// console.log("Error in getBalanceOf");
		ires(false);
	}
}

function bnbGetRedeemableValue(bo,contract, ires,irej)
{
	try
	{
		result = contract.methods.getRedeemableValue(bo.addressValue).call(function(err,res){
			if (err) 
			{
				irej(true);
				return;
			}

			// const rv=JSON.stringify(res)
			//console.log("redeemableValue1: "+res[0]/1000000000000000000);
			// console.log("redeemableValue2: "+res[1]/1000000000000000000);
			bo.bnbRedeemableXUSDValue=res[0];
			bo.bnbRedeemableBNBValue=res[1];
			ires(true);
		});			  	
	}
	catch(err)
	{
		// console.log("Error in getBalanceOf");
		ires(false);
	}
}

function bnbGetPendingRewards(bo,contract, ires,irej)
{
	try
	{
		result = contract.methods.pendingRewards(bo.addressValue).call(function(err,res){
			if (err) 
			{
				irej(true);
				return;
			}

			// const rv=JSON.stringify(res)
			// console.log("bnb pendingRewards: "+rv);
			bo.bnbPendingRewardsValue=res;

			ires(true);
		});			  	
	}
	catch(err)
	{
		// console.log("Error in getBalanceOf");
		ires(false);
	}
}

function bnbGetTimeUntilUnlock(bo,contract, ires,irej)
{
	try
	{
		result = contract.methods.getTimeUntilUnlock(bo.addressValue).call(function(err,res){
			if (err) 
			{
				irej(true);
				return;
			}

			// const rv=JSON.stringify(res)
			// console.log("timeUntilUnlock: "+res/(60*60*25));
			bo.bnbDaysToUnlockValue=res;
			ires(true);
		});			  	
	}
	catch(err)
	{
		// console.log("Error in getBalanceOf");
		ires(false);
	}
}

// -------------------------------- END FARM NEW BNB-XUSD FARM INFO -------------------------



//------------------------ NEW BTC-XUSD FARM INFO -------------------------------------
async function btcGetFarmInfo(bo,resolve,reject)
{					
	var result
	
	try
	{
			const gotBalanceOf = new Promise(function(ires, irej) {
				btcGetBalanceOf (bo,btcFarmContractInstance, ires,irej);
			});

			const gotRedeemableValue = new Promise(function(ires, irej) {
				btcGetRedeemableValue (bo,btcFarmContractInstance, ires,irej);
			});

			const gotPendingRewards = new Promise(function(ires, irej) {
				btcGetPendingRewards (bo,btcFarmContractInstance, ires,irej);
			});
	
			const gotTimeUntilUnlock = new Promise(function(ires, irej) {
				btcGetTimeUntilUnlock (bo,btcFarmContractInstance, ires,irej);
			});
	
			await gotBalanceOf;
			await gotRedeemableValue;
			await gotPendingRewards;
			await gotTimeUntilUnlock;

			resolve(true);						
	}
	catch(err)
	{					
		// reject(true);
		// console.log("Error in btcGetFarmInfo");
		resolve(false);
		return;
	}
}


function btcGetBalanceOf(bo,contract, ires,irej)
{
	try
	{
		result = contract.methods.balanceOf(bo.addressValue).call(function(err,res){
			if (err) 
			{
				irej(true);
				return;
			}

			// console.log("balanceOf: "+res/1000000000000000000);								
	    	bo.btcNumFarmTokensValue=res;
			ires(true);
		});			  	
	}
	catch(err)
	{
		// console.log("Error in getBalanceOf");
		ires(false);
		// irej(true);
	}
}

function btcGetRedeemableValue(bo,contract, ires,irej)
{
	try
	{
		result = contract.methods.getRedeemableValue(bo.addressValue).call(function(err,res){
			if (err) 
			{
				irej(true);
				return;
			}

			// const rv=JSON.stringify(res)
			//console.log("redeemableValue1: "+res[0]/1000000000000000000);
			// console.log("redeemableValue2: "+res[1]/1000000000000000000);
			bo.btcRedeemableXUSDValue=res[0];
			bo.btcRedeemableSBTCValue=res[1];
			ires(true);
		});			  	
	}
	catch(err)
	{
		// console.log("Error in getBalanceOf");
		ires(false);
		// irej(true);
	}
}

function btcGetPendingRewards(bo,contract, ires,irej)
{
	try
	{
		result = contract.methods.pendingRewards(bo.addressValue).call(function(err,res){
			if (err) 
			{
				// console.log("Reject\n");
				irej(true);
				return;
			}

			// console.log("pendingRewards: "+rv);
			// const rv=JSON.stringify(res)
			bo.btcPendingRewardsValueXUSD=res[0];
			bo.btcPendingRewardsValueSBTC=res[1];

			ires(true);
		});			  	
	}
	catch(err)
	{
		// console.log("Error in getBalanceOf");
		ires(false);
		// irej(true);
	}
}

function btcGetTimeUntilUnlock(bo,contract, ires,irej)
{
	try
	{
		result = contract.methods.getTimeUntilUnlock(bo.addressValue).call(function(err,res){
			if (err) 
			{
				irej(true);
				return;
			}

			// const rv=JSON.stringify(res)
			// console.log("timeUntilUnlock: "+res/(60*60*25));
			bo.btcDaysToUnlockValue=res;
			ires(true);
		});			  	
	}
	catch(err)
	{
		// console.log("Error in getBalanceOf");
		ires(false);
		// irej(true);
	}
}

// -------------------------------- END FARM NEW BTC-XUSD FARM INFO -------------------------


//------------------------ NEW ADA-XUSD FARM INFO -------------------------------------
async function adaGetFarmInfo(bo,resolve,reject)
{						
	var result	
	try
	{
		const gotBalanceOf = new Promise(function(ires, irej) {
			adaGetBalanceOf (bo,adaFarmContractInstance, ires,irej);
		});

		const gotRedeemableValue = new Promise(function(ires, irej) {
			adaGetRedeemableValue (bo,adaFarmContractInstance, ires,irej);
		});

		const gotPendingRewards = new Promise(function(ires, irej) {
			adaGetPendingRewards (bo,adaFarmContractInstance, ires,irej);
		});

		const gotTimeUntilUnlock = new Promise(function(ires, irej) {
			adaGetTimeUntilUnlock (bo,adaFarmContractInstance, ires,irej);
		});

		await gotBalanceOf;
		await gotRedeemableValue;
		await gotPendingRewards;
		await gotTimeUntilUnlock;

		resolve(true);			
	}
	catch(err)
	{					
		// console.log("Error in adaGetFarmInfo");
		resolve(false);
		return;
	}

}


function adaGetBalanceOf(bo,contract, ires,irej)
{
	try
	{
		result = contract.methods.balanceOf(bo.addressValue).call(function(err,res){
			if (err) 
			{
				irej(true);
				return;
			}

			// console.log("balanceOf: "+res/1000000000000000000);								
	    	bo.adaNumFarmTokensValue=res;
			ires(true);
		});			  	
	}
	catch(err)
	{
		// console.log("Error in getBalanceOf");
		ires(false);
		// irej(true);
	}
}

function adaGetRedeemableValue(bo,contract, ires,irej)
{
	try
	{
		result = contract.methods.getRedeemableValue(bo.addressValue).call(function(err,res){
			if (err) 
			{
				irej(true);
				return;
			}

			// const rv=JSON.stringify(res)
			//console.log("redeemableValue1: "+res[0]/1000000000000000000);
			// console.log("redeemableValue2: "+res[1]/1000000000000000000);
			bo.adaRedeemableXUSDValue=res[0];
			bo.adaRedeemableSADAValue=res[1];
			ires(true);
		});			  	
	}
	catch(err)
	{
		// console.log("Error in getBalanceOf");
		ires(false);
		// irej(true);
	}
}

function adaGetPendingRewards(bo,contract, ires,irej)
{
	try
	{
		result = contract.methods.pendingRewards(bo.addressValue).call(function(err,res){
			if (err) 
			{
				// console.log("Reject\n");
				irej(true);
				return;
			}

			// console.log("pendingRewards: "+rv);
			// const rv=JSON.stringify(res)
			bo.adaPendingRewardsValueXUSD=res[0];
			bo.adaPendingRewardsValueSADA=res[1];

			ires(true);
		});			  	
	}
	catch(err)
	{
		// console.log("Error in getBalanceOf");
		ires(false);
		// irej(true);
	}
}

function adaGetTimeUntilUnlock(bo,contract, ires,irej)
{
	try
	{
		result = contract.methods.getTimeUntilUnlock(bo.addressValue).call(function(err,res){
			if (err) 
			{
				irej(true);
				return;
			}

			// const rv=JSON.stringify(res)
			// console.log("timeUntilUnlock: "+res/(60*60*25));
			bo.adaDaysToUnlockValue=res;
			ires(true);
		});			  	
	}
	catch(err)
	{
		// console.log("Error in getBalanceOf");
		ires(false);
		// irej(true);
	}
}



// -------------------------------- END FARM NEW ADA-XUSD FARM INFO -------------------------


//------------------------ NEW USLS-XUSD FARM INFO -------------------------------------
async function uslsGetFarmInfo(bo,resolve,reject)
{
					
	var result	
	try
	{
		const gotBalanceOf = new Promise(function(ires, irej) {
			uslsGetBalanceOf (bo,uslsFarmContractInstance, ires,irej);
		});

		const gotRedeemableValue = new Promise(function(ires, irej) {
			uslsGetRedeemableValue (bo,uslsFarmContractInstance, ires,irej);
		});

		const gotPendingRewards = new Promise(function(ires, irej) {
			uslsGetPendingRewards (bo,uslsFarmContractInstance, ires,irej);
		});

		const gotTimeUntilUnlock = new Promise(function(ires, irej) {
			uslsGetTimeUntilUnlock (bo,uslsFarmContractInstance, ires,irej);
		});

		await gotBalanceOf;
		await gotRedeemableValue;
		await gotPendingRewards;
		await gotTimeUntilUnlock;

		resolve(true);				
		
	}
	catch(err)
	{					
		// console.log("Error in uslsGetFarmInfo");
		resolve(false);
		return;
	}
	
}


function uslsGetBalanceOf(bo,contract, ires,irej)
{
	try
	{
		result = contract.methods.balanceOf(bo.addressValue).call(function(err,res){
			if (err) 
			{
				irej(true);
				return;
			}

			// console.log("balanceOf: "+res/1000000000000000000);								
	    	bo.uslsNumFarmTokensValue=res;
			ires(true);
		});			  	
	}
	catch(err)
	{
		// console.log("Error in getBalanceOf");
		ires(false);
		// irej(true);
	}
}

function uslsGetRedeemableValue(bo,contract, ires,irej)
{
	try
	{
		result = contract.methods.getRedeemableValue(bo.addressValue).call(function(err,res){
			if (err) 
			{
				irej(true);
				return;
			}

			// const rv=JSON.stringify(res)
			//console.log("redeemableValue1: "+res[0]/1000000000000000000);
			// console.log("redeemableValue2: "+res[1]/1000000000000000000);
			bo.uslsRedeemableXUSDValue=res[0];
			bo.uslsRedeemableSUSLSValue=res[1];
			ires(true);
		});			  	
	}
	catch(err)
	{
		// console.log("Error in getBalanceOf");
		ires(false);
		// irej(true);
	}
}

function uslsGetPendingRewards(bo,contract, ires,irej)
{
	try
	{
		result = contract.methods.pendingRewards(bo.addressValue).call(function(err,res){
			if (err) 
			{
				// console.log("Reject\n");
				irej(true);
				return;
			}

			// console.log("pendingRewards: "+rv);
			// const rv=JSON.stringify(res)
			bo.uslsPendingRewardsValueXUSD=res[0];
			bo.uslsPendingRewardsValueSUSLS=res[1];

			ires(true);
		});			  	
	}
	catch(err)
	{
		// console.log("Error in getBalanceOf");
		ires(false);
		// irej(true);
	}
}

function uslsGetTimeUntilUnlock(bo,contract, ires,irej)
{
	try
	{
		result = contract.methods.getTimeUntilUnlock(bo.addressValue).call(function(err,res){
			if (err) 
			{
				irej(true);
				return;
			}

			// const rv=JSON.stringify(res)
			// console.log("timeUntilUnlock: "+res/(60*60*25));
			bo.uslsDaysToUnlockValue=res;
			ires(true);
		});			  	
	}
	catch(err)
	{
		// console.log("Error in getBalanceOf");
		ires(false);
		// irej(true);
	}
}



// -------------------------------- END FARM NEW USLS-XUSD FARM INFO -------------------------


async function getPrice(resolve, reject)
{

	var r= false;
	try
	{
		const price1 = new Promise(function(res, rej) {
			getBnbPrice(res,rej);
		});

	 	await price1;
	}
	catch(err)
	{
		r = true;
	}

	if (r==true)
	{
		reject(true);
		return;
	}

	r= false;
	try
	{
		const price2 = new Promise(function(res, rej) {
			getEthPrice(res,rej);
		});

	 	await price2;
	}
	catch(err)
	{
		r = true;
	}

	if (r==true)
	{
		reject(true);
		return;
	}

	r= false;
	try
	{
		const price3 = new Promise(function(res, rej) {
			getBtcPrice(res,rej);
		});

	 	await price3;
	}
	catch(err)
	{
		r = true;
	}

	r= false;
	try
	{
		const price4 = new Promise(function(res, rej) {
			getAdaPrice(res,rej);
		});

	 	await price4;
	}
	catch(err)
	{
		r = true;
	}

	r= false;
	try
	{
		const price5 = new Promise(function(res, rej) {
			getUselessPrice(res,rej);
		});

	 	await price5;
	}
	catch(err)
	{
		r = true;
	}

	try
	{
		if (r==true)
		{
			reject(true);
			return;
		}
	}
	catch(err)
	{
		return;
	}

	resolve(true);		
}


async function getBnbPrice(resolve,reject)
{
	try
	{
		await getJSON(bnbPriceUrl, async function(error,response) {
			bnbPriceValue = response.binancecoin.usd;
			resolve(true);
		});
	}
	catch(err)
	{
		reject(true);
	}

}



async function getEthPrice(resolve,reject)
{
	try
	{
		await getJSON(ethPriceUrl, async function(error,response) {
			ethPriceValue = response.ethereum.usd;
			resolve(true);
			});
	}
	catch(err)
	{
		reject(true);
	}
}


async function getBtcPrice(resolve,reject)
{
	try
	{
		await getJSON(btcPriceUrl, async function(error,response) {
			btcPriceValue = response.bitcoin.usd;
			resolve(true);
			});
	}
	catch(err)
	{
		reject(true);
	}

}

async function getAdaPrice(resolve,reject)
{
	try
	{
		await getJSON(adaPriceUrl, async function(error,response) {
			adaPriceValue = response.cardano.usd;
			resolve(true);
		});
	}
	catch(err)
	{
		reject(true);
	}
}


async function getUselessPrice(resolve,reject)
{
	try
	{
		await getJSON(uselessPriceUrl, async function(error,response) {
			uselessPriceValue = response.useless.usd;
			resolve(true);
		});
	}
	catch(err)
	{
		reject(true);
	}
}
/*
const port = process.env.PORT || 443;
app.listen(port);

console.log('App is listening on port ' + port);

*/


async function getAllContractAbi()
{
	console.log("Getting Abis....");

	var Web3 = require('web3');
	var web3 = new Web3(new Web3.providers.HttpProvider(httpProvider));
	var version = web3.version.api;

	await getJSON(usdAbi, async function(error,response) {
		if (response.message=='OK')
		{  
			var contractABI = "";
        	contractABI = JSON.parse(response.result);
        	if (contractABI != '')
			{
				sUsdContractInstance = new web3.eth.Contract(contractABI,sUsdContractAddress);
			}			
		}
		else
		{
			initializationError=true;
			return;
		}
	});

	await delay(5000);
	console.log("sUsdContractInstance Done...");

	await getJSON(ethAbi, async function(error,response) {
		if (response.message=='OK')
		{  
			var contractABI = "";
        	contractABI = JSON.parse(response.result);
        	if (contractABI != '')
			{
				sEthContractInstance = new web3.eth.Contract(contractABI,sEthContractAddress);
			}			
		}
		else
		{
			initializationError=true;
			return;
		}
	});

	await delay(5000);
	console.log("sEthContractInstance Done...");

	await getJSON(btcAbi, async function(error,response) {
		if (response.message=='OK')
		{  
			var contractABI = "";
        	contractABI = JSON.parse(response.result);
        	if (contractABI != '')
			{
				sBtcContractInstance = new web3.eth.Contract(contractABI,sBtcContractAddress);
			}			
		}
		else
		{
			initializationError=true;
			return;
		}
	});

	await delay(5000);
	console.log("sBtcContractInstance Done...");

	await getJSON(adaAbi, async function(error,response) {
		if (response.message=='OK')
		{  
			var contractABI = "";
        	contractABI = JSON.parse(response.result);
        	if (contractABI != '')
			{
				sAdaContractInstance = new web3.eth.Contract(contractABI, sAdaContractAddress);
			}			
		}
		else
		{
			initializationError=true;
			return;
		}
	});
	await delay(5000);
	console.log("sAdaContractInstance Done...");


	await getJSON(uselessAbi, async function(error,response) {
		if (response.message=='OK')
		{  
			var contractABI = "";
        	contractABI = JSON.parse(response.result);
        	if (contractABI != '')
			{
				sUselessContractInstance = new web3.eth.Contract(contractABI, sUselessContractAddress);
			}			
		}
		else
		{
			initializationError=true;
			return;
		}
	});

	await delay(5000);
	console.log("sUselessContractInstance Done...");
	
	await getJSON(xusdAbi, async function(error,response) {
		if (response.message=='OK')
		{  
			var contractABI = "";
        	contractABI = JSON.parse(response.result);
        	if (contractABI != '')
			{
				sXusdContractInstance = new web3.eth.Contract(contractABI, sXusdContractAddress);
			}					
		}
		else
		{
			initializationError=true;
			return;
		}
	});

	await delay(5000);
	console.log("sXUsdContractInstance Done...");

	await getJSON(farmAbi, async function(error,response) {
		if (response.message=='OK')
		{  
			var contractABI = "";
        	contractABI = JSON.parse(response.result);
        	if (contractABI != '')
			{
				farmContractInstance = new web3.eth.Contract(contractABI, farmContractAddress);
			}			
		}
		else
		{
			initializationError=true;
			return;
		}
	});
	await delay(5000);
	console.log("farmContractInstance Done...");


	await getJSON(bnbFarmAbi, async function(error,response) {
		if (response.message=='OK')
		{  
			var contractABI = "";
        	contractABI = JSON.parse(response.result);
        	if (contractABI != '')
			{
				bnbFarmContractInstance = new web3.eth.Contract(contractABI, bnbFarmContractAddress);
			}			
		}
		else
		{
			initializationError=true;
			return;
		}
	});
	await delay(5000);
	console.log("bnbFarmInstance Done...");


	await getJSON(btcFarmAbi, async function(error,response) {
		if (response.message=='OK')
		{  
			var contractABI = "";
        	contractABI = JSON.parse(response.result);
        	if (contractABI != '')
			{
				btcFarmContractInstance = new web3.eth.Contract(contractABI, btcFarmContractAddress);
			}			
		}
		else
		{
			initializationError=true;
			return;
		}
	});
	await delay(5000);
	console.log("btcFarmContractInstance Done...");


	await getJSON(adaFarmAbi, async function(error,response) {
		if (response.message=='OK')
		{  
			var contractABI = "";
        	contractABI = JSON.parse(response.result);
        	if (contractABI != '')
			{
				adaFarmContractInstance = new web3.eth.Contract(contractABI,adaFarmContractAddress);
			}			
		}
		else
		{
			initializationError=true;
			return;
		}
	});
	await delay(5000);
	console.log("adaFarmContractInstance Done...");


	await getJSON(uslsFarmAbi, async function(error,response) {
		if (response.message=='OK')
		{  
			var contractABI = "";
        	contractABI = JSON.parse(response.result);
        	if (contractABI != '')
			{
				uslsFarmContractInstance = new web3.eth.Contract(contractABI,uslsFarmContractAddress);
			}			
		}
		else
		{
			initializationError=true;
			return;
		}
	});
	await delay(5000);
	console.log("uslsContractInstance Done...");


	await getJSON(refundAbi, async function(error,response) {
		if (response.message=='OK')
		{  
			var contractABI = "";
        	contractABI = JSON.parse(response.result);
        	if (contractABI != '')
			{
				refundContractInstance = new web3.eth.Contract(contractABI,refundContractAddress);
			}			
		}
		else
		{
			initializationError=true;
			return;
		}
	});


	if (sUsdContractInstance==null ||
		sEthContractInstance== null ||
		sBtcContractInstance== null ||
		sAdaContractInstance == null ||
		sUselessContractInstance == null ||
		sXusdContractInstance == null ||
		farmContractInstance == null ||
	 	bnbFarmContractInstance == null ||
		btcFarmContractInstance == null ||
		adaFarmContractInstance == null ||
		refundContractInstance == null ||
 		uslsFarmContractInstance == null)
	{
		initializationError = true;
		console.log("initialization Error");
		return;
	}
	initializationError = false;
	console.log("Initialized OK");	
}
