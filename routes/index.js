var express = require('express'),
loginC=require('../controller/Login'),
RegC=require('../controller/Registration');
LogoutC=require('../controller/Logout'),
CheckoutC=require('../controller/Checkout'),
CartC=require('../controller/Cart'),
ProductDetailC=require('../controller/Product-detail'),
ProductlistC=require('../controller/Product-list'),
WishlistC=require('../controller/Wishlist'),
HomeC=require('../controller/Home'),
ContactC=require('../controller/Contact'),
ProfileC=require('../controller/Profile'),
PaymentC=require('../controller/Payment'),
Change_PasswordC=require('../controller/ChangePassword');

var bodyParser = require('body-parser');
var csrf=require('csurf');
var csrfProtection=csrf();
const passport = require('passport');
var router = express.Router();
const { check, validationResult } = require('express-validator/check');
router.use(bodyParser.urlencoded({ extended: true }));
/* GET home page. */

//router.use(csrfProtection)
function restrict(req, res, next) {
  if (req.session.email) {
    req.session.loggedIn=true;
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
}

function notLoggedIn(req, res, next) {

  if (!req.session.email) {
    req.session.loggedIn=false;
    res.redirect('/login');
  } else {
    res.redirect('/');
   
  }

}


// router.use('/',notLoggedIn,function (req,res,next) {
//   next();
// })

router.get('/',HomeC.index);


router.get('/registration',RegC.index);
router.post('/registration',RegC.insert_login);

router.get('/login',loginC.index);
router.post('/login',loginC.login_post);
router.get('/logout',LogoutC.out);


router.get('/my-account',restrict,ProfileC.account);
//router.get('/my-account',restrict,ProfileC.index);
router.post('/update_profile',restrict,ProfileC.update);
router.post('/password_change',restrict,Change_PasswordC.update);

router.get('/checkout',restrict,CheckoutC.index);
router.post('/checkoutAdd',restrict,CheckoutC.deliveryAdd);
router.delete('/deleteAddress',restrict,CheckoutC.removeAddress);
router.get('/edit-address/:id',restrict,CheckoutC.editAdrress);
router.post('/edit-address/:id',restrict,CheckoutC.updateAdrress);

router.get('/payment',restrict,PaymentC.index);
router.post('/paymentCard', restrict,PaymentC.add)
router.get('/cart/:id',CartC.index);

router.get('/view-cart',CartC.show);
router.get('/reduce/:id',CartC.reduce);
router.get('/add/:id',CartC.increase);
router.get('/delete-cart/:id',CartC.deleteItem);

router.get('/product-detail/:id',ProductDetailC.index);

router.get('/product-list',ProductlistC.index);

router.get('/wishlist',restrict,WishlistC.index);
router.get('/wishlist/:id',restrict,WishlistC.addWish);
 router.get('/remove-wishlist/:id',restrict,WishlistC.deleteWish);
 
router.get('/contact',ContactC.index);

router.get('/product-list/:page-:limit',ProductlistC.show);

router.get('/search',HomeC.view)
// router.post('/password_changes',
//     [
//       check('password')
//       .not()
//       .isEmpty()
//       .withMessage('password is required'),
//       check('new_password')
//       .not()
//       .isEmpty()
//       .withMessage('new_password is required'),
//       check('password')
//       .not()
//       .isEmpty()
//       .withMessage('confirm_password is required')
//             // .custom((val, { req, loc, path }) => {
//             //     if (val !== req.body.confirm_password) {
//             //         throw new Error("Passwords don't match");
//             //     } else {
//             //         return value;
//             //     }
//             // }),
//     ], (req, res) => {
//         var errors = validationResult(req);
//         if (errors) {
//           const alert1 =errors.array()
//            console.log(errors)
//            res.render('my-account',{
               
//             alert1
        
//         });
//         } else {
//            
//             res.redirect('/my-account');
//         }
//     });

module.exports = router;
