import { Component } from 'react';
import './Navigation.css';
import Util from './Util';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button'
import {GrLinkNext} from 'react-icons/gr';
import {GrLinkPrevious} from 'react-icons/gr';


class Navigation extends Component
{
    constructor(props) 
    {
        super(props);
        this.state = {pageNumber: "1" };
    }

    componentDidMount() 
    {
        
        let u =  Util.getInstance();
        u.setNavigationUI(this);

        let p = u.getCookie("pageNumber");

        if (p==="")
        {
            p="1";
        }
        console.log("pageNumber: "+p);
        this.setState({pageNumber: p});
        
    }

    setPageNumber(n)
    {
        this.setState({pageNumber:n}); 
    }

    render() 
    {
        if (this.state.pageNumber==="1")
        {
            return (
                        <NextButton />                    
            );
        }
        else
        {
            return (                
                    <PrevButton />                
            );
        }
    }
}

function handleNextClick()
{
    let u =  Util.getInstance();
    let nui = u.getNavigationUI();
    
    if (nui != null)
    {
        nui.setPageNumber("2");
        u.setCookie("pageNumber","2",365);
    }            

    let hui = u.getHoldingsUI();    
    hui.setPage();
    window.location.reload();
}

function handlePrevClick()
{

    let u =  Util.getInstance();
    let nui = u.getNavigationUI();

    
    if (nui != null)
    {
        nui.setPageNumber("1");
        u.setCookie("pageNumber","1",365);
    }            
    window.location.reload();
}


function NextButton()
{
    return (
        <div className="Next">                    
            <Button variant="success"  size="sm" onClick={handleNextClick}>
                <GrLinkNext />                        
            </Button>
        </div>
        ) ;
}

function PrevButton()
{
    return (
        <div className="Prev">                    
            <Button variant="success"  size="sm" onClick={handlePrevClick}>
                <GrLinkPrevious />                        
            </Button>
        </div>
        ) ;
}


export default Navigation;
