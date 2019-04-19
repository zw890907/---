function Login (btn) {
	this.btn = document.querySelector(btn);
	this.content = document.querySelector("#box");
	this.bindEvents();
}
//绑定事件
Login.prototype.bindEvents = function () {
	//给btn绑事件
	this.btn.onclick = () =>{
		this.content.innerHTML = '<h4>用户发布</h4>'+
				'<a id="del" class="del" href="javascript:;">X</a>'+
				'<p><label>用户名：<input id="username" type="text"></label></p>'+
				'<p><label>内&nbsp;&nbsp;&nbsp;容：<input id="password" type="text"></label></p>'+
				'<p><button id="smBtn" class="smBtn" type="button">发布</button></p>'
				;
		//引用工具让上面弹框决定居中
		tools.showCenter(this.content);
		//创建一个模态层
		this.modal = document.createElement("div");
		//给模态层创建class名，增加样式
		this.modal.className = "modal";
		//将模态层放入页面中
		document.body.appendChild(this.modal);
		//给弹框增加拖拽效果，调用方法
		var h4 = document.querySelector("h4");
		new Incident(this.content,h4);
	}
	//给删除按钮和发布绑事件,可以将事件委托给this.content
	this.content.onclick = (e) =>{
		//兼容
		e = e || window.event;
		let target = e.target || e.srcElement;
		//判断id名，如果是del就执行命令
		switch(target.id){
			case "smBtn":
				let passWord = document.querySelector("#password").value;
				let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				let hours = date.getHours();
				let minutes = date.getMinutes();
				let seconds = date.getSeconds();
				let str = year + "-" + month + "-" + day + "&nbsp;&nbsp;" + hours + ":" + minutes + ":" + seconds;
				let div = document.createElement("div");
				div.className = "receive";
				div.innerHTML = str + "<br/>" + passWord;
				document.body.appendChild(div);
			case "del":
				document.body.removeChild(this.modal);
				this.content.style.display = "none";
		}
	}
}

//***这是鼠标事件的方法，是一个独立的构造函数
class Incident {
	constructor(obj,title){
		this.obj = obj;
		this.title = title || obj;
		this.bindEvents();
	}
	bindEvents() {
		//鼠标按下时绑定事件
		this.title.onmousedown = (e) =>{
			e = e || window.event;
			//获取当前鼠标距离父元素的坐标
			var disX = e.offsetX,
				disY = e.offsetY;
			//鼠标拖动时绑定事件,绑定给document
			document.onmousemove = (e) =>{
				//计算当前元素距离body的位置
				var _top = e.clientY - disY,
				 	_left = e.clientX - disX;
				//这里需要对元素移动范围进行判断;调用方法,且需要传参
				this.move(_top,_left);
			}
			//鼠标抬起时的事件
			document.onmouseup = (e) => {
				document.onmousemove = null;
			}
			return false;
		}
	}
	move (top,left) {
		//判断元素在四个方向的移动范围
		if(top < 0) top = 0;
		if(left < 0) left = 0;
		if(top > tools.getBody().height - this.obj.offsetHeight) top = tools.getBody().height - this.obj.offsetHeight;
		if(left > tools.getBody().width - this.obj.offsetWidth) left = tools.getBody().width - this.obj.offsetWidth;
		tools.setStyle(this.obj,{
			left : left + "px",
			top : top + "px"
		})
	}
}























