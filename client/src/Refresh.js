import { Component } from 'react';
import './Refresh.css';
import Util from './Util';
import 'bootstrap/dist/css/bootstrap.css';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button'
import {BsArrowRepeat} from 'react-icons/bs';


class Refresh extends Component
{
    constructor(props) 
    {
        super(props);
        this.state = {  error: true,
                        refreshed: false};
    }

    componentDidMount() {
        let u = Util.getInstance();
        u.setRefreshUI(this);
    }

    setRefreshed(b)
    {
      this.setState({refreshed: b});
    }
    setError(e)
    {
        this.setState({error: e});
    }

    render() {
        if (this.state.refreshed===true)
        {
            if (this.state.error===false)
            {
                return ( 
                    <RefreshButton onClick={this.handleClick}/>
                    ) ;
            }
            else
            {
                return ( 
                    <RefreshButtonE onClick={this.handleClick}/>
                    ) ;

            }
        }
        if(this.state.refreshed===false)
        {            
            return ( 
                <SpinnerButton />
                ) ;
            

        }
    }


}

function handleClick()
{
    let u = Util.getInstance();
    var rui = u.getRefreshUI();
    if (rui != null)
    {
        rui.setRefreshed(false);
    }
    window.location.reload();

}

function handleStop()
{
    let u = Util.getInstance();
    var rui = u.getRefreshUI();
    if (rui != null)
    {
        rui.setRefreshed(true);  
        rui.render();
    }
}

function RefreshButton()
{
    return (
        <div className="Refresh">                    
            <Button variant="success"  size="sm" onClick={handleClick}>
                <BsArrowRepeat />                        
            </Button>
        </div>
        ) ;
}

function RefreshButtonE()
{
    return (
        <div className="Refresh">                    
            <div className="blink_me">
                <Button variant="danger"  size="sm" onClick={handleClick}>
                    <BsArrowRepeat />                        
                </Button>
            </div>
        </div>
        ) ;
}

function SpinnerButton()
{
    return (
     <div className="Refresh">
        <Spinner animation="border" role="status" size="sm" >            
        </Spinner>
        <Button variant="danger" size="sm" onClick={handleStop}> 
            Stop           
        </Button>
     </div>
    );

}

export default Refresh;
