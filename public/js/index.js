const d = document;
const $billInput = d.getElementById("bill-input");
const $tipCustomInput = d.getElementById("tip-custom");
const $peopleInput = d.getElementById("people-input");
const $btnReset = d.getElementById("btn-submit");
const $btnsTip = d.querySelectorAll(".btn");
const $tipAmoutValue = d.getElementById("tip-amount-value");
const $totalValue = d.getElementById("total-value");
const $span = d.createElement("span");
const $span2 = d.createElement("span");

$span.textContent = "Can't be less than 0";
$span2.textContent = "Can't be zero";

d.addEventListener("keyup", (e) => {
  if (e.target.matches("#bill-input")) {
    e.target.value < 0
      ? ($span.classList.add("error-msg"),
        $billInput.insertAdjacentElement("beforebegin", $span),
        $span.classList.remove("error-msg-none"))
      : $span.classList.add("error-msg-none");
  }

  if (e.target.matches("#bill-input")) {
    e.target.value === "0"
      ? ($span2.classList.add("error-msg"),
        $billInput.insertAdjacentElement("beforebegin", $span2),
        $span2.classList.remove("error-msg-none"))
      : $span2.classList.add("error-msg-none");
  }

  if (e.target.matches("#tip-custom")) {
    e.target.value < 0
      ? ($span.classList.add("error-mgs-tip-custom"),
        $tipCustomInput.insertAdjacentElement("beforebegin", $span),
        $span.classList.remove("error-msg-none"))
      : $span.classList.add("error-msg-none");
  }
  if (e.target.matches("#people-input")) {
    e.target.value < 0
      ? ($span.classList.add("error-msg"),
        $peopleInput.insertAdjacentElement("beforebegin", $span),
        $span.classList.remove("error-msg-none"))
      : $span.classList.add("error-msg-none");
  }

  if (e.target.matches("#people-input")) {
    e.target.value === "0"
      ? ($span2.classList.add("error-msg"),
        $peopleInput.insertAdjacentElement("beforebegin", $span2),
        $span2.classList.remove("error-msg-none"))
      : $span2.classList.add("error-msg-none");
  }

  if ($billInput.value > 0 && $peopleInput.value > 0) {
    $btnsTip.forEach((el) => (el.disabled = false));
    $tipCustomInput.disabled = false;
  } else {
    $btnsTip.forEach((el) => (el.disabled = true));
    $tipCustomInput.disabled = true;
  }
});

$btnsTip.forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    $btnsTip.forEach((subEl) => subEl.classList.remove("is-active"));
    el.classList.add("is-active");
    let tipDiscount = el.textContent.split("%");
    calculateTip(tipDiscount[0]);
  });
});

$tipCustomInput.addEventListener("keyup", () => {
  if ($tipCustomInput.value !== " ") {
    $btnsTip.forEach((el) => el.classList.remove("is-active"));
  }
  if ($tipCustomInput.value >= 0) {
    calculateTip($tipCustomInput.value);
  }
});

const calculateTip = (tipDiscountValue) => {
  let billInputValue = $billInput.value;
  let peopleInputValue = $peopleInput.value;

  let tipAmount =
    (billInputValue * (tipDiscountValue / 100)) / peopleInputValue;
  let total = billInputValue / peopleInputValue + tipAmount;

  $tipAmoutValue.textContent = `$${tipAmount.toFixed(2)}`;
  $totalValue.textContent = `$${total.toFixed(2)}`;

  if (tipAmount !== 0 && total !== 0) {
    $btnReset.disabled = false;
    $btnReset.addEventListener("click", (e) => {
      e.preventDefault();
      $billInput.value = "";
      $tipCustomInput.value = "";
      $peopleInput.value = "";
      $tipAmoutValue.textContent = `$0.00`;
      $totalValue.textContent = `$0.00`;
      $btnReset.disabled = true;
      $btnsTip.forEach((el) => {
        el.classList.remove("is-active");
        el.disabled = true;
      });
      $tipCustomInput.disabled = true;
    });
  }
};
