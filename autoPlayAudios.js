/*
 * autoPlayAudios html5实现网页auto自动播放背景音乐（尤其针对微信浏览器，其实微信背景音乐自动播放可以到微信官网查看js-sdk  http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html）,
 * 这里主要是为了一劳永逸兼容了大部分浏览器而设计的
 * 注意部分国产手机浏览器其实并不支持自动播放!!!,这里解决的办法是通过监听window的touchstart事件来触发play()方法；
 * 2016-06-04
 * 张叶星
 */
var autoPlayAudios = function(){
	var autoPlayAudios = this;
	autoPlayAudios.audioDOMS = document.querySelectorAll('audio');
	
	//判断是否为微信浏览器
	autoPlayAudios.isWeiXin = function(){ 
		var ua = window.navigator.userAgent.toLowerCase(); 
		if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
			return true; 
		}else{ 
			return false; 
		} 
	} 
	
	//微信配置信息
	autoPlayAudios.autoPlayAudio = function() {
		wx.config({
            // 配置信息, 即使不正确也能使用 wx.ready
            debug: false,
            appId: '',
            timestamp: 1,
            nonceStr: '',
            signature: '',
            jsApiList: []
        });
        wx.ready(function() {
			autoPlayAudios.autoPlay();
        });
	}
	
	//自动播放
	autoPlayAudios.autoPlay  = function(){
		for(var i = 0 ; i < autoPlayAudios.audioDOMS.length ; i++){
			if(autoPlayAudios.audioDOMS[i].getAttribute('autoplay')!=null){
				autoPlayAudios.audioDOMS[i].play();
			}
		}
	}
	
	autoPlayAudios.play = function(){
		window.addEventListener('DOMContentLoaded',function(){
			//判断是否通过微信浏览器打开
//			alert(autoPlayAudios.isWeiXin());
			if(autoPlayAudios.isWeiXin()){
				var script = document.createElement('script');
				script.src = "http://res.wx.qq.com/open/js/jweixin-1.0.0.js";
				script.onload = function(){
					autoPlayAudios.autoPlayAudio();
				}
				document.body.appendChild(script);
			}else{
				//解决浏览器不会自动播放音乐
				var touchStartPlay = true;
				window.addEventListener('touchstart',function(){
					if(touchStartPlay){
						touchStartPlay = false;
						autoPlayAudios.autoPlay();
					}
				},false)
			}
		},false)
	}
}	