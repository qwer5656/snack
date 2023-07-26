//获取canvas画布
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var imgObject1 = new Image();
imgObject1.src = "./bom.png";
var imgObject2 = new Image();
imgObject2.src = "./flag.png";

var imgObject = new Image();
imgObject.src = "./main.png";

var w=60;
var h=60;

imgObject.onload = function () {

    canvas.width = 900;
    canvas.height = 900;
    
    //定义各属性
    let R = 3; //格子圆角半径
    let L = w; //每个格子实际长
    let P = h; //每个格子占长
    let row = 10; //行数
    let col = 10; //列数
    let N = 10; //雷数
    
    var wholeArr = drawInitialize(row, col, N, R, L, P);
    var gameArr = wholeArr[0] //位置数组
    var bombArr = wholeArr[1] //雷的位置数组
    var statusArr = zoneInitialize(row, col); //状态数组 0为未打开且未标记  1为打开  2为标记
    var signArr = []; //标记数组







//画出初始界面
function drawInitialize(row, col, n, R, L, P) {
    let arr = initialize(row, col, n);
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < col; c++) {
            drawRct(r * P, c * P, L, R, 'rgb(102,102,102)', context);//该方法用于绘制整个画面，下面会写出声明
        }
    }
    return arr;
}

//初始化
function initialize(row, col, n) {
    let gameArr = zoneInitialize(row, col); //生成没有标记雷的矩阵
    let bomb = bombProduce(n, gameArr, row, col);
    gameArr = signArrNum(bomb[0], bomb[1], n, row, col);
    return [gameArr, bomb[1]];
}

//界面矩阵初始化
function zoneInitialize(row, col) { //生成row行col列的矩阵
    let cArr = new Array(col);
    let rArr = new Array(row);
    cArr = cArr.fill(0); //将行的每个位置用0填充
    for (let i = 0; i < row; i++)
        rArr[i] = [...cArr];
    return rArr;
}

//随机生成雷
function bombProduce(n, arr, row, col) { //随机生成n个雷
    let count = 0;
    let bombArr = [];

    while (true) {
        if (count === n)
            break;
        let r = Math.floor(Math.random() * row);
        let c = Math.floor(Math.random() * col);
        if (arr[c][r] === 0) {
            arr[c][r] = -1;
            bombArr[count] = strProduce(c, r);
            count++;
        }
    }
    return [arr, bombArr];
}

//标记数字
function signArrNum(gArr, bArr, n, row, col) {
    for (let i = 0; i < n; i++) { //为每个雷的四周的非雷的数字标记加一
        let r = parseInt(analyseStr(bArr[i]).row);
        let c = parseInt(analyseStr(bArr[i]).col);
        if (r > 0 && gArr[c][r - 1] != -1)//判断该位置是否为雷，是则不进行操作
            gArr[c][r - 1]++;
        if (r < row - 1 && gArr[c][r + 1] !== -1)
            gArr[c][r + 1]++;
        if (c > 0 && gArr[c - 1][r] !== -1)
            gArr[c - 1][r]++;
        if (c < col - 1 && gArr[c + 1][r] !== -1)
            gArr[c + 1][r]++;
        if (r > 0 && c > 0 && gArr[c - 1][r - 1] != -1)
            gArr[c - 1][r - 1]++;
        if (r < row - 1 && c < col - 1 && gArr[c + 1][r + 1] != -1)
            gArr[c + 1][r + 1]++;
        if (r > 0 && c < col - 1 && gArr[c + 1][r - 1] != -1)
            gArr[c + 1][r - 1]++;
        if (r < row - 1 && c > 0 && gArr[c - 1][r + 1] != -1)
            gArr[c - 1][r + 1]++;
    }
    return gArr;
}

//生成字符串
function strProduce(r, c) {
    return `row:${c}|col:${r}`;
}

//解析雷数组字符串
function analyseStr(str) {
    str = str.split('|');
    str[0] = str[0].split(':');
    str[1] = str[1].split(':');
    return { row: str[0][1], col: str[1][1] };
}

//画出单个方块
function drawRct(x, y, l, r, color, container = context) {//x,y为绘制的位置，l为方块的边长，r为方块圆角半径，color为方块的填充颜色
    if (color == "rgb(102,102,102)") {
        container.clearRect(x,y,w,h);
        container.beginPath();
        container.moveTo(x + r, y);
        container.lineTo(x + l - r, y);
        container.arcTo(x + l, y, x + l, y + r, r);
        container.lineTo(x + l, y + l - r);
        container.arcTo(x + l, y + l, x + l - r, y + l, r);
        container.lineTo(x + r, y + l);
        container.arcTo(x, y + l, x, y + l - r, r);
        container.lineTo(x, y + r);
        container.arcTo(x, y, x + r, y, r);
        container.fillStyle = "rgba(255,255,255)";
        container.closePath();
        container.fill();
        container.stroke();
        container.drawImage(imgObject, x, y, w, h);
    } 
    else if(color == "rgb(255,0,0)"){
        container.clearRect(x,y,w,h);
        container.beginPath();
        container.moveTo(x + r, y);
        container.lineTo(x + l - r, y);
        container.arcTo(x + l, y, x + l, y + r, r);
        container.lineTo(x + l, y + l - r);
        container.arcTo(x + l, y + l, x + l - r, y + l, r);
        container.lineTo(x + r, y + l);
        container.arcTo(x, y + l, x, y + l - r, r);
        container.lineTo(x, y + r);
        container.arcTo(x, y, x + r, y, r);
        container.fillStyle = "rgba(255,255,255)";

        container.closePath();
        container.fill();
        container.stroke();
        container.drawImage(imgObject1, x, y, w, h);
    }
    else if(color == "rgb(1,1,1)"){
        container.clearRect(x,y,w,h);
        container.beginPath();
        container.moveTo(x + r, y);
        container.lineTo(x + l - r, y);
        container.arcTo(x + l, y, x + l, y + r, r);
        container.lineTo(x + l, y + l - r);
        container.arcTo(x + l, y + l, x + l - r, y + l, r);
        container.lineTo(x + r, y + l);
        container.arcTo(x, y + l, x, y + l - r, r);
        container.lineTo(x, y + r);
        container.arcTo(x, y, x + r, y, r);
        container.fillStyle = "rgba(255,255,255)";

        container.closePath();
        container.fill();
        container.stroke();
        container.drawImage(imgObject2, x, y, w, h);
    }
    else {
        container.beginPath();
        container.moveTo(x + r, y);
        container.lineTo(x + l - r, y);
        container.arcTo(x + l, y, x + l, y + r, r);
        container.lineTo(x + l, y + l - r);
        container.arcTo(x + l, y + l, x + l - r, y + l, r);
        container.lineTo(x + r, y + l);
        container.arcTo(x, y + l, x, y + l - r, r);
        container.lineTo(x, y + r);
        container.arcTo(x, y, x + r, y, r);
        container.fillStyle = color;

        container.closePath();
        container.fill();
        container.stroke();
      
    }
    console.log(color);
}

//画出方块上对应的数字
function drawNum(x, y, l, r, alPha, color = 'rgb(0,0,0)', container = context) {//参数含义与上面的方法一样，alPha为要写的数字
    if (alPha === 0)
        alPha = "";
    container.beginPath();
    container.fillStyle = color;
    container.textAlign = 'center';
    container.textBaseline = 'middle';
    container.font = '20px Adobe Ming Std';
    container.fillText(alPha, x + l / 2, y + l / 2);
    container.closePath();
}

//画出游戏结束界面
function drawEnd(row, col, R, L, P) {
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < col; c++) {//将整个界面绘制出来
            let num = gameArr[r][c];
            let color;
            if (num === -1)
                color = 'rgb(255,0,0)';
            else
                color = 'rgb(255,255,255)';
            drawRct(r * P, c * P, L, R, color, context);
            drawNum(r * P, c * P, L, R, num);
        }
    }
}

canvas.onclick = function (e) {
    e = e || window.e;
    let x = e.clientX - canvas.offsetLeft;
    let y = e.clientY - canvas.offsetTop; //获取鼠标在canvas画布上的坐标
    let posX = Math.floor(x / P);
    let posY = Math.floor(y / P);//将坐标转化为数组下标
    if (gameArr[posX][posY] === -1 && statusArr[posX][posY] !== 2) { //点到雷
        alert('Game Over');
        drawEnd(row, col, R, L, P);
    } else if (statusArr[posX][posY] === 0) {
        this.style.cursor = "auto";
        statusArr[posX][posY] = 1;//重置状态
        drawRct(posX * P, posY * P, L, R, 'rgb(255,255,255)', context);
        drawNum(posX * P, posY * P, L, R, gameArr[posX][posY]);
        outNum(gameArr, posY, posX, row, col, 'middle');
    }
    gameComplete();//游戏成功，在下面代码定义
}

//右键标记雷，取消标记，检查四周
canvas.oncontextmenu = function (e) {
    e = e || window.e;
    let x = e.clientX - canvas.offsetLeft;
    let y = e.clientY - canvas.offsetTop; //获取鼠标在canvas画布上的坐标
    let posX = Math.floor(x / P);
    let posY = Math.floor(y / P);
    let str = strProduce(posX, posY);
    if (gameArr[posX][posY] > 0 && statusArr[posX][posY] === 1) //检查四周雷数
        checkBomb(posX, posY);
    if (statusArr[posX][posY] === 0) { //标记雷
        drawRct(posX * P, posY * P, L, R, 'rgb(1,1,1)');
        statusArr[posX][posY] = 2;
        signArr[signArr.length] = str;
    } else if (statusArr[posX][posY] === 2) { //取消标记
        drawRct(posX * P, posY * P, L, R, 'rgb(102,102,102)');
        statusArr[posX][posY] = 0;
        signArr = signArr.filter(item => {//使用过滤器方法将当前位置的坐标标记清除
            if (item === str)
                return false;
            return true;
        })
    }
    gameComplete();
    return false; //阻止事件冒泡
}

//自动跳出数字
function outNum(arr, x, y, row, col, status) {//arr为传入的数组，x,y为处理的位置，row,col为游戏的行列，status用于储存扩展的方向
    if (status === 'middle') {
        outNumHandle(arr, x - 1, y, row, col, 'left');
        outNumHandle(arr, x + 1, y, row, col, 'right');
        outNumHandle(arr, x, y - 1, row, col, 'top');
        outNumHandle(arr, x, y + 1, row, col, 'down');
    } else if (status === 'left') {
        outNumHandle(arr, x - 1, y, row, col, 'left');
        outNumHandle(arr, x, y - 1, row, col, 'top');
        outNumHandle(arr, x, y + 1, row, col, 'down');
    } else if (status === 'right') {
        outNumHandle(arr, x + 1, y, row, col, 'right');
        outNumHandle(arr, x, y - 1, row, col, 'top');
        outNumHandle(arr, x, y + 1, row, col, 'down');
    } else if (status === 'top') {
        outNumHandle(arr, x, y - 1, row, col, 'top');
    } else {
        outNumHandle(arr, x, y + 1, row, col, 'down');
    }
}

//跳出数字具体操作
function outNumHandle(arr, x, y, row, col, status) {
    if (x < 0 || x > row - 1 || y < 0 || y > col - 1) //超出边界的情况
        return;
    if (arr[y][x] !== 0) {
        if (arr[y][x] !== -1) {
            drawRct(y * P, x * P, L, R, 'rgb(255,255,255)', context);
            drawNum(y * P, x * P, L, R, arr[y][x]);
            statusArr[y][x] = 1;
        }
        return;
    }
    drawRct(y * P, x * P, L, R, 'rgb(255,255,255)', context);
    drawNum(y * P, x * P, L, R, arr[y][x]);
    statusArr[y][x] = 1;
    outNum(arr, x, y, row, col, status);
}

//检查数字四周的雷的标记并操作
function checkBomb(r, c) {
    //1.检查四周是否有被标记确定的位置
    //2.记下标记的位置数count
    //3.若count为0，则return；若count大于0，检查是否标记正确
    //4.如果标记错误，提示游戏失败，若标记正确但数量不够，则return跳出，若标记正确且数量正确，将其余位置显示出来
    let bombNum = gameArr[r][c];
    let count = 0;
    if (r > 0 && statusArr[r - 1][c] === 2) {
        if (!(bombArr.includes(strProduce(r - 1, c)))) {
            alert('Game Over');
            drawEnd(row, col, R, L, P);
            return;
        }
        count++;
    }
    if (r < row - 1 && statusArr[r + 1][c] === 2) {
        if (!(bombArr.includes(strProduce(r + 1, c)))) {
            alert('Game Over');
            drawEnd(row, col, R, L, P);
            return;
        }
        count++;
    }
    if (c > 0 && statusArr[r][c - 1] === 2) {
        if (!(bombArr.includes(strProduce(r, c - 1)))) {
            alert('Game Over');
            drawEnd(row, col, R, L, P);
            return;
        }
        count++;
    }
    if (c < col - 1 && statusArr[r][c + 1] === 2) {
        if (!(bombArr.includes(strProduce(r, c + 1)))) {
            alert('Game Over');
            drawEnd(row, col, R, L, P);
            return;
        }
        count++;
    }
    if (r > 0 && c > 0 && statusArr[r - 1][c - 1] === 2) {
        if (!(bombArr.includes(strProduce(r - 1, c - 1)))) {
            alert('Game Over');
            drawEnd(row, col, R, L, P);
            return;
        }
        count++;
    }
    if (r < row - 1 && c < col - 1 && statusArr[r + 1][c + 1] === 2) {
        if (!(bombArr.includes(strProduce(r + 1, c + 1)))) {
            alert('Game Over');
            drawEnd(row, col, R, L, P);
            return;
        }
        count++;
    }
    if (r > 0 && c < col - 1 && statusArr[r - 1][c + 1] === 2) {
        if (!(bombArr.includes(strProduce(r - 1, c + 1)))) {
            alert('Game Over');
            drawEnd(row, col, R, L, P);
            return;
        }
        count++;
    }
    if (r < row - 1 && c > 0 && statusArr[r + 1][c - 1] === 2) {
        if (!(bombArr.includes(strProduce(r + 1, c - 1)))) {
            alert('Game Over');
            drawEnd(row, col, R, L, P);
            return;
        }
        count++;
    }

    if (count !== bombNum)
        return;
    else {

        outNotBomb(c, r);
    }
}


//跳出四周非雷的方块
function outNotBomb(c, r) {
    if (r > 0 && statusArr[r - 1][c] === 0) {
        drawRct((r - 1) * P, c * P, L, R, 'rgb(255,255,255)', context);
        drawNum((r - 1) * P, c * P, L, R, gameArr[r - 1][c]);
        statusArr[r - 1][c] = 1;
    }
    if (r < row - 1 && statusArr[r + 1][c] === 0) {
        drawRct((r + 1) * P, c * P, L, R, 'rgb(255,255,255)', context);
        drawNum((r + 1) * P, c * P, L, R, gameArr[r + 1][c]);
        statusArr[r + 1][c] = 1;
    }
    if (c > 0 && statusArr[r][c - 1] === 0) {
        drawRct(r * P, (c - 1) * P, L, R, 'rgb(255,255,255)', context);
        drawNum(r * P, (c - 1) * P, L, R, gameArr[r][c - 1]);
        statusArr[r][c - 1] = 1;
    }
    if (c < col - 1 && statusArr[r][c + 1] === 0) {
        drawRct(r * P, (c + 1) * P, L, R, 'rgb(255,255,255)', context);
        drawNum(r * P, (c + 1) * P, L, R, gameArr[r][c + 1]);
        statusArr[r][c + 1] = 1;
    }
    if (r > 0 && c > 0 && statusArr[r - 1][c - 1] === 0) {
        drawRct((r - 1) * P, (c - 1) * P, L, R, 'rgb(255,255,255)', context);
        drawNum((r - 1) * P, (c - 1) * P, L, R, gameArr[r - 1][c - 1]);
        statusArr[r - 1][c - 1] = 1;
    }
    if (r < row - 1 && c < col - 1 && statusArr[r + 1][c + 1] === 0) {
        drawRct((r + 1) * P, (c + 1) * P, L, R, 'rgb(255,255,255)', context);
        drawNum((r + 1) * P, (c + 1) * P, L, R, gameArr[r + 1][c + 1]);
        statusArr[r + 1][c + 1] = 1;
    }
    if (r > 0 && c < col - 1 && statusArr[r - 1][c + 1] === 0) {
        drawRct((r - 1) * P, (c + 1) * P, L, R, 'rgb(255,255,255)', context);
        drawNum((r - 1) * P, (c + 1) * P, L, R, gameArr[r - 1][c + 1]);
        statusArr[r - 1][c + 1] = 1;
    }
    if (r < row - 1 && c > 0 && statusArr[r + 1][c - 1] === 0) {
        drawRct((r + 1) * P, (c - 1) * P, L, R, 'rgb(255,255,255)', context);
        drawNum((r + 1) * P, (c - 1) * P, L, R, gameArr[r + 1][c - 1]);
        statusArr[r + 1][c - 1] = 1;
    }
}
//成功找出所有的雷
function gameComplete() {
    var count = new Set(signArr).size;
    if (count != bombArr.length) //雷的数量不对
    {
        return false;
    }
    for (let i of signArr) { //雷的位置不对
        if (!(bombArr.includes(i))) {
            return false;
        }
    }
    for (let i of statusArr) {
        if (i.includes(0)) {
            return false;
        }
    }
    alert('恭喜你成功了');
    canvas.onclick = null;
    canvas.onmouseover = null;
    canvas.oncontextmenu = null;
}


}