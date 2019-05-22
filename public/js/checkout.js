var stripe = Stripe('pk_test_sPoavOOHFZahGFkdSYB75kc800NbYyuGnJ');
var elements = stripe.elements();
var style = {
    base: {
      // Add your base input styles here. For example:
      fontSize: '16px',
      color: "#32325d",
    }
  };
  
  // Create an instance of the card Element.
  var card = elements.create('card', {style: style});
  
  // Add an instance of the card Element into the `card-element` <div>.
  card.mount('#card-element');
var $form = $('#checkout-form');

$form.submit(function(event){
    $('#charge-error').addClass('collapse');
    $form.find('button').prop('disabled',true);
    stripe.createToken(card).then(function(result){
        if(result.error){
            var errorElement = document.getElementById('charge-error')
            errorElement.textContent = result.error.message;
            $('#charge-error').removeClass('collapse');
            $form.find('button').prop('disabled',false);
        }else {
            stripeTokenHandler(result.token);
        }
    })
});

function stripeTokenHandler(token){
 // Insert the token ID into the form so it gets submitted to the server
  var form = document.getElementById('checkout-form');
  var hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripeToken');
  hiddenInput.setAttribute('value', token.id);
  form.appendChild(hiddenInput);

  // Submit the form
//   form.submit();
       
    
}