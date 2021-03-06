//  -------------->  Smooth Scroll ->  All animations will take exactly 500ms
var scroll = new SmoothScroll('a[href*="#"]', {
  speed: 500,
  speedAsDuration: true,
  offset: 100,
});

// -------------->  Animate on Scroll

AOS.init();

// --------------> FAQ

const accordionItemHeaders = document.querySelectorAll(
  ".accordion-item-header"
);

accordionItemHeaders.forEach((accordionItemHeader) => {
  accordionItemHeader.addEventListener("click", (event) => {
    //  Uncomment in case you only want to allow for the display of only one collapsed item at a time!

    const currentlyActiveAccordionItemHeader = document.querySelector(
      ".accordion-item-header.active"
    );
    if (
      currentlyActiveAccordionItemHeader &&
      currentlyActiveAccordionItemHeader !== accordionItemHeader
    ) {
      currentlyActiveAccordionItemHeader.classList.toggle("active");
      currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
    }

    accordionItemHeader.classList.toggle("active");
    const accordionItemBody = accordionItemHeader.nextElementSibling;
    if (accordionItemHeader.classList.contains("active")) {
      accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";
    } else {
      accordionItemBody.style.maxHeight = 0;
    }
  });
});

//  -------------->  Modal

// Get the modal
var modal = document.getElementById("myModal");
var modal2 = document.getElementById("myModal2");
var mobileNav = document.getElementById("menu");
var menuToggle = document.getElementById("menuToggle").children[0];

// Get the button that opens the modal
var btn = document.getElementById("myBtn");
var btn2 = document.getElementById("myBtn2");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
var span2 = document.getElementsByClassName("closeit")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.classList.add("displayIt");
  // modal.style.display = "block";
};
btn2.onclick = function () {
  modal2.classList.add("displayIt");
  // modal2.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.classList.remove("displayIt");
  // modal.style.display = "none";
};
span2.onclick = function () {
  modal2.classList.remove("displayIt");
  // modal2.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (
    event.target == modal2 ||
    event.target == modal ||
    event.target.parentElement.parentElement == mobileNav
  ) {
    // modal2.style.display = "none";
    // modal.style.display = "none";
    modal.classList.remove("displayIt");
    modal2.classList.remove("displayIt");
    menuToggle.checked = false;
  }
};

// ----------------> Animate nav bar on scroll

var nav = document.getElementsByClassName("top-nav")[0];

window.onscroll = function () {
  "use strict";
  if (
    document.body.scrollTop >= 200 ||
    document.documentElement.scrollTop >= 200
  ) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
};

// Lazy load images

var lazyLoadInstance = new LazyLoad({
  // Your custom settings go here
});

// Google gtag

window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());

gtag("config", "UA-176583079-1");
