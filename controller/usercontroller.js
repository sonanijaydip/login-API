var register_model = require('../model/registermodel');

var loginmodel = false;

exports.register_user = async (req, res) => {

     var data = await register_model.findOne({ email: req.body.email })

     if (data) {

          res.status(200).json({
               status: 'user already registered'
          });
     }

     else {

          var data = await register_model.create(req.body)

          res.status(200).json({
               status: 'success',
               data
          })
     }

}
exports.login_user = async (req, res) => {
     
     if (loginmodel == false) {

          var data = await register_model.find({ email: req.body.email })

          if (data.length == 1) {

               if (data[0].password == req.body.password) {
                    loginmodel = true;

                    res.status(200).json({
                         status: 'success',
                         data
                    })
               }
               else {
                    res.status(200).json({
                         status: 'check_password'
                    })
               }
          }
          else {
               res.status(200).json({
                    status: 'user not found'
               })

          }

     }
     else {
          res.status(200).json({
               status: 'user already logged in'
          })
     }
}

exports.logout_user = (req, res) => {
     loginmodel = false;

     res.status(200).json({
          status:'succesfully logged out'
     })
}