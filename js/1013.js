/* JS Document */
document.addEventListener("DOMContentLoaded", function() {
    // 運作完成後執行
    $(".flip").click(function(){
      $(".panel").slideToggle("slow");
      $(".panel2").slideUp("slow");
      $(".panel3").slideUp("slow");
  });

    $(".flip2").click(function(){
      $(".panel2").slideToggle("slow");
      $(".panel").slideUp("slow");
      $(".panel3").slideUp("slow");
  });

    $(".flip3").click(function(){
      $(".panel3").slideToggle("slow");
      $(".panel").slideUp("slow");
      $(".panel2").slideUp("slow");
    });
    
});


