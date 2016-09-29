# gallery-by-react
one photo gallery project  based on  react.  


https://jshqhxm.github.io/gallery-by-react/


遇到问题：
1  本地的图片从别处copy的， 后缀名 .png  变成了 .PNG   导致加载  图片模块的时候出错，困扰了好久，后来通过传入图片路径解决。

		singleImageData.imageURL = require('../images/' + singleImageData.fileName);

2  ES6 语法问题
