require('normalize.css/normalize.css');
// require('styles/App.css');
require('../styles/main.scss');

import React from 'react';


let yeomanImage = require('../images/yeoman.png');
// let yeomanImage = require('../images/2.jpg');



// 获取图片相关数据
var imageDatas = require('../stores/imageDatas.json');
//利用自执行函数, 将图片名信息转成图片ＵＲＬ路径信息
imageDatas = (function genImageURL(imageDatasArr) {
	for(var i = 0, j = imageDatasArr.length; i<j; i++){
		var singleImageData = imageDatasArr[i];
		// console.log(singleImageData.fileName);

		// var prefix = '../images/';
		// var imgpath = prefix +singleImageData.fileName;
		// console.log(imgpath);
		// singleImageData.imageURL = require(imgpath);

		// singleImageData.imageURL = require('../images/' + singleImageData.fileName);
		// singleImageData.imageURL = require('../images/1.jpg');
	
		console.log(i);
		// console.log(singleImageData.imageURL);

		imageDatasArr[i] = singleImageData;
	}

	return imageDatasArr;
})(imageDatas);



// class AppComponent extends React.Component {
//   render() {
//     return (
//       <div className="index">
//         <img src={yeomanImage} alt="Yeoman Generator" />
//         <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
//       </div>
//     );
//   }
// }

class AppComponent extends React.Component {
  render() {
    return (
  		<section className= "stage">
  			<section className = "img-sec">
  			</section>
  			<nav className = "controller-nav">
  			</nav>
  		</section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
