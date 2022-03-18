

    let backaudio = document.getElementById("back_sound");
    backaudio.volume = 0.5;







let row_max = 15;
let col_max = 15;

for (let i = 1; i < row_max + 1; i++) {

  for (let k = 1; k < col_max + 1; k++) {
    $(".container").html($(".container").html() + '<input type="checkbox" class="check ' + i + '_' + k + '" />');
  }


}

let current_row = 7, // current position vertical
 current_col = 8, // current position horisontal
  way = "none", // way of moving
   start = 0, // flag for key press, is this press first
    fail = 0, // flag of game over
     food=0, // flag does the food stay on the field
      points=0, // game points
       data= "", // randomized coords
       sLength=5, // length of the snake
        genFood = "", // appearred food coords
        speed = 25; // speed of the snake
        
let timing0; // output string for timer
let secondMer, move; // intervals
let record_point=0, record_time="0:00:000";


let game_over_sound = new Audio('sounds/game_over.mp3');
let eating_sound = new Audio('sounds/eating.wav');
let new_record = new Audio('sounds/new_record.mp3');





$(".image_volume").click(function(){

  if($(this).attr("src")=="images/sound_on.png") {
     $(this).attr("src","images/sound_off.png");
     backaudio.volume = 0;
      // if(this.id=="image_music"){
      //   audio.volume = 0;
      // }

  } else {
    $(this).attr("src","images/sound_on.png");
    backaudio.volume = 0.5;
  }




})






// loading record data from local storage

storage();

// key press bindings
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

// mobile control arrows binding

   $(".arrows_mobile").on("click", function(e){
                let name = e.target.id;
            
                name = name.slice(3,)
            console.log(name);
              
                if(start==0){
                  snake();
                  secondomer();
                  start=1;
                  points=0;
                  $("#count_points").html(points+" points");
                }
              
                keys(+name);

   

   })




//starting function

function snake() {

            move=  setInterval(main_func, speed+"0");

}


//main function of the game

    function main_func(){
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

      if ($("." + current_row + "_" + current_col).prop("checked") == true && start!=0) {
    
          timer("." + current_row + "_" + current_col,sLength+"00");
      }


        // game over
      if(fail==1){
        game_over();
      }
    }



  



    // timer for fade of snake's tail

function timer(elem,delay){
      $(elem).prop("checked",true);

      let timer_time = setTimeout(() => {
        $(elem).prop("checked",false);
        clearTimeout(timer_time);
      }, delay);
}

// generator random coords on the field

function randomize(){

            let x = Math.round(Math.random()*(col_max-1)+1);
            let y = Math.round(Math.random()*(row_max-1)+1);

        return x+"/"+y
}


  // function check does food was eaten

function eating(elem){
  
          if($(elem).prop("checked") == true){
            eating_sound.play();

            $(elem).toggleClass("food");
            food=0;
            points++;
            sLength++;
          $("#count_points").html(points+" points");


            if((points%10==0 && points !=0)&&speed>14){
              clearInterval(move);

              speed-=2;
             

              move=  setInterval(main_func, speed+"0");
             
            }


          }
}



  // generator for new food

function generatorFood(){
          for(let i=0;;i++){

            data = randomize();
            data= data.split("/");

            if($("." + data[1] + "_" + data[0]).prop("checked")==true){
            
              continue
            } else {
              $("." + data[1] + "_" + data[0]).addClass("food");
              food=1;
              return ($("." + data[1] + "_" + data[0]))
            
            }

          }

}

// translation keys pressed to a way moving

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


// overall timer

    function secondomer(){

            


                let seconds=0,minutes = 0,milliseconds=0;
          
                secondMer = setInterval(function(){

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


    // game over func

    function game_over(){

      game_over_sound.play();

              alert("Game over");
              fail=0;
              sLength=3;
              food=0;
              start=0;
              speed = 25;
            
              current_col=7;
              current_row=8;

              if(points>record_point){
                record_point=points;
                record_time=timing0;

                storage("add");

                new_record.play();
      }



      $(".check").prop("checked",false);
      $(".check").removeClass("food");
      clearInterval(move);
      clearInterval(secondMer);
    }
    


      // loading and writing record data

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

   

     
    