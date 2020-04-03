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


// 项目列表
router.post('/project/list', ProjectController.getProjects);
// 项目详情
router.get('/project/detail', ProjectController.getProjectDetail);
// 新增项目
router.post('/project/add', ProjectController.addProject);
// 更新项目
router.post('/project/update', ProjectController.updateProject);
// 上传项目封面
router.post('/project/uploadImg', upload.single('cover'), ProjectController.uploadImg);
// 删除项目
router.get('/project/delete', ProjectController.deleteProject);
// 添加项目标签
router.post('/project/tag/add', ProjectController.addProjectTag);
// 添加项目成员
router.post('/project/member/add', ProjectController.addProjectMemeber);




module.exports = router