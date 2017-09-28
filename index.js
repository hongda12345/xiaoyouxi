/*
* @Author: 宏达
* @Date:   2017-09-28 15:12:52
* @Last Modified by:   宏达
* @Last Modified time: 2017-09-28 21:29:34
*/
function Game(){
	this.charArr=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	this.current=[];
	this.number=5;
	this.speed=10;
	this.score=0;
	this.position=[];
	this.gk=10;
}
Game.prototype={
	start:function(){
		this.getChars();
        this.drop();
	    this.key();
	    this.checkPosition();
	    // this.next();
	},
	getChars:function(){
        for(let i=0;i<this.number;i++){
        	this.getChar();
        }
	},
	getChar:function(){
		let num=Math.floor(Math.random()*this.charArr.length);
		let divs=document.createElement('div');
        divs.innerText=this.charArr[num];
	    divs.classList.add('char');
	    let tops=Math.random()*100;
	    let lefts=(innerWidth-400)*Math.random()+200;
	    while(this.checkPosition(lefts)){
            lefts=(innerWidth-400)*Math.random()+200;
	    };
	    this.position.push(lefts);
	    divs.style.cssText=`
            top:${tops}px;left:${lefts}px;
	    `;
	    document.body.appendChild(divs);
	    this.current.push(divs);
	},
	checkPosition:function(lefts){
		let flag=this.position.some(function(value){
			return Math.abs(value-lefts)<60;
		})
		return flag;
	},
    drop:function(){
    	let that=this;
    	this.t=setInterval(function(){
    		for(let i=0;i<that.current.length;i++){
    			let tops=that.current[i].offsetTop+that.speed;
    			that.current[i].style.top=`${tops}px`;
    			if(tops>=500){
    				document.body.removeChild(that.current[i]);
    				that.current.splice(i,1);
    				that.position.splice(i,1);
    				that.getChar();
    			}
    		}
    	}, 300)
    },
    key:function(){
    	let that=this;
    	document.onkeydown=function(e){
            for(let i=0;i<that.current.length;i++){
            	if(String.fromCharCode(e.keyCode)==that.current[i].innerText){
            		that.score+=2;
            		document.body.removeChild(that.current[i]);
    				that.current.splice(i,1);
    				that.position.splice(i,1);
    				that.getChar();
    				if(that.score==that.gk){
    					that.next();
    				}
            	}
            }
    	}
    },
    next:function(){
    	clearInterval(this.t);
    	for(let i=0;i<this.current.length;i++){
    		document.body.removeChild(this.current[i]);
    	}
    	this.current.length=0;
    	this.position.length=0;
    	this.number++;
    	this.gk+=10;
    	this.start();
    },
}