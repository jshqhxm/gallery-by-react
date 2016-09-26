require('normalize.css/normalize.css');
// require('styles/App.css');
require('../styles/main.scss');

import React from 'react';
import ReactDOM from 'react-dom';


let yeomanImage = require('../images/yeoman.png');
// let yeomanImage = require('../images/2.jpg');



// 获取图片相关数据
var imageDatas = require('../stores/imageDatas.json');
//利用自执行函数, 将图片名信息转成图片ＵＲＬ路径信息
imageDatas = (function genImageURL(imageDatasArr) {
	for(var i = 0, j = imageDatasArr.length; i<j; i++){
		var singleImageData = imageDatasArr[i];
		// console.log(singleImageData.fileName);

		var prefix = '../images/';
		var imgpath = prefix +singleImageData.fileName;
		// console.log(imgpath);
		// singleImageData.imageURL = require(imgpath);
		singleImageData.imageURL = imgpath;

		// singleImageData.imageURL = require('../images/' + singleImageData.fileName);
		// singleImageData.imageURL = require('../images/1.jpg');
	
		console.log(i);
		// console.log(singleImageData.imageURL);

		imageDatasArr[i] = singleImageData;
	}

	return imageDatasArr;
})(imageDatas);

var ImgFigure = React.createClass({


	/*
	*	imgFigure 的点击处理函数
	*
	 */

	handleClick: function(e){

		console.log('handleClick');

		if( this.props.arrange.isCenter){
			this.props.inverse();
		} else{
			this.props.center();
		}


		// this.props.inverse();

		e.stopPropagation();
		e.preventDefault();
	},

	render: function() {

		var styleObj = {};

		//如果props 属性中指定了这张图片的位置, 则使用
		if( this.props.arrange.pos) {
			styleObj = this.props.arrange.pos;
		}

		//如果图片的旋转角度有值并且不为0, 添加旋转角度
		if( this.props.arrange.rotate){

			(['MozTransform' , '-ms-', '-webkit-', '']).forEach(function (value){
				styleObj[ value +'transform'] = 'rotate(' + this.props.arrange.rotate + 'deg)';
			}.bind(this));

		}


        // 如果是居中的图片， z-index设为11
        if (this.props.arrange.isCenter) {
          styleObj.zIndex = 11;
        }

		var imgFigureClassName = "img-figure";
			imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';



		return (
			<figure className= {imgFigureClassName} style = {styleObj} onClick = {this.handleClick} >
				<img src = {this.props.data.imageURL}
					alt = {this.props.data.title}
				/>
				<figcaption>
					<h2 className="img-title" >{this.props.data.title}</h2>
					<div className="img-back" onClick = {this.handleClick}>
						<p>
							{this.props.data.desc}
						</p>
					</div>
				</figcaption>
			</figure>
			);
	}
});


//控制组件
var ControllerUnit = React.createClass({

	handleClick:function(e){

		if(this.props.arrange.isCenter){
			this.props.inverse();
		}else{
			this.props.center();
		}



		e.preventDefault();
		e.stopPropagation();

	},

	render:function(){

		var ControllerUnitClassName = "controller-unit";

		//如果是对应的是居中的图片, 显示
		if(this.props.arrange.isCenter){
			ControllerUnitClassName  += " is-center";

			if(this.props.arrange.isInverse){
				ControllerUnitClassName += " is-inverse";
			}
		}

		return (
			<span className={ ControllerUnitClassName }  onClick = {this.handleClick} ></span>
			);
	}

});





class AppComponent extends React.Component {

	constructor(props, context){
		super(props, context);
		
		this.state ={
 			imgsArrangeArr: [
            /*{
                pos: {
                    left: '0',
                    top: '0'
                },
                rotate: 0,    // 旋转角度
                isInverse: false,    // 图片正反面
                isCenter: false,    // 图片是否居中
            }*/
        	]
		};

		this.Constant = {
			centerPos: {
			    left: 0,
			    right: 0
			},
			hPosRange: {   // 水平方向的取值范围
			    leftSecX: [0, 0],
			    rightSecX: [0, 0],
			    y: [0, 0]
			},
			vPosRange: {    // 垂直方向的取值范围
			    x: [0, 0],
			    topY: [0, 0]
			}
  		};

    
	}

	componentWillMount(){

		console.log('componentWillMount');

	}

	
  	componentDidMount(){
  		console.log('componentDidMount');
  		//test code
  		// var stageDOM = ReactDOM.findDOMNode(this.refs.stage);


  		//首先拿到舞台大小
  		// this.refs
  		var stageDom = ReactDOM.findDOMNode(this.refs.stage),
  			stageW = stageDom.scrollWidth,
  			stageH = stageDom.scrollHeight,
  			halfStageW = Math.ceil(stageW /2),
  			halfStageH = Math.ceil(stageH /2);

  		//拿到一个imageFigure的大小
  		
  		var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
  			imgW = imgFigureDOM.scrollWidth,
  			imgH = imgFigureDOM.scrollHeight,

  			halfImgW = Math.ceil(imgW /2),
  			halfImgH = Math.ceil(imgH /2);

  		// 计算中心图片的位置点
  		this.Constant.centerPos = {
  			left: halfStageW - halfImgW,
  			top: halfStageH -halfImgH
  		};

  		//计算左侧, 右侧区域图片排布位置的取值范围
  		this.Constant.hPosRange.leftSecX[0] = -halfImgW;
  		this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
  		this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
  		this.Constant.hPosRange.rightSecX[1] = stageW  - halfImgW;
  		this.Constant.hPosRange.y[0] = -halfImgH;
  		this.Constant.hPosRange.y[1] = stageH -halfImgH;


  		//计算上层 图片排布位置的取值范围
  		this.Constant.vPosRange.topY[0] =  - halfImgH;
  		this.Constant.vPosRange.topY[1] =    halfStageH - halfImgH * 3;
  		this.Constant.vPosRange.x[0] = halfStageW - imgW ;
  		this.Constant.vPosRange.x[1] = halfStageW;

  		this.rearrange(0);
  	}

	componentWillReceiveProps(nextProps){
		console.log('componentWillReceiveProps');
	}



	/**
	 * 获取区间内的一个随机值
	 * @param  {[type]} low  [description]
	 * @param  {[type]} high [description]
	 * @return {[type]}      [description]
	 */
	getRangeRandom(low, high){

		return Math.ceil(Math.random() * (high - low) + low);
	}

	/**
	 * 获取 0 - 30
	 * @return {[type]} [description]
	 */
	get30DegRandom(){

		return ((Math.random() > 0.5? '' :'-') + Math.ceil(Math.random() * 30));
	}


	center( index) {
		return function(){ 

			this.rearrange(index);
			
		}.bind(this);
	}

	/**
	 * 翻转图片
	 * @param  {[type]} index [description]
	 * @return {[type]}       [description]
	 */
	inverse( index) {
		return function(){
			var imgsArrangeArr = this.state.imgsArrangeArr;

			imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;

			this.setState({
				imgsArrangeArr:imgsArrangeArr
			});


		}.bind(this);
	}


  	/**
  	 * 重新布局所有图片
  	 * @param  {[type]} centerIndex [description]
  	 * @return {[type]}             [description]
  	 */
  	rearrange(centerIndex){
  		var imgsArrangeArr = this.state.imgsArrangeArr,
  			Constant =  this.Constant,
  			centerPos = Constant.centerPos,
  			hPosRange = Constant.hPosRange,
  			vPosRange = Constant.vPosRange,
  			hPosRangeLeftSex = hPosRange.leftSecX,
  			hPosRangeRightSex = hPosRange.rightSecX,
  			hPosRangeY =hPosRange.y,
  			vPosRangeTopY = vPosRange.topY,
  			vPosRangeX = vPosRange.x,

  			imgsArrangeTopArr = [],
  			topImgNum  = Math.floor(Math.random()*2), //取一个或者不取
  			topImgSpliceIndex = 0,


  			imgsArrangeCenterArr  = imgsArrangeArr.splice(centerIndex, 1);

  			//首先居中 centerIndex 的图片 居中的 centerIndex 的图片不需要旋转
  			imgsArrangeCenterArr[0] ={
  				pos :centerPos,
  				rotate:0,
  				isCenter: true
  			};
  	

  			//取出要布局上侧的图片的状态信息
  			topImgSpliceIndex = Math.ceil(Math.random()*(imgsArrangeArr.length - topImgNum));
  			imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);


  			//布局位于上侧的图片
  			imgsArrangeTopArr.forEach(function(value , index) {
  				imgsArrangeTopArr[index] = {
  					pos:{
  							top: this.getRangeRandom(vPosRangeTopY[0] , vPosRangeTopY[1]),
  							left:this.getRangeRandom(vPosRangeX[0] , vPosRangeX[1])
  					},
  					rotate: this.get30DegRandom(),
  					isCenter: false
  				}
  			}.bind(this));

  			//布局左右两侧的图片
  			for(var i = 0 , j = imgsArrangeArr.length , k= j/2 ; i <j; i++ ) {

  				var hPosRangeLORX = null;

  				//前半部分布局左边,  右半部分布局右边
  				
  				if( i < k ) {
  					hPosRangeLORX = hPosRangeLeftSex;
  				}else{
  					hPosRangeLORX = hPosRangeRightSex;
  				}

  				imgsArrangeArr[i] = {
  					pos: {
						top: this.getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
  						left:this.getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
  					},
  					rotate: this.get30DegRandom(),
  					isCenter: false
  					
  				}
  			}

  			// debugger;

  			if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
  				imgsArrangeArr.splice( topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
  			}

  			imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

  			this.setState({
            imgsArrangeArr: imgsArrangeArr
        });
  	}


  render() {


	 var controllerUnits = [],
	 	 imgFigures = [];

	 imageDatas.forEach( function (value ,index) {

	 		if( !this.state.imgsArrangeArr[index]){
	 			this.state.imgsArrangeArr[index] = {
	 				pos:{
	 					left: 0,
	 					top: 0
	 				},
	 				rotate:0,
	 				isInverse: false,
	 				isCenter: false
	 			}
	 		}

			imgFigures.push(<ImgFigure data = {value} key={index} 
				ref={'imgFigure' + index}  
				arrange={this.state.imgsArrangeArr[index]} 
				inverse={this.inverse(index)}
				center={this.center(index)}
				/>);

			controllerUnits.push(<ControllerUnit 
				key={index}
				arrange={this.state.imgsArrangeArr[index]} 
				inverse={this.inverse(index)}
				center={this.center(index)}
				/>);

	 	}.bind(this)
	 );

    return (
  		<section className= "stage" ref= "stage">
  			<section className = "img-sec">
  			  {imgFigures}
  			</section>
  			<nav className = "controller-nav">
  				{controllerUnits}
  			</nav>
  		</section>
    );
  }
}

AppComponent.defaultProps = {
};





export default AppComponent;
