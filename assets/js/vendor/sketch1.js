var pallete, canvas;
var sketch = function(){
    
    var getColores = function(){
        var url = "http://www.colourlovers.com/api/palettes/top?format=json";
        
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'jsonp',
            crossDomain: true,
            success: function (data) {
                pallete = data;
                init();
            },
            error: function(err){
                pallete = err;
            }
        });
    }();


    var init = function(){
        canvas = document.getElementById("sketch1");
        var processingInstance = new Processing(canvas, sketchPrimero);
    };

    var  hexToRgb = function (hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };
    
    var sketchPrimero = function(processing){
        var P = processing;
        var inst,
            totalColor,
            randomColor,
            selectColor,
            walkers,
            mode = 1,
            im = 0;
        
        var changeColors = function(){
            totalColor = pallete.length;
            randomColor = Math.round(P.random(0, totalColor));
            selectColor = pallete[randomColor].colors;
            walkers = [];
        };
        
        changeColors();
        
        P.setup = function(){
            var w = $(".wrapper").width();
            P.size(w,(w/2.2));
            var rgbBck = hexToRgb("#"+selectColor[(selectColor.length)-1]);
            P.background(0);
            for (var  i = 0; i < selectColor.length; i++){
                var prev = "#"+selectColor[i];
                var rgbColor = hexToRgb(prev);
                var c = P.color(rgbColor.r, rgbColor.g, rgbColor.b);
                
                walkers.push(new Walker(c));
            }
            
        };
        
        P.draw = function(){
            for (var  i = 0; i < selectColor.length; i++){
                walkers[i].step();
                walkers[i].display();
            }
        };

        //UI
        $("#btnReset").click(function(e){
            e.preventDefault();
            P.setup();
        });

        $("#newColor").click(function(e){
            e.preventDefault();
            changeColors();
            P.setup();
        });

        $("#saveImage").click(function(e){
            this.href = canvas.toDataURL("image/png");
            this.download = "colorWalker_"+im+".png";
            im++;
        });
        
        
        //Class
        function Walker(color){
            this.posX = P.width/2;
            this.posY = P.height/2;
            this.c = color ;
            this.threshold = 50;
            this.opa = 10;
            this.siz = 20;
            
            //Methods
            
            this.display = function(){
                P.strokeWeight(1);
                P.stroke(this.c,this.opa);
                P.noFill();
                P.ellipse(P.constrain(this.posX, 0, P.width), P.constrain(this.posY, 0, P.height), this.siz, this.siz);
                
            };

            this.step = function(){
                var choice = P.random(1);
                
                if(choice<0.01){
                    if(this.posX > (P.width-100)){
                        this.posX -= P.random(0,this.threshold);
                    }else if(this.posY > (P.height-100)){
                        this.posY -= P.random(0,this.threshold);
                    }else if(this.posX < 100){
                        this.posX += P.random(0,this.threshold);
                    }else if(this.posY < 100){
                        this.posY += P.random(0,this.threshold);
                    }else{
                        this.posX += P.random(-20,20);
                        this.posY -= P.random(-20,20);
                    }
                }else{
                    this.posX += P.random(-2,2);
                    this.posY += P.random(-2,2);
                }

            };


        };
    };

};

$(function(){
    sketch();
});
