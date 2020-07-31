'use strict'
// 引入scp2
var client = require('scp2')
// 下面三个插件是部署的时候控制台美化所用 可有可无
const ora = require('ora')
const chalk = require('chalk')
// var Client = require('ssh2').Client;
// var conn = new Client();
// const spinner = ora(chalk.green('正在发布到服务器...'))
// conn.on('ready', function() { 
//     conn.exec('rm -rf /usr/local/egg/dist', function(err,stream) {
//       if (err) throw err;
//       stream
//       .on('close', function(code, signal) {
//         // 在执行shell命令后，把开始上传部署项目代码放到这里面
       
//         client.scp(
//           './egg-example1/',
//           {
//             host: '49.233.166.16', // 服务器的IP地址
//             port: '22', // 服务器端口， 一般为 22
//             username: 'root', // 用户名
//             password: '123456', // 密码
//             path: '/usr/local/egg/dist' // 项目部署的服务器目标位置
//           },
//           function(err) {
//             spinner.stop();
//             if (err) {
//               console.log(chalk.red('发布失败.\n'));
//               throw err;
//             } else {
//               console.log(
//                 chalk.green(
//                   'Success! 成功发布到服务器'
//                 )
//               );
//             }
//           }
//         );

//         conn.end();
//       })
//       .on('data', function(data) {
//         console.log('STDOUT: ' + data);
//       })
//       .stderr.on('data', function(data) {
//         console.log('STDERR: ' + data);
//       });
//     })
//   }).connect({
//     host: '49.233.166.16', // 服务器的IP地址
//     port: '22', // 服务器端口， 一般为 22
//     username: 'root', // 用户名
//     password: '123456', // 密码
//     //privateKey: require('fs').readFileSync('/home/admin/.ssh/id_dsa')
//   });
const spinner = ora(chalk.green('正在发布到服务器...'))
spinner.start()

client.scp('./dist/', { // 本地打包文件的位置
  host: '49.233.166.16', // 服务器的IP地址
  port: '22', // 服务器端口， 一般为 22
  username: 'root', // 用户名
  password: 'rkh123@@..', // 密码
  path: '/usr/local/h5/whiteMarket' // 项目部署的服务器目标位置
}, err => {
  spinner.stop()
  if (!err) {
    console.log(chalk.green('项目发布完毕!'))
  } else {
    console.log('err', err)
  }
})
