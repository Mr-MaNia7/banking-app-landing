$(document).ready(() => {
  /*
      Applies a background to nav container
      depending on the page scroll position
  */
  var nav = $(".nav-container");
  var pos = nav.position();
  var navContent = $(".nav-container .content");
  var navBtnPos = $("#headerJoinBtn").position();

  $(window).on("scroll", function () {
    var windowpos = $(window).scrollTop();
    if (windowpos > pos.top) {
      nav.addClass("activated");
    } else {
      nav.removeClass("activated");
    }

    if (windowpos > navBtnPos.top) {
      navContent.addClass("show");
    } else {
      navContent.removeClass("show");
    }
  });

  /**
   * Accounts for a scenario where the page is reloaded while
   * it's in the middle of the contnet
   */
  if ($(window).scrollTop() > 100) {
    nav.addClass("activated");
  } else {
    nav.removeClass("activated");
  }

  if ($(window).scrollTop() > 320) {
    navContent.addClass("show");
  } else {
    navContent.removeClass("show");
  }

  // GTM events
  window.dataLayer.push({
    event: "Landing Page Opened",
  });

  $(".join-list-btn").click(function () {
    let landing_page_version = $(this).data("version");
    window.dataLayer.push({
      event: `Landing Page Button Clicked`,
      landing_page_version
    });
  });

  // -- GTM events

  $(".accordion .accordion-header").click(function () {
    let indicator = $(this).find(".ah-tgl");
    let accordion = $(this).parent();

    $(accordion).toggleClass("open");
    $(indicator).toggleClass("mdi-plus");
    $(indicator).toggleClass("mdi-minus");
  });

  // scroll reveal
  // -- header

  ScrollReveal().reveal("  #phone-anim", {
    reset: true,
    delay: 250,
    origin: "right",
    scale: 0.8,
  });

  ScrollReveal().reveal("#thai-phone-anim", {
    reset: true,
    delay: 250,
    origin: "right",
    scale: 0.8,
  });

  ScrollReveal().reveal(".header-content-txt", {
    reset: true,
    delay: 250,
    distance: "100px",
    origin: "left",
    mobile: false,
  });

  //--- how it works
  ScrollReveal().reveal("#hiw-1", {
    reset: true,
    delay: 100,
    distance: "100px",
    origin: "bottom",
  });
  ScrollReveal().reveal("#hiw-2", {
    reset: true,
    delay: 200,
    distance: "100px",
    origin: "bottom",
  });

  ScrollReveal().reveal("#hiw-3", {
    reset: true,
    delay: 300,
    distance: "100px",
    origin: "bottom",
  });

  ScrollReveal().reveal("#hiw-4", {
    reset: true,
    delay: 400,
    distance: "100px",
    origin: "bottom",
  });

  ScrollReveal().reveal(".hiw-step-arrow", {
    reset: true,
    delay: 500,
    distance: "100px",
    origin: "bottom",
  });

  //--- supported banks
  ScrollReveal().reveal("#bank-1", {
    reset: true,
    delay: 100,
    distance: "100px",
    origin: "bottom",
  });
  ScrollReveal().reveal("#bank-2", {
    reset: true,
    delay: 200,
    distance: "100px",
    origin: "bottom",
  });

  ScrollReveal().reveal("#bank-3", {
    reset: true,
    delay: 300,
    distance: "100px",
    origin: "bottom",
  });

  ScrollReveal().reveal("#bank-4", {
    reset: true,
    delay: 400,
    distance: "100px",
    origin: "bottom",
  });

  ScrollReveal().reveal("#bank-5", {
    reset: true,
    delay: 500,
    distance: "100px",
    origin: "bottom",
  });

  // -------------------------------------

  // low intrest
  ScrollReveal().reveal(".li-graphic", {
    reset: true,
    delay: 100,
    distance: "120px",
    origin: "top",
    mobile: false,
  });

  ScrollReveal().reveal(".li-content-txt", {
    reset: true,
    delay: 100,
    distance: "120px",
    origin: "bottom",
    mobile: false,
  });

  ScrollReveal().reveal("#low-interest-icon", {
    reset: true,
    delay: 150,
    distance: "50px",
    origin: "top",
  });

  // -------------------------------------
  // early payday

  ScrollReveal().reveal(".ep-rec", {
    reset: true,
    delay: 150,
    distance: "100px",
    origin: "top",
    mobile: false,
  });
  ScrollReveal().reveal("#calendar-graphic", {
    reset: true,
    delay: 250,
    distance: "100px",
    scale: 0.65,
    origin: "bottom",
  });
  ScrollReveal().reveal(".ep-content-txt", {
    reset: true,
    delay: 250,
    distance: "50px",
    origin: "bottom",
    mobile: false,
  });

  // ----------------------------------------
  // safe-connect
  ScrollReveal().reveal(".sc-graphic", {
    reset: true,
    delay: 100,
    distance: "120px",
    scale: 0.8,
    origin: "bottom",
    mobile: false,
  });

  ScrollReveal().reveal(".sc-content-txt", {
    reset: true,
    delay: 100,
    distance: "120px",
    origin: "top",
    mobile: false,
  });

  ScrollReveal().reveal("#safe-connect-icon", {
    reset: true,
    delay: 150,
    distance: "50px",
    origin: "top",
  });

  // --------------------------------------------
  /// milestones
  ScrollReveal().reveal(".milestones-header", {
    reset: true,
    delay: 250,
    distance: "50px",
    origin: "top",
  });

  ScrollReveal().reveal("#milestone-improve", {
    reset: true,
    delay: 250,
    distance: "50px",
    origin: "bottom",
  });

  ScrollReveal().reveal("#milestone-higher", {
    reset: true,
    delay: 275,
    distance: "50px",
    origin: "bottom",
  });

  ScrollReveal().reveal("#milestone-unlock", {
    reset: true,
    delay: 300,
    distance: "50px",
    origin: "bottom",
  });

  ScrollReveal().reveal(".cta-flexibility", {
    reset: true,
    delay: 350,
    distance: "100px",
    origin: "bottom",
  });

  ScrollReveal().reveal(".cta-lvl-up", {
    reset: false,
    delay: 350,
    distance: "100px",
    origin: "bottom",
  });

  ScrollReveal().reveal(".content-security", {
    reset: true,
    delay: 350,
    distance: "100px",
    origin: "bottom",
  });

  // --------------------------------------------
  // faqs
  ScrollReveal().reveal(".faqs", {
    reset: true,
    delay: 300,
    scale: 0.85,
  });

  // -------------------------------------------

  $.ajax({
    url: "__config-finnUrl__",
    xhrFields: {
      withCredentials: true
   }
  });

  // Testimonial Slider
  $(".testimonial-slider").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    speed: 500,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 540,
        settings: {
          centerPadding: "12px",
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 420,
        settings: {
          centerPadding: "8px",
          slidesToShow: 1,
        },
      },
    ],
  });
});
