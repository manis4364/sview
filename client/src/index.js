import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './Screen.css';
import Holdings from './Holdings';
import Summary from './Summary';
import Account from './Account';
import Header from './Header';
import Buttons from './Buttons';
import Footer from './Footer';
import Refresh from './Refresh';
import Navigation from './Navigation';
import './GoogleFixedads.css';
import GoogleFixedads from './GoogleFixedads.js';
import {BsArrowRepeat} from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button'
import {GrLinkNext} from 'react-icons/gr';
import {GrLinkPrevious} from 'react-icons/gr';


import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
     <div className="Screen">
        <Header />
        <Summary />
        <Account />
        <Holdings />
        <Buttons />    
        <Footer />    
        <Refresh />
        <Navigation />        
    </div>
    <div className="Text">
      <h1 align="center"><b>Surge Token Viewer</b></h1>
      <h2 align="left"><b>Latest Update</b></h2>
      <p>
          I have added more farm info under the farms page. The surge fund info has also been updated.

        <br /> <br/>

        Since the server is scanning all the surge contracts there seems to be occasions,especially when things are busy, that the web3 functions might fail
        and send 0s as values. Please do not panic and hit refresh again. You might have to do this a few times to get all the information.
        <br/> <br />
      
        If you find any issues please shout out in the surge discord server.
      </p>
      <h2 align="left"><b>Button Descriptions</b></h2>
      <p>
        <ul id="buttonList">
          <li id="buttonListItem">  
            <Button variant="success"  size="sm">
                <BsArrowRepeat />                        
            </Button>  This button retrieves the latest information from the binance blockchain.
          </li>
          <li id="buttonListItem">
            <Button variant="danger"  size="sm">
                Stop                        
            </Button> This button appears after a the refresh button is pressed. It is used to allow you to stop the refresh.
          </li>
          <li id="buttonListItem">
            <Button variant="danger"  size="sm">
                <BsArrowRepeat />                        
            </Button> This blinking red button appears if the refresh failed for any reason.
          </li>
          <li id="buttonListItem">  
            <Button variant="success"  size="sm">
                <GrLinkNext />                        
            </Button>  This button fetches the information for the refund Contract and displays it on its own page
          </li>
          <li id="buttonListItem">  
            <Button variant="success"  size="sm">
                <GrLinkPrevious />                        
            </Button>  This button fetches the information for the Surge Tokens and displays it on its own page
          </li>
          <li id="buttonListItem">  
            <Button variant="success">
                New Anchor                        
            </Button> This button takes you to the Anchor setup page. On this page you can manually enter your own anchors, or 
            fill the anchors with the current pegged values by pressing the <Button variant="success">
                Fill Current                   
            </Button> button.
          </li>
          <li id="buttonListItem">
            <Button variant="success">
                Save                   
            </Button> This button saves the input fields and then takes you back to the surge token page.
          </li>
          <li id="buttonListItem">
            <Button variant="success">
                Cancel                   
            </Button> This button does not save anything and brings you back to the surge token page
          </li>
          <li id="buttonListItem">
            <Button variant="success">
                Fill Current                   
            </Button> This button fills the input values with the current values of the pegged tokens. You can save these values by pressing the <Button variant="success">
                Save                   
            </Button> button and if you do not want to save these values press the <Button variant="success">
                Cancel                   
            </Button> button.
          </li>
          <li id="buttonListItem">
            <Button variant="success">
                Increases
            </Button> This button takes you to the increases page. The following is shown here:
            <ul className="none">
              <li> current value of the pegged token </li>
              <li> the saved anchor value </li>
              <li> the increase which is the current value minus the anchor value </li>
              <li> the increase percentage which is increase divided by the anchorValue</li>
              <li> the increase represented in USD dollar value</li>
            
            </ul>
          </li>
          <li id="buttonListItem">
            <Button variant="success">
                Prices
            </Button> This button takes you to the Prices page. The following is shown here:
            <ul className="none">
              <li> the current price of the underlying token in USD dollars </li>
              <li> the current value of the Surge Token in relation to the underlying token. It is the ratio of "number of underlying pegged tokens/number of Surge tokens"</li>
              <li> the value of the Surge Token in relation to USD dollars</li>            
            </ul>
          </li>
          <li id="buttonListItem">
            <Button variant="success">
                Farms
            </Button> This button takes you to the Farm Contract Pages. You will find the following farm information there:
            <ul className="none">
              <li>            
                  <Button variant="success"  size="sm" >
                    old                 
                  </Button> This button takes you to the original Bnb-XUSD farm contract
              </li>
              <li>            
                  <Button variant="success"  size="sm" >
                    bnb
                  </Button> This button takes you to the new Bnb-XUSD farm contract
              </li>
              <li>            
                  <Button variant="success"  size="sm" >
                    sbtc
                  </Button> This button takes you to the new SBTC-XUSD farm contract
              </li>
              <li>            
                  <Button variant="success"  size="sm" >
                    sada
                  </Button> This button takes you to the new SADA-XUSD farm contract
              </li>
              <li>            
                  <Button variant="success"  size="sm" >
                    susls
                  </Button> This button takes you to the new SUSLS-XUSD farm contract
              </li>
            </ul>
          </li>

          <li id="buttonListItem">
            <Button variant="success">
                <GrLinkPrevious /> Main Page                        
            </Button> This button is on the increases page and takes you back to the main page that lists your surge tokens.
          </li>

        </ul>
      </p>
      <h2 align="left"><b>Misc Notes</b></h2>
      <ul>
      <li>
        <p>
          The above app is a viewer that allows the holder's of the surge tokens to be able to view the value of the underlying 
          pegged token. According to the Surge contract the underlying pegged token should never fall below the value of the
          initial investment.
        </p>  

      </li>
      <li>
        <p>
          Currently the surge ecosystem has four tokens, sUSD, sETH, sBTC, and sADA. The sUSD is pegged to the binance USD token.
          The sETH is pegged to the binance ethereum token. The sBTC token is pegged to the binance BTC token and the sADA token is 
          pegged to the binance ADA token.
        </p>
      </li>
      <li>
        <p>
          The above viewer also shows what is in the refund contract. By hitting the right and left green arrows of the app, the user can
          toggle between seeing the Surge tokens or the Refund Contract. 
        </p>
      </li>
      <li>
        <p>
          Your bep20 address is the public portion of the binance smart chain address. Though this address is public, it is a good idea
          to keep it private from prying eyes. With this address, the above app is able to use the bscscan api to scan for your information.
        </p>
      </li>
      <li>
        <p>
          The bep20 address will be stored as a cookie on your browser. This is so that the next time you open this site you do not
          need to re-enter this address. This is done so that it is convenient for you to view your balances.
        </p>
      </li>
      <li>
        <p>
          This app is formatted so that it can be easily viewed on your phone.
        </p>
      </li>
      <li>
        <p>
          The app scans all the available surge contracts and uses your public address to collect your information and display it for
          you. This app has no access to your private key. It uses only the information that is publically available. You cannot use This
          app to sell any of your surge tokens.
        </p>
      </li>
      <li>
        <p>
          The app uses the public coingecko api to get the current prices of the underlying token. The price of the underlying token is
          denominated in USD dollars. In the future, I may allow this to be selectable.
        </p>
      </li>

      </ul>
    </div>
  </React.StrictMode>,
  document.getElementById('root')  
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
