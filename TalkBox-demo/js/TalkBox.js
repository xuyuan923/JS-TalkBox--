/**
 * 编写JS留言框组件
 * @date 2014-4-22
 * @author cassiexu
 */
function TalkBox(options) {
	/**
	 *设置别名
	 */
	this.config = {
		targetCls: '#textarea', //点击元素
		width: 641,  //留言框长度
		height: 30,  //留言框宽度
		maxNum: 140, //最大输入字数
		submitBtn : '.submitBtn', //提交按钮 
		counter: '.wordCount',  //文字计数统计
		msg: '.wordCheck label', //内容字数提示语地址
		tipMsg: '您还可以输入：', //输入文字提示
		errorMsg: '您已经超过：'  //留言文字超出统计提示
	}
	this.cache = {
		isrender : true  // 留言框html结构只渲染一次
	}
	this._init(options);
}

TalkBox.prototype = {
	_init: function(options){
		this.config = $.extend(this.config,options || {});
        var self = this,
            _config = self.config,
            _cache = self.cache;
        _config.counter = _config.maxNum; //设置初始值140字数相同
        self._render(); //渲染html结构
		$(_config.targetCls).each(function(index, item) { //这里item等价于this
			//文本框点击事件触发输入框下拉事件、文字计数事件
			$(item).bind('click',function() {
				self._largerBox();
				self._wordCount();
			})
			//文本框失去焦点触发输入框缩小事件
			$(item).blur(function(){
				self._shorterBox()
			});
		})
	},
	/**
     * 渲染留言框DOM结构
     */
	_render: function(){
		var self = this,
            _config = self.config,
            _cache = self.cache;
        var html ='';
        if(_cache.isrender) {
        	html +='<div class="talkbox">'+
        			'<textarea name="" id="textarea" style="font-size:14px;font-family:'+'微软雅黑'+';border-color:rgb( 85, 85, 85 )"></textarea>'+
        			'<div class="action" style="width:660px">'+
					'<span class="wordCheck" style="float:left;margin-left:405px;font-size: 14px;font-family: '+'微软雅黑'+';color: rgb( 85, 85, 85 );text-align: right;width:155px"><label style="text-align:right;width:100px;">'+_config.tipMsg+'</label><strong class="wordCount" style="width:27px;text-align;center">'+_config.counter+'</strong>/'+_config.maxNum+'</span>'+
					'<span class="submitBtn" style="float:left;border-width: 1px;border-color: rgb( 219, 103, 116 );background-color: rgb( 235, 104, 119 );width: 71px;height: 25px;font-size: 16px;font-family:'+'微软雅黑'+';color: rgb( 255, 255, 255 );text-align: center;line-height:25px;margin-left:15px;cursor:pointer">评论</span>'+
					'</div>'+
        			'</div>';
		$('body').append(html);
		$(_config.targetCls).css({
			width:_config.width + 'px',
			height: _config.height + 'px'
		});
		_cache.isrender = false;
        }
	},
	/**
	 *留言框缓慢下拉增大
	 */
	_largerBox: function(){
		var self = this,
            _config = self.config;
        $(_config.targetCls).animate({height:'90px'},'slow')
        
	},
	/**
	 * 留言框缓慢上拉缩小
	 */
	_shorterBox: function(){
		var self = this,
            _config = self.config;
        $(_config.targetCls).animate({height:'30px'},'slow')
	},
	/**
	 * 文字计数
	 * @param {int} [message] [输入框文字长度]
	 * @param {string} [content] [输入框文字内容]
	 */
	_wordCount: function(){
		var self = this,
			_config = self.config;
		$(_config.targetCls).keyup(function(){
			var message = $(_config.targetCls).val().length,
				content = $(_config.targetCls).val();				
			if (message == 0){
				$(_config.msg).html(_config.tipMsg);
				$('.wordCount').html(_config.maxNum);
			} else if (message > (_config.maxNum-1)){
				$(_config.msg).html(_config.errorMsg);
				$('.wordCount').html(message - _config.maxNum);
			} else if(message < _config.maxNum) {	
				$(_config.msg).html(_config.tipMsg);
	            $('.wordCount').html(_config.maxNum - message);
			}
		})
	}
}

