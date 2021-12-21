import  { Component } from 'react';

class Util extends Component
{
    static myInstance = null;
    static holdings=null;
    static refreshUI=null;
    static summaryUI= null;
    static navigationUI = null;
    static buttonsUI = null;
    static anchorUI = null;
    static increasesUI = null;
    static farmPageUI = null;

    constructor()
    {
        super();
    }

    setFarmPageUI(h)
    {
      let u = Util.getInstance();
      if (u != null)
      {
        u.farmPageUI = h;
      }
    }

    getFarmPageUI()
    {
      let u = Util.getInstance();
      if (u != null)
      {
         return u.farmPageUI;
      }
    }

    static getInstance()
    {
      if (Util.myInstance == null) 
      {
        Util.myInstance = new Util();
      }
      return this.myInstance;
    }

    setIncreasesUI(h)
    {
      let u = Util.getInstance();
      if (u != null)
      {
        u.increasesUI = h;
      }
    }

    setAnchorUI(h)
    {
      let u = Util.getInstance();
      if (u != null)
      {
        u.anchorUI = h;
      }
    }

    setButtonsUI(h)
    {
      let u = Util.getInstance();
      if (u != null)
      {
        u.buttonsUI = h;
      }
    }



    setHoldingsUI(h)
    {
      let u = Util.getInstance();
      if (u != null)
      {
        u.holdings = h;
      }
    }

    setRefreshUI(r)
    {
      let u = Util.getInstance();
      if (u != null)
      {
        u.refreshUI = r;
      }
    }

    setNavigationUI(r)
    {
      let u = Util.getInstance();
      if (u != null)
      {
        u.navigationUI = r;
      }
    }

    setSummaryUI(r)
    {
      let u = Util.getInstance();
      if (u != null)
      {
        u.summaryUI = r;
      }
    }

    getIncreasesUI()
    {
      let u = Util.getInstance();
      if (u != null)
      {
         return u.increasesUI;
      }
    }

    getAnchorUI()
    {
      let u = Util.getInstance();
      if (u != null)
      {
         return u.anchorUI;
      }
    }

    getButtonsUI()
    {
      let u = Util.getInstance();
      if (u != null)
      {
         return u.buttonsUI;
      }
    }


    getSummaryUI()
    {
      let u = Util.getInstance();
      if (u != null)
      {
         return u.summaryUI;
      }
    }


    getHoldingsUI()
    {
      let u = Util.getInstance();
      if (u != null)
      {
         return u.holdings;
      }
    }
    getRefreshUI()
    {
      let u = Util.getInstance();
      if (u != null)
      {
         return u.refreshUI;
      }
    }

    getNavigationUI()
    {
      let u = Util.getInstance();
      if (u != null)
      {
         return u.navigationUI;
      }
    }

    setCookie(name, value, days)
    {
        var expires="";
        if (days)
        {
            var date = new Date();
            date.setTime(date.getTime()+days*24*60*60*1000); // ) removed
            expires = "; expires=" + date.toGMTString(); // + added
        }
        else
            expires = "";

        document.cookie = name+"=" + value+expires + ";path=/"; // + and " added
    }

    getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) === ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }
      
}

export default Util;