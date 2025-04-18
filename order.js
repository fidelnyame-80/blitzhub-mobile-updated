window.onload = function () {
  const loader = document.getElementById("loader");
  loader.style.display = "none";
};

function payWithPaystack() {
  const userEmail = document.getElementById("email").value.trim();
  const loader = document.getElementById("loader");

  console.log("Before Validation - Loader Visible?", loader.style.display);

  loader.style.display = "flex";

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  if (!validateEmail(userEmail)) {
    console.log("Invalid Email - Loader Hidden");
    alert("Please enter a valid email address.");
    loader.style.display = "none";
    return;
  }

  console.log("After Validation - Loader Visible?", loader.style.display);

  fetch(`https://script.google.com/macros/s/AKfycbxTefmTIY6RC_PocXFvHfEMVjkfP6MH2szeQ9tog9ddwk_QgiEtTkVxSdbf4l0CpDFU/exec?email=${encodeURIComponent(userEmail)}`)
    .then(res => res.json())
    .then(data => {
      if (data.alreadyPaid) {
        console.log("Already paid - Loader Hidden");
        alert("You have already made a payment.");
        loader.style.display = "none";
        return;
      }

      if (data.amount) {
        const amountInCedis = parseFloat(data.amount);
        console.log(`Amount to be paid for ${userEmail}: GHS ${amountInCedis}`);

        const handler = PaystackPop.setup({
          key: 'pk_test_069081dc5174ba0bab50cd72cc3fb87a501a3614',
          email: userEmail,
          amount: amountInCedis * 100, // Convert to pesewas
          currency: 'GHS',
          callback: function (response) {
            console.log("Payment successful - Loader Hidden");

            fetch(`https://script.google.com/macros/s/AKfycbxTefmTIY6RC_PocXFvHfEMVjkfP6MH2szeQ9tog9ddwk_QgiEtTkVxSdbf4l0CpDFU/exec`, {
              method: "POST",
              body: new URLSearchParams({
                email: userEmail,
                reference: response.reference
              })
            }).then(() => {
              alert('Payment successful! Reference: ' + response.reference);
              loader.style.display = "none";
            }).catch(err => {
              console.error("Logging failed - Loader Hidden", err);
              alert("Payment was successful but logging failed.");
              loader.style.display = "none";
            });
          },
          onClose: function () {
            console.log("Transaction closed - Loader Hidden");
            alert('Transaction was not completed.');
            loader.style.display = "none";
          }
        });

        handler.openIframe();

      } else {
        console.log("Email not found or amount missing - Loader Hidden");
        alert("Email not found or amount missing.");
        loader.style.display = "none";
      }
    })
    .catch(error => {
      console.error("Error occurred - Loader Hidden", error);
      alert("Something went wrong. Please try again.");
      loader.style.display = "none";
    });
}
