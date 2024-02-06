/* JS Document */
document.addEventListener("DOMContentLoaded", function() {
    // 運作完成後執行

    $('img').on('click', function() {
      // 添加抖動效果的 class
      $('img').addClass('shake');

      //sparkling
      var popupImage = $('#popupImage');
        popupImage.toggle(100); // 淡出秒數


      // 移除抖動效果的 class（在動畫結束後）
      setTimeout(() => {
          $('img').removeClass('shake');
      }, 1000);
    });

  // 點擊商品彈跳出視窗
  $("#cam").click(function(e) {
    e.stopPropagation();
    $("#cam_content").slideDown();
    $("#toy_content").slideUp();
    $("#bag_content").slideUp(); 
    $("#sticker_content").slideUp();  // 滑動的動畫顯示
  });

  // 點擊 #cam_content 以外的地方關閉
  $(document).click(function(e) {
    if (!$(e.target).closest("#cam_content, #cam").length) {
        $("#cam_content").slideUp(); // 滑動的動畫關閉
    }
  });

  // 點擊商品彈跳出視窗
  $("#bag").click(function(e) {
    e.stopPropagation();
    $("#bag_content").slideDown();
    $("#toy_content").slideUp();
    $("#cam_content").slideUp();
    $("#sticker_content").slideUp();  // 滑動的動畫顯示
  });

  // 點擊 #cam_content 以外的地方關閉
  $(document).click(function(e) {
    if (!$(e.target).closest("#cam_content, #cam").length) {
        $("#bag_content").slideUp(); // 滑動的動畫關閉
    }
  });

  // 點擊商品彈跳出視窗
  $("#toy").click(function(e) {
    e.stopPropagation();
    $("#toy_content").slideDown();
    $("#cam_content").slideUp();
    $("#bag_content").slideUp(); 
    $("#sticker_content").slideUp();  // 滑動的動畫顯示
  });

  // 點擊 #cam_content 以外的地方關閉
  $(document).click(function(e) {
    if (!$(e.target).closest("#cam_content, #cam").length) {
        $("#toy_content").slideUp();// 滑動的動畫關閉
    }
  });

  // 點擊商品彈跳出視窗
  $("#sticker").click(function(e) {
    e.stopPropagation();
    $("#sticker_content").slideDown();
    $("#toy_content").slideUp();
    $("#cam_content").slideUp();
    $("#bag_content").slideUp();  // 滑動的動畫顯示
  });

  // 點擊 #cam_content 以外的地方關閉
  $(document).click(function(e) {
    if (!$(e.target).closest("#cam_content, #cam").length) {
        $("#sticker_content").slideUp(); // 滑動的動畫關閉
    }
  });

//實拍圖相簿
let dotDoms = "";
let currentPage = 1;//初始第一張照片設置為頁數1
let currentDot = 0;//初始第一張照片時的點位1
const totalImages = 4; // 總共的照片數量常數

for (let index = 0; index < totalImages; index++) {
  dotDoms += "<span class='dot' data-page=" + index + "></span>";
}//點的數量從零開始數起，小於照片數量totalImage即停止產生圓點

$(".litCir_ul").html(dotDoms);//將圓點加到頁面上
$(".dot").eq(0).addClass("active-dot");//初始時，將第一個原點表示為紅色active

//左右滑動照片按下左鍵
$(".left").click(function () {
  if (currentPage > 1) {//當目前的頁碼大於1則可以啟動迴圈
    currentPage--;//頁碼減一
  } else {
    currentPage = totalImages;//否則維持原狀
  }

  $(".img_ul").css({
    marginLeft: -(currentPage - 1) * 100 + "%"//marginleft為滑動效果
  });//照片串移動一個照片的寬度（往左偏移100%照片寬）

  currentDot = currentPage - 1;//點的位置也要跟著改
  renderDots();
});

$(".right").click(function () {
  if (currentPage < totalImages) {
    currentPage++;
  } else {
    currentPage = 1;
  }

  $(".img_ul").css({
    marginLeft: -(currentPage - 1) * 100 + "%"
  });

  currentDot = currentPage - 1;
  renderDots();
});

//圓點隨著頁數改變的功能
$(".dot").click(function (e) {
  currentPage = parseInt(e.currentTarget.dataset.page) + 1;
  currentDot = parseInt(e.currentTarget.dataset.page);
  $(".img_ul").css({
    marginLeft: -currentDot * 100 + "%"
  });
  renderDots();
});

function renderDots() {
  $(".dot").removeClass("active-dot");
  $(".dot").eq(currentDot).addClass("active-dot");
}

});


