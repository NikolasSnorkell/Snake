let row_max = 15;
let col_max = 15;

for (let i = 1; i < row_max + 1; i++) {

  for (let k = 1; k < col_max + 1; k++) {
    $(".container").html($(".container").html() + '<input type="checkbox" class="check ' + i + '_' + k + '" />');
  }


}

let current_row = 7, current_col = 8, way = "none", start = 0, fail = 0, food=0, points=0, data= "", sLength=3, genFood = "";
let dateStart,timing0;
let secondMer, move;
let record_point=0, record_time="0:00:000";

storage();

// setInterval(() => {
  $(window).on("keydown", function(e){
    let codeK = e.keyCode;
 
  
     if(start==0){
       snake();
       secondomer();
       start=1;
       points=0;
       $("#count_points").html(points+" points");
     }
  
     keys(codeK);

   

   })

   $(".arrows_mobile").on("click", function(e){
    let name = e.target.id;
 
    name = name.slice(3,)

   
     if(start==0){
       snake();
       secondomer();
       start=1;
       points=0;
       $("#count_points").html(points+" points");
     }
  
   way=name;

   

   })






function snake() {

  

            move=  setInterval(() => {

           
               
                if(way=="down"){
                  current_row++;
                }
                if(way=="up"){
                  current_row--;
                }
                if(way=="left"){
                  current_col--;
                }
                if(way=="right"){
                  current_col++;
                }

               

                if (current_col > col_max) current_col = 1;
                else if(current_col <1) current_col = col_max;
                if (current_row > row_max) current_row = 1;
                else if(current_row <1) current_row = row_max;


               
                      if(food==0){
                      
                       genFood = generatorFood();
                      
                      }
               
                    eating(genFood);



      
            if($("." + current_row + "_" + current_col).prop("checked")==true){
              fail=1;
            }
         
              
           
              

                if(start!=0) {
                   $("." + current_row + "_" + current_col).prop("checked", true);
                }

                if ($("." + current_row + "_" + current_col).prop("checked") == true&&start!=0) {
              
                    timer("." + current_row + "_" + current_col,sLength+"00");
                }



                if(fail==1){
                  game_over();
                }

  }, 150);




}





  // snake();





function timer(elem,delay){
      $(elem).prop("checked",true);

      let timer_time = setTimeout(() => {
        $(elem).prop("checked",false);
        clearTimeout(timer_time);
      }, delay);
}



function randomize(){

      let x = Math.round(Math.random()*(col_max-1)+1);
      let y = Math.round(Math.random()*(row_max-1)+1);

   return x+"/"+y
}




function eating(elem){
  
    if($(elem).prop("checked") == true){
      $(elem).toggleClass("food");
      food=0;
      points++;
      sLength++;
     $("#count_points").html(points+" points");
    }
}





function generatorFood(){
  for(let i=0;;i++){

    data = randomize();
    data= data.split("/");

    if($("." + data[1] + "_" + data[0]).prop("checked")==true){
      // console.log($("." + data[1] + "_" + data[0]));
      continue
    } else {
      $("." + data[1] + "_" + data[0]).addClass("food");
      food=1;
      return ($("." + data[1] + "_" + data[0]))
     
    }

  }

}

function keys(code){
  switch(code){
    case 40: if(way!="up"){
                  way="down"
                }
                break
    case 38: if(way!="down"){  
                  way="up"
                }
                break
    case 37:  if(way!="right"){ 
                  way="left"
                }
                break
    case 39:  if(way!="left"){ 
                  way="right"
                } 
                break
  }
}




    function secondomer(){

      dateStart = new Date();


      let dateNow, seconds=0,minutes = 0,milliseconds=0;
 
      secondMer = setInterval(function(){
          // dateNow = new Date();
          // minutes = dateNow.getMinutes()-dateStart.getMinutes();
          // seconds = dateNow.getSeconds()-dateStart.getSeconds();
          milliseconds = milliseconds+=1;

          if( milliseconds == 10) {
            milliseconds=0;
            seconds++;
          }
          if(seconds==60) {
            seconds=0;
            minutes++;
          }
        
        
        if(seconds<10)  timing0="0"+minutes+":0"+seconds+":"+milliseconds+"00";
        else timing0="0"+minutes+":"+seconds+":"+milliseconds+"00";

          $("#timing").html(timing0);
         
      },100)


    }

    function game_over(){

      alert("Game over");
      fail=0;
      sLength=3;
      food=0;
      start=0;
    
      current_col=7;
      current_row=8;

      if(points>record_point){
        record_point=points;
        record_time=timing0;

        storage("add");
      }



      $(".check").prop("checked",false);
      $(".check").removeClass("food");
      clearInterval(move);
      clearInterval(secondMer);
    }
    




      function storage(key){
              if(localStorage.getItem('points')==null || key=="add"){
                localStorage.points = record_point;
                localStorage.time = record_time;
              } else {
                record_point =localStorage.getItem('points');
                record_time =localStorage.getItem('time');
              }
              
              $("#record_output").html(record_point+' points <br>during <br>'+record_time);

      }

    //  console.log(localStorage.getItem('time')) 
    //  console.log(localStorage.getItem('points')) 

     
    