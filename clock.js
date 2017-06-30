/**
 * Created by i on 2017/6/18.
 */
var dom=document.getElementById('clock');
var ctx=dom.getContext('2d');
var width=ctx.canvas.width;
var height=ctx.canvas.height;
var r=width/2;
var rem=width/200;

function drawCircle() {
    ctx.save();
    ctx.translate(r,r);//将正方形的原点从左上角的（0,0）转移到正方形的中心（r,r）
    ctx.beginPath();//开始一条路径
    ctx.lineWidth=10*rem;
    ctx.arc(0,0,r-ctx.lineWidth/2,0,2*Math.PI,false);//此时的圆的中心已经被我们修改为了原点（0,0）,false表示顺时针画圆，true表示逆时针
    ctx.stroke();//我们之前所做的工作仅仅只是绘制了一条路径，并没有在路径上进行绘制或者填充，此时可以使用stroke进行绘制或fill进行填充
    var hourNums=[3,4,5,6,7,8,9,10,11,12,1,2];
    ctx.font=18*rem+"px Arial";
    ctx.textAlign='center';
    ctx.textBaseline='middle';
    hourNums.forEach(function (num, i) {
        var rad=2*Math.PI/12*i;//3对应的是角度的起始点，然后顺时针转动，每个数字之间相隔30度，即π/6
        var x=Math.cos(rad)*(r-30*rem);
        var y=Math.sin(rad)*(r-30*rem);
        ctx.fillText(num,x,y);
    })
    for(var i=0; i< 60; i++)//60个点，要遍历60次
    {
        var rad=2*Math.PI/60*i;
        var x=Math.cos(rad)*(r-18*rem);
        var y=Math.sin(rad)*(r-18*rem);
        ctx.beginPath();
        if(i % 5===0)
        {
            ctx.fillStyle='#000' +
                '';
            ctx.arc(x,y,2,0,2*Math.PI,false);
        }
        else
        {
            ctx.fillStyle='#ccc';
            ctx.arc(x,y,2,0,2*Math.PI,false);
        }

        ctx.fill();
    }
}
function drawHourHand(hour,min) {
    ctx.save();//save表示保存该画布状态，restore表示返回之前的画布状态，相当于恢复出厂设置，否则之后设置分针时旋转rotate的状态是跟设置hour时的状态是一样的
    ctx.beginPath();
    var rad=2*Math.PI/12*hour;
    var mrad=2*Math.PI/12/60*min;//当时针转到两个整点之间时所要考虑的角度
    ctx.rotate(rad+mrad);
    ctx.lineCap="round";
    ctx.lineWidth=6*rem;
    ctx.moveTo(0,10*rem);
    ctx.lineTo(0,-r/2);
    ctx.stroke();
    ctx.restore();
}
function drawMinHand(min) {
    ctx.save();
    ctx.beginPath();
    var rad=2*Math.PI/60*min;
    ctx.rotate(rad);
    ctx.lineCap="round";
    ctx.lineWidth=3*rem;
    ctx.moveTo(0,10*rem);
    ctx.lineTo(0,-r+30*rem);
    ctx.stroke();
    ctx.restore();
}
function drawSecHand(sec) {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle="#ffA0ff";
    var rad=2*Math.PI/60*sec;
    ctx.rotate(rad);
    ctx.moveTo(-2,20);
    ctx.lineTo(2,20);
    ctx.lineTo(1,-r+18);
    ctx.lineTo(-1,-r+18);//实际上画出了一个梯形
    ctx.fill();
    ctx.restore();
}
function drawDot() {
    ctx.beginPath();
    ctx.fillStyle="#fff";
    ctx.arc(0,0,2,0,2*Math.PI,false);
    ctx.fill();

}



function runClock()
{
    ctx.clearRect(0,0,width,height);
    var time=new Date();
    var hour=time.getHours();
    var min=time.getMinutes();
    var sec=time.getSeconds();
    drawCircle();
    drawHourHand(hour,min);
    drawMinHand(min);
    drawSecHand(sec);
    drawDot();
    ctx.restore();
}
runClock();
setInterval(runClock,1000);