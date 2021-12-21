import './Buttons.css';
import { Component } from 'react';
import Util from './Util';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button'
import {GrLinkNext} from 'react-icons/gr';
import {GrLinkPrevious} from 'react-icons/gr';


import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class Buttons extends Component
{
    static BTN_MAIN_PAGE=1;
    static BTN_INCREASES_PAGE=2;
    static BTN_ANCHOR_PAGE=3;
    static BTN_PRICE_PAGE=4;
    static BTN_FARM_PAGE=5;
    static FARM_OLD=0;
    static FARM_BNB=1;
    static FARM_SBTC=2;
    static FARM_SADA=3;
    static FARM_SUSLS=4;

    constructor(props) 
    {
        super(props);
        this.state = {buttonsState: 1,
                       farmButtonState: 0};        
    }

    componentDidMount() 
    {        
        let u =  Util.getInstance();        
        u.setButtonsUI(this);
        let p = u.getCookie("pageNumber");   
        if (p===2)    
        {
            this.setButtonsState(0);
        }

        let hui = u.getHoldingsUI();
        if(hui != null)
        {
            hui.setPage();
        }
    }

    setButtonsState(s)    
    {
        this.state.buttonsState=s;            
        this.setState({buttonsState:s});        
    }

    getButtonsState()
    {
        return this.state.buttonsState;        
    }

    setFarmButtonState(s)    
    {
        this.state.farmButtonState=s;            
        this.setState({farmButtonState:s});        
    }

    getFarmButtonState()
    {
        return this.state.farmButtonState;        
    }

    render() 
    {

        let u =  Util.getInstance();        
        let p = u.getCookie("pageNumber");   
        if (p==2)    
        {
            return(
                <div className="Buttons">
                <NoButton />
            </div>);
        }

        if (this.state.buttonsState===0)
        {
            return(
                <div className="Buttons">
                <NoButton />
            </div>);
        }
        if (this.state.buttonsState===Buttons.BTN_MAIN_PAGE)
        {
            return(        
            <div className="Buttons">
                <ResetButton />
                <IncreaseButton />
                <PriceButton />
                <FarmButton />
            </div>);
        }
        if (this.state.buttonsState===Buttons.BTN_INCREASES_PAGE)
        {

            return(        
                <div className="Buttons">
                    <GoToMainButton />
                </div>);    
        }        

        if (this.state.buttonsState===Buttons.BTN_ANCHOR_PAGE)
        {
            return(<div className="Buttons">
                <SaveButton />
                <CancelButton />
                <FillCurrentButton />
            </div>);
        }
        if (this.state.buttonsState===Buttons.BTN_PRICE_PAGE)
        {
            return(<div className="Buttons">
                <GoToMainButton />                
            </div>);
        }

        if (this.state.buttonsState===Buttons.BTN_FARM_PAGE)
        {
            return(<div className="Buttons">
                <GoToMainButton />                                
                <OriginalBNBFarmButton />
                <BNBFarmButton />
                <SBTCFarmButton />
                <SADAFarmButton />
                <SUSLSFarmButton />                
            </div>);
        }
    }
}

function handleFarmOldClick()
{    
    let u =  Util.getInstance();
    let bui = u.getButtonsUI();
    let hui = u.getHoldingsUI();
    
    if (bui != null)
    {
        bui.setButtonsState(Buttons.BTN_FARM_PAGE);
        bui.setFarmButtonState(Buttons.FARM_OLD);
        hui.setPage();        
    }
}

function handleFarmBnbClick()
{    
    let u =  Util.getInstance();
    let bui = u.getButtonsUI();
    let hui = u.getHoldingsUI();
    
    if (bui != null)
    {
        bui.setButtonsState(Buttons.BTN_FARM_PAGE);
        bui.setFarmButtonState(Buttons.FARM_BNB);
        hui.setPage();
        
    }
}

function handleFarmSbtcClick()
{    
    let u =  Util.getInstance();
    let bui = u.getButtonsUI();
    let hui = u.getHoldingsUI();
    
    if (bui != null)
    {
        bui.setButtonsState(Buttons.BTN_FARM_PAGE);
        bui.setFarmButtonState(Buttons.FARM_SBTC);
        hui.setPage();
        
    }
}

function handleFarmSadaClick()
{    
    let u =  Util.getInstance();
    let bui = u.getButtonsUI();
    let hui = u.getHoldingsUI();
    
    if (bui != null)
    {
        bui.setButtonsState(Buttons.BTN_FARM_PAGE);
        bui.setFarmButtonState(Buttons.FARM_SADA);
        hui.setPage();
        
    }
}
function handleFarmSuslsClick()
{    
    let u =  Util.getInstance();
    let bui = u.getButtonsUI();
    let hui = u.getHoldingsUI();
    
    if (bui != null)
    {
        bui.setButtonsState(Buttons.BTN_FARM_PAGE);
        bui.setFarmButtonState(Buttons.FARM_SUSLS);
        hui.setPage();        
    }
}

function handleResetClick()
{
    console.log("handleResetClick");
    
    let u =  Util.getInstance();
    let bui = u.getButtonsUI();
    let hui = u.getHoldingsUI();
    
    if (bui != null)
    {
        bui.setButtonsState(Buttons.BTN_ANCHOR_PAGE);
        hui.setPage();
    }

    /*
    confirmAlert({
        title: 'Confirm to reset anchor',
        message: 'Are you sure you want to reset?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {console.log("yes")}
          },
          {
            label: 'No',            
            onClick: () => {console.log("no")}
          }
        ]
      });
      */
}

function handleIncreaseClick()
{
    console.log("handleIncreaseClick");
    let u =  Util.getInstance();
    let bui = u.getButtonsUI();
    let hui = u.getHoldingsUI();
    
    if (bui != null)
    {
        bui.setButtonsState(Buttons.BTN_INCREASES_PAGE);
        hui.setPage();
    }
}

function handlePriceClick()
{
    console.log("handlePriceClick");
    let u =  Util.getInstance();
    let bui = u.getButtonsUI();
    let hui = u.getHoldingsUI();
    
    if (bui != null)
    {
        bui.setButtonsState(Buttons.BTN_PRICE_PAGE);
        hui.setPage();
    }
}

function handleFarmClick()
{
    console.log("handleFarmClick");
    let u =  Util.getInstance();
    let bui = u.getButtonsUI();
    let hui = u.getHoldingsUI();
    
    if (bui != null)
    {
        bui.setButtonsState(Buttons.BTN_FARM_PAGE);
        hui.setPage();
    }
}

function handleSaveClick()
{
    console.log("handleSaveClick");
    let u =  Util.getInstance();
    let bui = u.getButtonsUI();
    let hui = u.getHoldingsUI();
    let aui = u.getAnchorUI();
    
    if (bui != null)
    {
        bui.setButtonsState(Buttons.BTN_MAIN_PAGE);
        hui.setPage();
        
        console.log("USD Anchor: " + aui.getUSDAnchorValue());
        console.log("ETH Anchor: " + aui.getETHAnchorValue());
        console.log("BTC Anchor: " + aui.getBTCAnchorValue());
        console.log("ADA Anchor: " + aui.getADAAnchorValue());

        aui.saveAnchor();
    }
}

function handleCancelClick()
{
    console.log("handleCancelClick");
    let u =  Util.getInstance();
    let bui = u.getButtonsUI();
    let hui = u.getHoldingsUI();
    
    if (bui != null)
    {
        bui.setButtonsState(Buttons.BTN_MAIN_PAGE);
        hui.setPage();
    }
}

function handleGoToMainClick()
{
    console.log("handleNormalClick");
    let u =  Util.getInstance();
    let bui = u.getButtonsUI();
    let hui = u.getHoldingsUI();
    
    if (bui != null)
    {
        bui.setButtonsState(Buttons.BTN_MAIN_PAGE);
        hui.setPage();
    }
}

function handleFillClick()
{
    let u =  Util.getInstance();    
    let aui = u.getAnchorUI();
    aui.fillAnchor();    
}

function ResetButton()
{
    return (
        <div className="ResetButton">                    
            <Button variant="success"  size="sm" onClick={handleResetClick}>
                New Anchor                        
            </Button>
        </div>
        ) ;
}

function IncreaseButton()
{
    return (
        <div className="IncreaseButton">                    
            <Button variant="success"  size="sm" onClick={handleIncreaseClick}>
                Increases
            </Button>
        </div>
        ) ;
}

function GoToMainButton()
{
    return (
        <div className="GoToMainButton">                    
            <Button variant="success"  size="sm" onClick={handleGoToMainClick}>
                <GrLinkPrevious /> Main
            </Button>
        </div>
        ) ;
}


function NoButton()
{
    return (
        <div></div>);
    
}


function SaveButton()
{
    return (
        <div className="SaveButton">                    
            <Button variant="success"  size="sm" onClick={handleSaveClick}>
                Save                    
            </Button>
        </div>
        ) ;
}

function CancelButton()
{
    return (
        <div className="CancelButton">                    
            <Button variant="success"  size="sm" onClick={handleCancelClick}>
                Cancel                    
            </Button>
        </div>
        ) ;
}

function FillCurrentButton()
{
    return (
        <div className="FillCurrentButton">                    
            <Button variant="success"  size="sm" onClick={handleFillClick}>
                Fill Current                 
            </Button>
        </div>
        ) ;
}

function PriceButton()
{
    return (
        <div className="PriceButton">                    
            <Button variant="success"  size="sm" onClick={handlePriceClick}>
                Prices                 
            </Button>
        </div>
        ) ;
}


function FarmButton()
{
    return (
        <div className="FarmButton">                    
            <Button variant="success"  size="sm" onClick={handleFarmClick}>
                Farms
            </Button>
        </div>
        ) ;
}

function OriginalBNBFarmButton()
{
    return (
        <div className="FarmChildrenButton">                    
            <Button variant="success"  size="sm" onClick={handleFarmOldClick}>
                old                 
            </Button>
        </div>
        ) ;
}

function BNBFarmButton()
{
    return (
        <div className="FarmChildrenButton">                    
            <Button variant="success"  size="sm" onClick={handleFarmBnbClick}>
                bnb
            </Button>
        </div>
        ) ;
}

function SBTCFarmButton()
{
    return (
        <div className="FarmChildrenButton">                    
            <Button variant="success"  size="sm" onClick={handleFarmSbtcClick}>
                sbtc                
            </Button>
        </div>
        ) ;
}

function SADAFarmButton()
{
    return (
        <div className="FarmChildrenButton">                    
            <Button variant="success"  size="sm" onClick={handleFarmSadaClick}>
                sada
            </Button>
        </div>
        ) ;
}

function SUSLSFarmButton()
{
    return (
        <div className="FarmChildrenButton">                    
            <Button variant="success"  size="sm" onClick={handleFarmSuslsClick}>
                susls
            </Button>
        </div>
        ) ;
}



export default Buttons;
