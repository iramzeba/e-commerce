 $(document).ready(function(){
   
    $('.addbtn').click(function(e){
      e.preventDefault();
     

var name =    $('#state').val();
//alert(name.length)
if ($('#name').val().length == 0) {
    $('#adiv').html('<span style="color:red">Please  enter name</span>')
  }
  if ($('#mobile').val().length == 0) {
    $('#bdiv').html('<span style="color:red">Please  enter mobile no</span>')
  }
  if ($('#address').val().length == 0) {
    $('#cdiv').html('<span style="color:red">Please  enter address</span>')
  }
  
  if ($('#city').val().length == 0) {
    $('#fdiv').html('<span style="color:red">Please  enter city</span>')
  }
  if ($('#pincode').val().length == 0) {
    $('#gdiv').html('<span style="color:red">Please  enter pincode</span>')
  }
  if ($('#state').val()=="disabald" ){
    $('#ddiv').html('<span style="color:red">Please  select state</span>')
    //$('#ddiv').html('<span style = "color:red> please select state</span>')
  }
        $.ajax({
           
            url: '/checkoutAdd',
           
           
           method:'post',
           
           data: $('#form_1').serialize(),
            success:function (data) {
                if(data.msg=='success'){
                    //    $("#task").remove();
                       alert('task added successfully');
                       getdata();
                       $('#form_1')[0].reset();
              
                       }else{
                           alert('some error occurred try again');
                       }
            },
            error:function(data){
                alert('server error occured')
            }
        })
       
    });

$(document).on('click', '.delbtn',function () {
  var id= $(this).parent().find('.delbtn').val();
  alert(id)
  $.ajax({
url:'/deleteAddress',
method:'delete',
data:{'id':id},
success:function (data) {
  if (data.msg=='success') {
    alert('data deleted')
    getdata();
  }
},
error:function (data) {
  alert('server error occured')
}
  })
})




function getdata() {
  $.ajax({
    url:'/checkout',
    method:'get',
   
    success:function (result1) {
   console.log(result1)
   $("#main").html(result1);



    },
    error:function (result1) {
      alert('server error occured')
    }
  })
}




//edit address
$('.updatebtn').click(function (e) {
  e.preventDefault();
 //function checkForm  (this) {
    
  
  if ($('#name').val().length == 0) {
    $('#adiv').html('<span style="color:red">Please  enter name</span>')
  }
  
  if ($('#mobile').val().length !== 10 ) {
    $('#bdiv').html('<span style="color:red">Please  enter 10 digit  mobile no</span>')
  }
  if ($('#address').val().length == 0) {
    $('#cdiv').html('<span style="color:red">Please  enter address</span>')
  }
  
  if ($('#city').val().length == 0) {
    $('#fdiv').html('<span style="color:red">Please  enter city</span>')
  }
  if ($('#pincode').val().length == 0) {
    $('#gdiv').html('<span style="color:red">Please  enter pincode</span>')
  }
  if ($('#state').val()=="disabald" ){
    $('#ddiv').html('<span style="color:red">Please  select state</span>')
    //$('#ddiv').html('<span style = "color:red> please select state</span>')
  }
})
 //}

 });


//$(document).ready(function() {

    // $('#delivery').submit(function() {
    //    $("#status").empty().text("File is uploading...");
    //    $(this).ajaxSubmit({

    //        error: function(xhr) {
    //    status('Error: ' + xhr.status);
    //        },

    //        success: function(response) {
    //    $("#status").empty().text(response);
    //            console.log(response);
    //        }
    // $('.deliver_here').hide();
    // $(".selected").click(function(){
    //     // var inputValue = $(this).attr("value");
    //     // var targetBox = $("." + inputValue);
    //     // $(".box").not(targetBox).hide();
    //     $(".deliver_here").show();
    // });



  // });
       //Very important line, it disable the page refresh.
//    return false;
//    });    
//});