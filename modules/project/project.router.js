const Router = require('koa-router')
const ProjectController = require('./project.controller');
const config = require('../../common/config');
const multer = require('koa-multer');
const path = require('path');

const router = new Router({ prefix: config.prefix });

const storageZip = multer.diskStorage({
    destination: function (req, file, cb) {
        let avatarPath = path.resolve(__dirname, '../../public/images/project-cover'); //会对../进行解析
        console.log(avatarPath);
        cb(null, avatarPath); //文件存储路径
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.png'); //对文件重新命名，防止文件名冲突
    }
});

var upload = multer({ storage: storageZip });


// project 列表
router.post('/project/list', ProjectController.getProjects);
// project 详情
router.get('/project/detail', ProjectController.getProjectDetail);
// 新增 project 
router.post('/project/add', ProjectController.newProject);
// 更新 project 
router.post('/project/update', ProjectController.updateProject);
// 上传图片
router.post('/project/uploadImg', upload.single('cover'), ProjectController.uploadImg);
// 删除project
router.get('/project/delete', ProjectController.deleteProject);
// 获取project下的所有task
router.get('/project/task/list', ProjectController.deleteProject);




module.exports = router