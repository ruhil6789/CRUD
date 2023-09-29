const express = require('express')
const mongoose=require('mongoose')
//  creating the router

var router = express.Router();
// link
const Course = mongoose.model('Course');
//  router  controller for read request

//Router Controller for READ request
router.get('/', (req, res) => {
    res.render("course/courseAddEdit", {
        viewTitle: "Insert a New Course for Edureka"
    });
});


//  router  controller for th  update request

router.post('/',(req,res)=>{
     if(req.body._id==''){
     insertIntoMongoDB(req,res)
     }else{
        updateIntoMongoDB()
     }

});

//  creating the function to insert data into the mongoDB
const insertIntoMongoDB=(req,res)=>{
var course= new Course()
course.courseName = req.body.courseName;
course.courseId= req.body.courseId;
course.courseDuration =req.body.courseDuration;
course.courseFee= req.body.courseFee;

course.save((err,doc)=>{
    if(!err){
        res.redirect('course/list')
    }else{
        console.log('Error  during the record collection');
    }
})

}

//  creating  function to insert data into the mongodb 
const updateIntoMongoDB=(req,res)=>{

    Course.findOneAndUpdate({_id:req.body._id},req.body,{new:true},(err,doc)=>{
        if(!err){
            res.redirect('course/list')
        }else{
           if(err.name =='ValidationError'){
            handleValidationError(err,req.body);
            req.render('course/courseAddEdit',{
                //  retaining value to be displayed in the child view
                viewTitle:'Update  Course Details',
                employee:req.body
            })
           } else{
            console.log("error during updating the record +:",+err);
           }
        }
    })
}

//Router to retrieve the complete list of available courses
router.get('/list', (req, res) => {
    Course.find((err, docs) => {
        if (!err) {
            res.render("course/list", {
                list: docs
            });
        }
        else {
            console.log('Failed to retrieve the Course List: ' + err);
        }
    });
});


//Creating a function to implement input validations
function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'courseName':
                body['courseNameError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}


//  router to update a course using its id

router.get('/:id',(req,res)=>{
    Course.findById(req.params.id,(err,res)=>{
        if(!err){
            req.render("course/courseAddEdit",{
                viewTitle:"Update Course Details",
                course:doc
            })
        }
    })
})

//  router Controller for Delete request

router.get('/:id',(req,res)=>{
    Course.findByIdAndRemove(req.params.id),(err,doc)=>{
        if(!err){
            res.redirect('/course/list');

        }else{
            console.log("failed to delete the course details",+err);
        }
    }
    
})

module.exports= router; 
