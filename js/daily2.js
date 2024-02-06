/* JS Document */
document.addEventListener("DOMContentLoaded", function() {

  //設置不同功能函數和參數區～

  let sketch1 = function(p) {
    let container; //畫布
    let circles = []; // 放置藍色圓點的陣列

    let cursorImages=[];//所有盆栽圖片存在這
    let currentImageIndex = 0; // 第幾階段的盆栽

    let yellowCircle = { // 存儲黃色圈圈的屬性
      x: 0,
      y: 0,
      radiusX: 30, // 初始橢圓形的水平半徑
      radiusY: 10, // 初始橢圓形的垂直半徑
      radius: 10, // 初始半徑
      color: p.color(255, 0, 200,0), // 初始顏色 (粉紅色)
      touchedBlueCircles: 0 // 被觸碰的藍色圓形數量
    };
    // 控制眼淚掉下來的速度和數量
    let frameCounter = 0; 
    const circleInterval = 40;//貞數
    const maxCircles = 10; // 最大圓形數量
    let endImage

    let gameOverText = [//遊戲結束的文字
      "Mr. Red",
      "is healed...",
      "Press anywhere",
      "to start over."
    ];

    p.preload = function() {
      endImage = p.loadImage('game/game_sf.png');//載入遊戲結束的圖片
      for (let i = 1; i <= 22; i++) {
        cursorImages.push(p.loadImage(`game/game-${i}.png`));
      }//載入所有盆栽階段圖片
    }


    p.setup = function() {
      container = document.getElementById('sketch1-container');
      //召喚canvas 並且取得其長寬
      let canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
      p.noStroke();

      // 在兩個特定的位置生成藍色圓形
      generateCircle(container.offsetWidth * 0.42, container.offsetHeight * 0.40);
      generateCircle(container.offsetWidth * 0.50, container.offsetHeight * 0.37);

    };

    //生成眼淚的函式：套用前面給予的起始比例位置
    function generateCircle(x, y) {
      let circle = {
        x: x,
        y: y,
        diameter: p.random(6, 18),//最大最小的眼淚半徑
        speed: p.random(1, 15)//函式結束不要逗號，隨機速度的給予
      };
      circles.push(circle);//添加新生成的圓形到circles[]陣列裡，才可以給予所有生成圓形指令跟屬性
    }

    // 設定 檢查眼淚滑鼠是否相交 的函數
    function checkCollision(x1, y1, d1, x2, y2, d2) {
      
      let distance = p.dist(x1, y1, x2, y2);//設置距離參數
      return distance < (d1 / 2 + d2 / 2);//回饋距離是否小於兩者半徑總和 有就是判斷為有相交
    }
    

    //重複動作區～

    p.draw = function() {
      p.clear(); // 清空畫布

      // 檢查游標是否觸碰到藍色圓形的迴圈
      for (let i = 0; i < circles.length; i++) {//對每個眼淚進行檢查
        let collision = checkCollision(yellowCircle.x, yellowCircle.y, yellowCircle.radius * 2, circles[i].x, circles[i].y, circles[i].diameter);
        if (collision) {
          yellowCircle.touchedBlueCircles++; // 如果有相交，則touch++多記一次
          if (yellowCircle.touchedBlueCircles % 4 == 0) {
            // 如果touch到五的倍數
            yellowCircle.radiusY += 0.1; // 每觸碰4個藍色圓形半徑增加 0.5
            yellowCircle.color = p.color(255 - yellowCircle.touchedBlueCircles * 2, 0, 220,0); // b顏色比例改變

            //盆栽圖片的更改
            currentImageIndex = (currentImageIndex + 1) % cursorImages.length;
            //吃掉眼淚
            circles.splice(i, 1);
            i--;
          }
        }
      }

        // 繪製游標的圖片，位置跟隨鼠標
        let currentImage = cursorImages[currentImageIndex];
        p.image(currentImage, p.mouseX-25, p.mouseY+25, currentImage.width/7, currentImage.height/7);

        // 檢查是否遊戲應該停止
  if (currentImageIndex === 21) {
    p.noLoop(); // 停止遊戲迴圈

    // 在 canvas 上繪製停止遊戲時的元素
    let currentImage = cursorImages[21];
    let img = document.getElementById('gameOverImage');
    p.image(endImage, 0, 0, 0,container.offsetHeight*6);
    p.fill(255,111,53); // 設定文字顏色
    p.textFont('Roboto Mono');
    p.textSize(12); // 設定文字大小
    p.textLeading(10); // 設定文字行高
    p.textAlign(p.LEFT, container.offsetWidth/3 ); // 文字位置
    for (let i = 0; i < gameOverText.length; i++) {
      p.text(gameOverText[i], container.offsetWidth/1.35, container.offsetHeight / 3 + i * 30);
    }
  } else {
    // 生成藍色圓形
    for (let i = 0; i < circles.length; i++) {
      p.fill(61, 222, 255);
      p.ellipse(circles[i].x, circles[i].y, circles[i].diameter, circles[i].diameter);
    }

    // 繪製黃色圈圈
    p.fill(yellowCircle.color);
    p.ellipse(yellowCircle.x + yellowCircle.radiusX , yellowCircle.y, yellowCircle.radiusX * 2, yellowCircle.radiusY * 2);

    // 移動並繪製每個圓點
    for (let i = 0; i < circles.length; i++) {
      p.fill(61, 222, 255);
      p.ellipse(circles[i].x, circles[i].y, circles[i].diameter, circles[i].diameter);

      circles[i].y += circles[i].speed;

      if (circles[i].y > container.offsetHeight + circles[i].diameter) {
        circles.splice(i, 1);
        i--;
      }
    }

    frameCounter++;
    if (frameCounter >= circleInterval && circles.length < maxCircles) {
      generateCircle(container.offsetWidth * 0.42, container.offsetHeight * 0.40);
      generateCircle(container.offsetWidth * 0.50, container.offsetHeight * 0.37);
      frameCounter = 0;
    }
  }

    };
    p.mousePressed = function() {
      if (currentImageIndex === 21) {
        
        // 重新設置遊戲狀態
        yellowCircle.color = p.color(255, 0, 200,0);
        yellowCircle.touchedBlueCircles = 0;
        currentImageIndex = 0;

        p.loop(); // 重新啟動遊戲迴圈
      }
    };

    p.windowResized = function() {
      p.resizeCanvas(container.offsetWidth, container.offsetHeight);
    };

    p.mouseMoved = function() {
      // 更新鼠標圈圈的位置
      yellowCircle.x = p.mouseX;
      yellowCircle.y = p.mouseY;

    };

   
  };

  new p5(sketch1, 'sketch1-container');
});