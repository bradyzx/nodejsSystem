const mongoose = require('mongoose');
const Comment = require('../model/comment.model');

//增
exports.create = function(req,res,next){
    const comment = new Comment(req.body);//实例化对象，req.body代表是post的数据提交，并且参数从body获取
    comment.save().then(data=>{
        //数据保存，将保存以后的诗句用json形式输出。
        res.json(data);
    });
}

//删一条数据
exports.remove = function(req,res,next){
    //先查找到一个id值
    const id = req.params.id;
    Comment.findByIdAndRemove(id,function(err,data){
        res.json({massage:'删除成功'});
    });
};

//删多个数据
exports.removes = function(req,res,next){
    //先查找到多个id值
    // const ids = req.body.ids;//获取到的是字符串，转化成数组？
    // var result = ids.split(',');
    //ids =ids.split(',');
    // console.log(ids);
    // Comment.remove(ids,{$in:ids},function(err,data){
    //     res.json({massage:'删除多条成功'});
    // })
    // for(var i=0;i<result.length;i++){
    //     Comment.findByIdAndRemove(result[i],function(err,data){
    //         res.json({massage:'删除多条成功'});
    //     });
    // }

    var ids = req.body.ids;
    ids = ids.split(',');
    console.log(ids);
    if(ids.length>0){
        Comment.remove({_id:{$in:ids}}).then(data=>{
            res.json({massage:'删除成功'});
        });
    }
    
};


//改
exports.update = function(req,res,next){
    //先查找到一个id值
    const id = req.params.id;
    Comment.findByIdAndUpdate(id,{$set: req.body},{new: false}).then(data=>{
        res.json(data);
    });
};

//查
exports.list = function(req,res,next){
    var page = req.body.page ? req.body.page : 1;
    var limit = req.body.rows ? req.body.rows : 5;
    var queryCondition = {};

    if(req.body.title && req.body.title.trim().length>0){   //trim（）去空格
        title = req.body.title;
        queryCondition = {
            title: new RegExp(title,'i')
        }
    }

    if(req.body.cateId && req.body.cateId.trim().length>0){   //trim（）去空格
        cateId = req.body.cateId;
        queryCondition = Object.assign(queryCondition,{  //对象合并    
            cateId: cateId
        });
    }
        console.log('评论显示');
        console.log(queryCondition);
        //            查询条件            分页         一页的条数           回调函数
    Comment.paginate(queryCondition, { page: +page, limit: +limit }, function(err, result) {
        result.rows = result.docs;
        delete result.docs;
        res.json(result)
      });
    //   var numlist={};
    // Comment.count({cateId:cateId}).then(num=>{
    //     numlist={
    //         num:num
    //     }
    //     res.json(numlist);
    //     // console.log(num);
    // })
}