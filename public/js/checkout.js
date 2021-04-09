

Stripe.setPublishableKey('pk_test_51IZF0ZSDp7nTaKRfdbXcANjylZGcMXInF5skPP8kimwu0wyKXp8UQAOfn0vaVDr9bmcPLJ0HPEil9s7egxNQuNMD00iDFDAoPG');

var $form = $('#checkout-form');
$form.submit(function (event) {
    $form.find('button').prop('disabled',true);
    Stripe.card.createToken({
        number: $('#card-number').val(),
        cvc: $('#card-cvc').val(),
        exp_month: $('#card-expiry-month').val(),
        exp_year: $('#card-expiry-year').val(),
        
      }, stripeResponseHandler);
    return false;
})


function stripeResponseHandler(status, response) {

    // Grab the form:
    //var $form = $('#payment-form');
  
    if (response.error) { // Problem!
      alert(response.error.message)
  //alert("its error")
      // Show the errors on the form
      $('#charge-errors').text(response.error.message);
      $('#charge-errors').removeClass('hidden');
      $('button').prop('disabled', false); // Re-enable submission
  
    } else { // Token was created!
  
      // Get the token ID:
      var token = response.id;
  
      // Insert the token into the form so it gets submitted to the server:
      $form.append($('<input type="hidden" name="stripeToken" />').val(token));
  
      // Submit the form:
      $form.get(0).submit();
  
    }
  }