const seats = document.getElementsByClassName("seat-btn");
let availableSeat = 40;
let grandPrice = 0;
let totalDiscount = 0;
let count = 0;
for (const btn of seats) {
  btn.dataset.selected = "false";

  btn.addEventListener("click", function (e) {
    if (count >= 4) {
      alert(
        "You have reached the maximum selection limit (4). No more seats can be selected."
      );
      return;
    }

    if (btn.dataset.selected === "true") {
      return;
    }

    count += 1;
    availableSeat -= 1;
    btn.dataset.selected = "true";
    btn.style.backgroundColor = "#1DD100";
    const seatNumber = e.target.innerText;

    const div = document.createElement("div");
    div.innerHTML = `
       <div class="flex justify-between"><p>${seatNumber}</p><p>Economoy</p><p>550</p></div> `;
    setInnerText("seat-count", count);
    document.getElementById("seat-details").appendChild(div);

    const totalPrice = 550 * count;
    setInnerText("total-price", totalPrice);
    setInnerText("grand-total", totalPrice);
    setInnerText("total-seat", availableSeat);

    if (count == 4) {
      const couponApplyBtn = document.getElementById("couponApplyBtn");
      couponApplyBtn.removeAttribute("disabled");
      couponApplyBtn.style.backgroundColor = "#1DD100";

      couponApplyBtn.addEventListener("click", function () {
        const couponBox = document.getElementById("coupon-box").value;
        if (couponBox == "NEW15") {
          totalDiscount = totalPrice * 0.15;
          grandPrice = totalPrice * 0.85;
          document.getElementById("coupon-container").classList.add("hidden");
        } else if (couponBox == "Couple 20") {
          totalDiscount = totalPrice * 0.2;
          grandPrice = totalPrice * 0.8;
          document.getElementById("coupon-container").classList.add("hidden");
        } else {
          alert("Invalid Coupon Code");
          document.getElementById("coupon-box").value = "";
          document.getElementById("discount-coupon").removeChild(div);
        }

        setInnerText("grand-total", grandPrice);
        const div = document.createElement("div");

        div.innerHTML = `<div class="flex justify-between mb-2">
           <p>Discount Price</p>
           <p>BDT <span id="total-price">${totalDiscount}</span></p>
           </div>`;

        document.getElementById("discount-coupon").appendChild(div);
      });
    }

    const phoneNumberInput = document.getElementById("phoneNumber");
    const btnNext = document.getElementById("btn-next");
    const popUp = document.getElementById("popUp");

    function enableNextButton() {
      const phoneNumber = phoneNumberInput.value;

      if (count >= 1 && phoneNumber.trim() !== "") {
        btnNext.removeAttribute("disabled");
        btnNext.style.backgroundColor = "#1DD100";

        if (!btnNext.hasListener) {
          btnNext.addEventListener("click", function () {
            popUp.showModal();
          });
          btnNext.hasListener = true;
        }
      } else {
        btnNext.setAttribute("disabled", true);
        btnNext.style.backgroundColor = "";
      }
    }
    enableNextButton();

    phoneNumberInput.addEventListener("input", enableNextButton);

    const closePopUp = document.getElementById("closePopUpBtn");
    closePopUp.addEventListener("click", function () {
      popUp.close();
    });
  });
}

function setInnerText(id, value) {
  document.getElementById(id).innerText = value;
}
