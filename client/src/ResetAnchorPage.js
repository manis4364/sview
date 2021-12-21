import './ResetAnchorPage.css';
import { Component } from 'react';
import Util from './Util';
import 'bootstrap/dist/css/bootstrap.css';


class ResetAnchorPage extends Component
{
    constructor(props) 
    {
        super(props);
        this.state = {buttonsState: 1,
                      usdAnchor: 0,
                      ethAnchor: 0,
                      btcAnchor: 0,
                      adaAnchor: 0,
                      uselessAnchor: 0,
                      xusdAnchor: 0};

        this.handleChangeUSDAnchor = this.handleChangeUSDAnchor.bind(this);     
        this.handleChangeETHAnchor = this.handleChangeETHAnchor.bind(this);     
        this.handleChangeBTCAnchor = this.handleChangeBTCAnchor.bind(this);     
        this.handleChangeADAAnchor = this.handleChangeADAAnchor.bind(this);     
        this.handleChangeUSELESSAnchor = this.handleChangeUSELESSAnchor.bind(this);     
        this.handleChangeXUSDAnchor = this.handleChangeXUSDAnchor.bind(this);     
    }

    componentDidMount() 
    {        
        let u =  Util.getInstance();        
        u.setAnchorUI(this);
        let p = u.getCookie("pageNumber");   

        let usdAnchorValue = u.getCookie("usdAnchorValue");
        if (usdAnchorValue != null)
        {
          this.setState({usdAnchor: usdAnchorValue});
        }

        let ethAnchorValue = u.getCookie("ethAnchorValue");
        if (ethAnchorValue != null)
        {
          this.setState({ethAnchor: ethAnchorValue});
        }
        let btcAnchorValue = u.getCookie("btcAnchorValue");
        if (btcAnchorValue != null)
        {
          this.setState({btcAnchor: btcAnchorValue});
        }
        let adaAnchorValue = u.getCookie("adaAnchorValue");
        if (adaAnchorValue != null)
        {
          this.setState({adaAnchor: adaAnchorValue});
        }
        let uselessAnchorValue = u.getCookie("uselessAnchorValue");
        if (uselessAnchorValue != null)
        {
          this.setState({uselessAnchor: uselessAnchorValue});
        }
        let xusdAnchorValue = u.getCookie("xusdAnchorValue");
        if (xusdAnchorValue != null)
        {
          this.setState({xusdAnchor: xusdAnchorValue});
        }

    }

    handleChangeUSDAnchor(event) 
    {
      this.setState({usdAnchor: event.target.value});
    }
    handleChangeETHAnchor(event) 
    {
      this.setState({ethAnchor: event.target.value});
    }
    handleChangeBTCAnchor(event) 
    {
      this.setState({btcAnchor: event.target.value});
    }
    handleChangeADAAnchor(event) 
    {
      this.setState({adaAnchor: event.target.value});
    }

    handleChangeUSELESSAnchor(event) 
    {
      this.setState({uselessAnchor: event.target.value});
    }

    handleChangeXUSDAnchor(event) 
    {
      this.setState({xusdAnchor: event.target.value});
    }


    saveUSDAnchor(a) 
    {
      console.log("Saving: " + a);
      let u =  Util.getInstance();
      u.setCookie("usdAnchorValue",a,365);
    }
    saveETHAnchor(a) 
    {
      let u =  Util.getInstance();
      u.setCookie("ethAnchorValue",a,365);
      
    }
    saveBTCAnchor(a) 
    {
      let u =  Util.getInstance();
      u.setCookie("btcAnchorValue",a,365);
      
    }
    saveADAAnchor(a) 
    {
      let u =  Util.getInstance();
      u.setCookie("adaAnchorValue",a,365);      
    }

    saveUSELESSAnchor(a) 
    {
      let u =  Util.getInstance();
      u.setCookie("uselessAnchorValue",a,365);      
    }

    saveXUSDAnchor(a) 
    {
      let u =  Util.getInstance();
      u.setCookie("xusdAnchorValue",a,365);      
    }

    saveAnchor()
    {
      if(this.state.usdAnchor!=="")
      {
        this.saveUSDAnchor(this.state.usdAnchor);
      }
      if(this.state.ethAnchor!=="")
      {
        this.saveETHAnchor(this.state.ethAnchor);
      }
      if(this.state.btcAnchor!=="")
      {
        this.saveBTCAnchor(this.state.btcAnchor);
      }
      if(this.state.adaAnchor!=="")
      {
        this.saveADAAnchor(this.state.adaAnchor);
      }
      if(this.state.uselessAnchor!=="")
      {
        this.saveUSELESSAnchor(this.state.uselessAnchor);
      }
      if(this.state.xusdAnchor!=="")
      {
        this.saveXUSDAnchor(this.state.xusdAnchor);
      }
    }

    fillAnchor()
    {
      let u =  Util.getInstance();
      let hui = u.getHoldingsUI();

      let usd=hui.getValueUSD()
      this.setState({usdAnchor: usd});

      let eth=hui.getValueETH()
      this.setState({ethAnchor: eth});

      let btc=hui.getValueBTC()
      this.setState({btcAnchor: btc});

      let ada=hui.getValueADA()
      this.setState({adaAnchor: ada});

      let useless=hui.getValueUSELESS()
      this.setState({uselessAnchor: useless});

      let xusd=hui.getValueXUSD()
      this.setState({xusdAnchor: xusd});


    }

    getUSDAnchorValue()
    {
      return this.state.usdAnchor;
    }

    getETHAnchorValue()
    {
      return this.state.ethAnchor;
    }
    getBTCAnchorValue()
    {
      return this.state.btcAnchor;
    }
    getADAAnchorValue()
    {
      return this.state.adaAnchor;
    }

    getUSELESSAnchorValue()
    {
      return this.state.uselessAnchor;
    }

    getXUSDAnchorValue()
    {
      return this.state.xusdAnchor;
    }

    render() 
    {
        let u = Util.getInstance();
        let hui = u.getHoldingsUI();

        return (            
            <div className="Anchor">
                <p className="AnchorTitle"> <b>Anchor Cookie Values</b></p>                
                <p > current USD: {hui.getValueUSD()}</p>
               <label className="AnchorLabel"> USD: 
                <input className="AnchorInput" type="number" value={this.state.usdAnchor} onChange={this.handleChangeUSDAnchor}/>
              </label>
              <p > current ETH: {hui.getValueETH()}</p>
              <label className="AnchorLabel"> ETH:
                <input className="AnchorInput" type="number" value={this.state.ethAnchor} onChange={this.handleChangeETHAnchor}/>
              </label>
              <p > current BTC: {hui.getValueBTC()}</p>
              <label className="AnchorLabel"> BTC:
                <input className="AnchorInput" type="number" value={this.state.btcAnchor} onChange={this.handleChangeBTCAnchor}/>
              </label>
              <p > current ADA: {hui.getValueADA()}</p>
              <label className="AnchorLabel"> ADA:
                <input className="AnchorInput" type="number" value={this.state.adaAnchor} onChange={this.handleChangeADAAnchor}/>
              </label>
              <p > current USLS: {hui.getValueUSELESS()}</p>
              <label className="AnchorLabel"> USLS:
                <input className="AnchorInput" type="number" value={this.state.uselessAnchor} onChange={this.handleChangeUSELESSAnchor}/>
              </label>
              <p > current XUSD: {hui.getValueXUSD()}</p>
              <label className="AnchorLabel"> XUSD:
                <input className="AnchorInput" type="number" value={this.state.xusdAnchor} onChange={this.handleChangeXUSDAnchor}/>
              </label>
           </div>);         
    }
}

export default ResetAnchorPage;