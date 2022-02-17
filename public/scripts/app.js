// Client facing scripts here


$(() => {

  // Jacky
  //toggles schedule on main page
  $('.Schedule').click(function () {
    $('#date input').slideToggle();
    $('#time input').slideToggle();
  });

  $('#p1').click(function () {
    $('.1').show();
    $(".2").hide();
    $(".3").css("display", "none");
    $(".4").css("display", "none");
  })

  $('#p2').click(function () {
    $('.1').css("display", "none");
    $('.2').show();
    $('.3').css("display", "none");
    $('.4').css("display", "none");
  })

  $('#p3').click(function () {
    $('.1').css("display", "none");
    $('.2').css("display", "none");
    $('.3').show();
    $('.4').css("display", "none");
  })

  $('#p4').click(function () {
    $('.1').css("display", "none");
    $('.2').css("display", "none");
    $('.3').css("display", "none");
    $('.4').show();
  })

   //scroll views to where menu-subheaders are
   $('#m1').click(function () {
    var elm = document.getElementById('kb')
    elm.scrollIntoView(true);
  })

  $('#m2').click(function () {
    var elm = document.getElementById('sa')
    elm.scrollIntoView(true);
  })

  $('#m3').click(function () {
    var elm = document.getElementById('de')
    elm.scrollIntoView(true);
  })

  $('#m4').click(function () {
    var elm = document.getElementById('dk')
    elm.scrollIntoView(true);
  })

  console.log("client.js touched");
  const local = "http://localhost:8080";

    // Jacky
    //toggles schedule on main page
    $('.Schedule').click(function () {
      $('#date').slideToggle();
      $('#time').slideToggle();
    });

    $('.changeAddressBtn').click(function() {
      $("#modal").css("transform", "scale(1)");
      $("#overlay").css("opacity", "1");
    })

    $('.closeBtn').click(function() {
      $("#modal").css("transform", "scale(0)");
      $("#overlay").css("opacity", "0");
    })

    $('.addressBar').keyup(function () {
      $(".changeAddressBtn").text($(this).val());
    });


    // when user clicks on restaurant menu appears
    $("#kebab-kingdom").on('click', (data) => {
      window.location.href = `${local}/api/restaurants/menus/kebab-kingdom`;
    });

    // when user filters restaurant by clicking on $ button on side bar, restaurants filter
    // $(".one-dollar").on('click', () => {
    //   // console.log("ajax");
    //   // $("#kebab-kingdom").empty();
    //   $.ajax({
    //     url: "/api/restaurants/one-dollar",
    //     type: 'get',
    //     data: $(".one-dollar"),
    //     success: () => console.log('data from app.js'),
    //     error: error => console.log(error)
    //   })
    //     .then((data) => {
    //       $("#kebab-kingdom").append(data);
    //       // console.log("log", data);
    //     })
    // })


    // sends message as order is being prepared
    $("#finalizing-order").click(()=>{
      $.get("/api/progress/order-ready")
    });
    $("#order-delivered").click(()=>{
      $.get("/api/progress/order-delivered")
    });

    // testing submit form
    // $(".addressBtn").on('click', (data) => {
    //   console.log('click testing submit form');
    //   const serializeData = $(".addressBar").serialize();
    //   const address = $("#address").val().serialize();
    //   $.ajax({
    //     url: "/api/restaurants/address",
    //     type: 'get',
    //     data: { address },
    //     success: function (data) {
    //       console.log("ajax data from backend", data);
    //     },
    //     error: function (error) {
    //       console.log(error);
    //     }
    //   })
    // })


    // // store this data somewhere
    // const serializeData = $(".addressBar").serialize();
    // console.log('serializedata:    ', serializeData);
    // const address = $("#address").val();
    // $.ajax({
    //   url: "/api/restaurants/location-based",
    //   type: 'get',
    //   data: { address },
    //   success: function (data) {
    //     console.log("ajax data from backend", data);
    //   },
    //   error: function (error) {
    //     console.log(error);
    //   }
    // })

});
