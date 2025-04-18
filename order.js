window.onload = function () {
  const loader = document.getElementById("loader");
  // Ensure the loader is hidden on page load
  loader.style.display = "none";
};

function payWithPaystack() {
  const userEmail = document.getElementById("email").value;
  const loader = document.getElementById("loader");

  // Log loader visibility before starting the process
  console.log("Before Validation - Loader Visible?", loader.style.display);

  // Show loader when payment process starts
  loader.style.display = "flex"; // This ensures the loader is visible at the start

  // Email validation
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // If the email is invalid, log and hide the loader
  if (!validateEmail(userEmail)) {
    console.log("Invalid Email - Loader Hidden");
    alert("Please enter a valid email address.");
    loader.style.display = "none"; // Hide loader if validation fails
    return;
  }

  // Log loader visibility after validation
  console.log("After Validation - Loader Visible?", loader.style.display);

  // Fetch amount and check payment status
  fetch(`https://script.google.com/macros/s/AKfycbxTefmTIY6RC_PocXFvHfEMVjkfP6MH2szeQ9tog9ddwk_QgiEtTkVxSdbf4l0CpDFU/exec?email=${encodeURIComponent(userEmail)}`)
    .then(res => res.json())
    .then(data => {
      if (data.alreadyPaid) {
        console.log("Already paid - Loader Hidden");
        alert("You have already made a payment.");
        loader.style.display = "none"; // Hide loader if payment already exists
        return;
      }

      if (data.amount) {
        const amountInCedis = parseFloat(data.amount);

        var handler = PaystackPop.setup({
          key: 'pk_test_069081dc5174ba0bab50cd72cc3fb87a501a3614',
          email: userEmail,
          amount: amountInCedis * 100, // convert to pesewas
          currency: 'GHS',
          callback: function (response) {
            console.log("Payment successful - Loader Hidden");
            alert('Payment successful! Reference: ' + response.reference);
            loader.style.display = "none"; // Hide loader after successful payment
            // You can log the transaction via Apps Script here
          },
          onClose: function () {
            console.log("Transaction closed - Loader Hidden");
            alert('Transaction was not completed.');
            loader.style.display = "none"; // Hide loader if transaction was not completed
          }
        });

        handler.openIframe();
      } else {
        console.log("Email or amount missing - Loader Hidden");
        alert("Email not found or amount missing.");
        loader.style.display = "none"; // Hide loader if email or amount missing
      }
    })
    .catch(error => {
      console.error("Error:", error);
      console.log("Error occurred - Loader Hidden");
      alert("Something went wrong. Please try again.");
      loader.style.display = "none"; // Hide loader on error
    });
}
