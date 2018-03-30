//dev:起服务，不压缩
//build：不用起服务，进行压缩，代码分离
const path = require('path');
let dir = process.cwd()//获取当前运行程序的目录

let baseConfig={ //commonjs规范   
    entry: {
        "bundle":dir + "/src/main"
    },
    output: {
        "filename": "[name].js",
        "path": dir + "/dist",
        publicPath:"/"
    },
    module: {
        rules:[
            {
                test:/(\.js|\.jsx)$/,
                use:['babel-loader'],
                exclude: path.resolve(__dirname, 'node_modules/')
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader'],
                exclude: path.resolve(__dirname, 'node_modules/')
            },
            {
                test:/\.(jpg|png|gif|eot|woff|svg|ttf)$/,
                use:['file-loader']
            }
        ]
    },
    plugins: [],
    resolve:{
        extensions:['.js','.jsx']
    }
}
module.exports=baseConfig