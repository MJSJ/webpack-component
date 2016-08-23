//引入CSS
require("../../css/lib/reset.css");
require("../../css/common/global.css");
require("../../css/page/index.css");
require("../../css/page/hello.less");
require("./sb.js");
// import "../../css/page/hello.less"
//增加事件
$('#btn').click(function(){
	require.ensure(['../components/dialog/index.js'],function(require){
		var Dialog=require('../components/dialog/index.js');
		new Dialog(new Date()-0);
	});
});

