var path=require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');


module.exports={
	entry:{
    		index:"./src/js/page/index.js",
            response:"./src/js/tools/response.js"
    	},
    output:{
        path: path.join(__dirname,'dist'),
        publicPath: "/webpack/dist/",
        filename: "js/[name].js",
        chunkFilename: "js/[id].chunk.js"
    },
    module: {
        loaders: [	//加载器
            {
                test: /\.less$/,
                loader: 'style!css!px2rem?remUnit=75&remPrecision=8!postcss!less'
            },
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.css$/, 
                loader:ExtractTextPlugin.extract("style", "css-loader?-minimize","px2rem-loader?remUnit=75&remPrecision=8","postcss") 
            },
            {
                test: /\.html$/, 
                loader: "html" 
            },
            {
                test: /\.(png|jpg)$/, 
                loader: 'url-loader?limit=8192&name=./img/[hash].[ext]'
            }
        ]
    },
    postcss: [autoprefixer],
    plugins:[
    	new webpack.ProvidePlugin({	//加载jq
            $: 'jquery'
        }),
        // new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vender", /* filename= */"vendor.bundle.js"),
    	new ExtractTextPlugin("css/[name].css"),	//单独使用style标签加载css并设置其路径

        

    	new HtmlWebpackPlugin({						//根据模板插入css/js等生成最终HTML
    		favicon:'./src/img/favicon.ico', //favicon路径
			filename:'/view/index.html',	//生成的html存放路径，相对于 path
			template:'./src/view/index.html',	//html模板路径
			inject:true,	//允许插件修改哪些内容，包括head与body
			hash:true,	//为静态资源生成hash值
            // excludeChunks:["response"],
            heads:['response']
		}),

        // new HtmlWebpackPlugin({
        //     filename:'/view/index.html',    //生成的html存放路径，相对于 path
        //     template:'./src/view/index.mid.html',   //html模板路径   
        //     inject: 'head',
        //     chunks: ['response']
        // }),
        new OpenBrowserPlugin({ url: 'http://localhost:8080' })
    ],
    devServer:{
    	contentBase:'./dist/view'
    }
};
