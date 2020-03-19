const superagent = require('superagent');
const cheerio = require('cheerio');
const async = require('async');
const fs = require('fs');

concurrencyCount = 0; // 当前并发数记录

function getHero() {
    console.log('爬虫程序开始运行......');
    superagent.get('http://lol.duowan.com/hero/').end(function (err, res) {
        var $ = cheerio.load(res.text, { decodeEntities: false });
        //找到每个英雄的链接，并存入数组，等待并行请求
        var heroes = new Array();
        $("a.lol_champion").each(function (i, e) {
            heroes.push($(e).attr("href"));
        });
        //并发遍历heroes对象
        // mapLimit(arr, limit, iterator, callback)
        // arr中一般是多个请求的url，limit为并发限制次数，mapLimit方法将arr中的每一项依次拿给iterator去执行，执行结果传给最后的callback；
        async.mapLimit(heroes, 1,
            function (heroUrl, callback) {
                // 对每个角色对象的处理逻辑
                this.fetchInfo(heroUrl, callback);
            },
            function (err, result) {
                if (err) {
                    console.log("error is:" + err);
                }
                //这里的result就是fetchInfo方法的callback返回的数组
                console.log("抓取结束，共计:" + result.length + "个英雄数据");
                // result.forEach(function (item, index) {
                //     Hero.create(item, function (err, hero) {
                //         if (err) {
                //             console.log(err)
                //         } else {
                //             console.log(hero)
                //         }
                //     });
                // });
                // 使用fs写出到文件
                fs.writeFile('./heroes.json', JSON.stringify(result), function (err) {
                    if (err) {
                        throw err;
                    } else {
                        console.log("写入文件成功");
                    }
                });
            }
        );
    });
}

function fetchInfo(heroUrl, callback) {
    this.concurrencyCount++;
    //console.log("...正在抓取:"+ heroUrl + "...当前并发数记录：" + concurrencyCount);
    // 根据URL，进行详细页面的爬取和解析
    superagent
        .get(heroUrl.trim())
        .end(function (err, res) {
            if (err) {
                console.log("fail");
                concurrencyCount--;
                var hero = {
                    succ: false,
                    url: heroUrl
                };
                //callback左边的参数为error的string，不为null时会打断本次map
                callback(null, hero);
            } else {
                // 获取爬到的角色详细页面内容
                var $ = cheerio.load(res.text, { decodeEntities: false });
                var heroTitle = $('.hero-title').first().text();
                var heroName = $('.hero-name').first().text();
                var heroType = $('.hero-tag').first().text() + " " + $('.hero-tag').last().text();
                var heroesPicUrlArray = [];
                let skillArray = [];
                $(".ui-slide__panel img").each(function (i, e) {
                    heroesPicUrlArray.push($(e).attr("src"));
                });
                $(".skill-item").each(function (i, e) {
                    let skillPic = $(e).find('img').attr('src');
                    let skillName = $(".skill-content").eq(i).find('.name').text();
                    let skillDesc = $(".skill-content").eq(i).find('.desc').text();
                    skillArray.push({
                        skillPic: skillPic,
                        skillName: skillName,
                        skillDesc: skillDesc
                    });
                });
                let heroDetail = {
                    title: heroTitle,
                    name: heroName,
                    type: heroType,
                    url: heroesPicUrlArray,
                    skill: skillArray
                };
                console.log(heroDetail);
                callback(null, heroDetail);
                // var index = 0;
                // async.mapLimit(heroesPicUrlArray,heroesPicUrlArray.length,
                //     function (heroesPicUrl, downloadCallback) {
                //         // 对每个角色对象的处理逻辑
                //         index++;
                //         var savePath = 'img/' + heroName + index + ".jpg";
                //         download(heroesPicUrl,savePath,downloadCallback);
                //     },
                //     function (err, result) {
                //         if(err){
                //             console.log("error is:"+err);
                //             finish();
                //             return;
                //         }
                //         //这里的result就是callback回来的数组
                //         console.log("下载完成，共计:"+result.length+"个");
                //         finish();
                //     }
                // );
                //
                // function download(heroesPicUrl,savePath,downloadCallback){
                //     http.get(heroesPicUrl, function(res){
                //         var imgData = "";
                //         res.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
                //         res.on("data", function(chunk){
                //             imgData += chunk;
                //         });
                //         res.on("end", function(){
                //             fs.writeFile(savePath, imgData, "binary", function(err){
                //                 if(err){
                //                     console.log("save fail:",err);
                //                     downloadCallback(null,heroesPicUrl);
                //                     return;
                //                 }
                //                 console.log("save success");
                //                 downloadCallback(null,heroesPicUrl);
                //             });
                //         });
                //     });
                // }
                // function finish(){
                //     console.log('找到英雄:'+heroTitle+" "+heroName+"|"+heroType);
                //     concurrencyCount--;
                //     var hero = {
                //         succ:true,
                //         title:heroTitle,
                //         name:heroName,
                //         type:heroType,
                //         url:heroUrl
                //     }
                //     //callback后才会结束此并行“线程”
                //     callback(null, hero);
                // }
            }
        });
}

module.exports = { getHero, fetchInfo }