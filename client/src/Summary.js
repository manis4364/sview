import './Summary.css';
import React, { Component } from 'react';
import Util from './Util';

class Summary extends Component {
    // Initialize the state
    constructor(props){
      super(props);
      this.state = {
                    totalUSD : '0',
                   };
    }
  
    // Fetch the list on first mount
    componentDidMount() 
    {      
        let u = Util.getInstance();
        u.setSummaryUI(this);
        // this.getList();
    }

    setTotal(b)
    {
      this.setState({totalUSD: b});
    }
    
    render() {
      return (
        <div className="Summary">
          <header >
            <p>
              ${this.state.totalUSD}
            </p>
          </header>
        </div>
      );    
    }
  }

  /*
function Summary() {
  return (
    <div className="Summary">
      <header >
        <p>
          $80.00
        </p>
      </header>
    </div>
  );
}
*/
export default Summary;
