# autoPlayAudios

autoPlayAudios html5实现网页auto自动播放背景音乐（尤其针对微信浏览器，其实微信背景音乐自动播放可以到微信官网查看js-sdk  http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html);

这里主要是为了一劳永逸兼容了大部分浏览器而设计的；

注意部分国产手机浏览器其实并不支持自动播放!!!,这里解决的办法是通过监听window的touchstart事件来触发play()方法；

var apas = new autoPlayAudios();

apas.play();
