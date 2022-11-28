function drawGraph() {
    let pointArray= [["01/10/2022",10],["02/10/2022",20],["03/10/2022",60],["04/10/2022",154],["05/10/2022",189],["06/10/2022",478],["07/10/2022",15],["08/10/2022",25],["09/10/2022",29],["10/10/2022",38],["11/10/2022",1],["12/10/2022",64],["13/10/2022",10],["14/10/2022",20],["15/10/2022",60],["16/10/2022",154],["17/10/2022",189],["17/10/2022",478],["18/10/2022",15],["19/10/2022",25],["20/10/2022",29],["21/10/2022",38],["22/10/2022",1],["23/10/2022",64]];
    let maxElement=MaxElementArray(pointArray)
    let maxRoundElement=MaxRoundElemet(maxElement)
    let canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        let ctx = canvas.getContext("2d");

        let widthGraph=1600;
        let mesX=40; //Отступ слева для подписей по оси Х
        let mesY=35;
        let stepХ=StepX(widthGraph-mesX, pointArray); //шаг между точками по Х
        let stepY=1000/maxRoundElement/2; //шаг между точками по Y
        ctx.lineWidth = 1;
        console.log(maxRoundElement,stepХ)
        ctx.beginPath();
        ctx.font = "10px Times New Roman";

        //пунктирная линия горизонтальные
        ctx.strokeStyle = "#736E6EFF";
        ctx.setLineDash([3, 10]);
        ctx.moveTo(0+mesX,maxRoundElement/10*stepY+mesY);
        ctx.lineTo(widthGraph,maxRoundElement/10*stepY+mesY);
        ctx.moveTo(0+mesX,maxRoundElement/4*stepY+mesY);
        ctx.lineTo(widthGraph,maxRoundElement/4*stepY+mesY);
        ctx.moveTo(0+mesX,maxRoundElement/2*stepY+mesY);
        ctx.lineTo(widthGraph,maxRoundElement/2*stepY+mesY);
        ctx.moveTo(0+mesX,maxRoundElement/4*3*stepY+mesY);
        ctx.lineTo(widthGraph,maxRoundElement/4*3*stepY+mesY);


        //Вертикальные пунктиры, через 1 точку
        for (let i = 2; i <pointArray.length ; i+=2) {
            ctx.moveTo(stepХ*i+mesX,0);
            ctx.lineTo(stepХ*i+mesX,maxRoundElement*stepY+mesY);
        }
        ctx.stroke();

        ctx.beginPath();
        ctx.setLineDash([]);

        //Координатная сетка
        ctx.strokeStyle = "#000000";
        ctx.moveTo(0+mesX,0+mesY);
        ctx.lineTo(0+mesX,maxRoundElement*stepY+mesY);
        ctx.lineTo(widthGraph,maxRoundElement*stepY+mesY);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = "#480303FF";


        //линии графика
        for (let i=0; i<pointArray.length; i++){
            if (i==0){
                ctx.moveTo(mesX,pointArray[i][1]*stepY+mesY);
            }
            ctx.lineTo(stepХ*i+mesX,pointArray[i][1]*stepY+mesY);
        }

        //подписи на осях
        //Y
        ctx.fillStyle = "#736E6EFF";
        ctx.fillText("1", 0, 1*stepY+mesY);
        ctx.fillText((maxRoundElement/10).toString() , 0, maxRoundElement/10*stepY+mesY);
        ctx.fillText((maxRoundElement/4).toString(), 0, maxRoundElement/4*stepY+mesY);
        ctx.fillText((maxRoundElement/2).toString(), 0, maxRoundElement/2*stepY+mesY);
        ctx.fillText((maxRoundElement/4*3).toString(), 0, maxRoundElement/4*3*stepY+mesY);
        ctx.fillText((maxRoundElement).toString(), 0, maxRoundElement*stepY+mesY);
        //X
        for (let i = 0; i <pointArray.length ; i++) {

        }

        //подписи графика
        ctx.fillStyle = "#295A29FF";
        ctx.font = "20px Times New Roman";
        let toUptoDown=20 //Отступ от точки для подписи значения
        for (let i = 0; i < pointArray.length; i++) {
            if (i!=0) {
                if (pointArray[i][1]>pointArray[i-1][1]){
                    ctx.fillStyle = "#ff0000";
                    toUptoDown=Math.abs(toUptoDown)
                } else {
                    ctx.fillStyle = "#295A29FF";
                    toUptoDown=-toUptoDown
                }
            }
            ctx.fillText(pointArray[i][1].toString(), stepХ*i-5+mesX, pointArray[i][1]*stepY+toUptoDown+mesY);
        }

        //Подписи ось Х
        ctx.fillStyle = "#736E6EFF";
        ctx.font = "10px Times New Roman";
        toUptoDown=0 //Отступ от точки для подписи значения
        let textX
        for (let i = 0; i < pointArray.length; i++) {
            if (i == 0 || i == pointArray.length - 1) {
                textX=pointArray[i][0].toString();
                toUptoDown=20
            } else {
                textX=pointArray[i][0].toString().substring(0,5);
                toUptoDown=10
            }
            ctx.fillText(textX, stepХ * i - toUptoDown + mesX, maxRoundElement + mesY + 30);
        }


        // узлы
        for (let i = 0; i <pointArray.length ; i++) {
            ctx.moveTo(stepХ*i+4+mesX,pointArray[i][1]*stepY+mesY);
            ctx.arc(stepХ*i+mesX,pointArray[i][1]*stepY+mesY,4,0,Math.PI*2,true);
        }

        ctx.stroke();

    }
}
function MaxElementArray(array) {
    let max=[-1,0];
    if (array.length>0){
         max=array[0,0];
         for (let i = 0; i < array.length; i++) {
             if (max[1]<array[i][1]) {
                 max= [i, array[i][1]];
             }
         }
    }
    return max;
}
function MaxRoundElemet(maxElement) {
    return maxElement[1]-maxElement[1]%100+100;
}
function StepX(width, array) {
    return Math.max(width/(array.length-1),20)
}