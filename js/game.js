// Querystring lib:
var querystring={parse:function(n){var o={};if("string"==typeof(n=void 0!==n?n:window.location.search)&&n.length>0){"?"===n[0]&&(n=n.substring(1));for(var e=0,r=(n=n.split("&")).length;r>e;e++){var t,i,s=n[e],a=s.indexOf("=");a>=0?(t=s.substr(0,a),i=s.substr(a+1)):(t=s,i=""),i=decodeURIComponent(i),void 0===o[t]?o[t]=i:o[t]instanceof Array?o[t].push(i):o[t]=[o[t],i]}}return o},stringify:function(n){var o=[];if(n&&n.constructor===Object)for(var e in n)if(n[e]instanceof Array)for(var r=0,t=n[e].length;t>r;r++)o.push([encodeURIComponent(e),encodeURIComponent(n[e][r])].join("="));else o.push([encodeURIComponent(e),encodeURIComponent(n[e])].join("="));return o.join("&")}};

// Glubbal Voriables:
var firstName = getFirstName();

// Retrieve First Name:

function getFirstName(){
    var tmp = "";
    try{
        tmp = querystring.parse().f.toString();
    }
    catch(e){
        tmp = prompt("Please Enter Your First Name:").trim();
    }
    return tmp;
}

// Starter Code:



