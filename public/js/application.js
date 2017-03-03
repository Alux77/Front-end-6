$(document).ready(function() {
  $('#strt').on("click", function(){
    restart();
  });

// -----------------------------------------variables
  var num=3;
  var option;
  var p1_turn;
  var p2_turn;
  var end=0;

// -----------------------------------------game start
  function restart(){
    if (num == 0){
      $("#count").text("¡GOOOO!");
      $('#strt').text('AGAIN?');
      credit1();
      credit2();
    }
    else
    {
      $("#count").text(num);
      num--;
      setTimeout(restart, 1000);
    };
  };

// -----------------------------------------player 1 turn
  function credit1(){
    td = $('#P1').find('td.active')
    if (td.is('#p1_61')) {
      end++;
      result();
    }
    else
    {
      $(td).removeClass('active');
      $(td).next().addClass('active');
      p1_turn = setTimeout(credit1, 23);
    }
  };

// -----------------------------------------player 2 turn
  function credit2(){
    td = $('#P2').find('td.active')
    if (td.is('#p2_61')) {
      end++;
      result();
    }
    else
    {
      $(td).removeClass('active');
      $(td).next().addClass('active');
      p2_turn = setTimeout(credit2, 23);
    }
  };

// -----------------------------------------keypress
  // $(document).keypress(function(a){
  //   if (a.which == 65){
  //     clearTimeout(p1_turn);
  //     option = 2;
  //     result();
  //   }
  //   if (a.which == 76){
  //     clearTimeout(p2_turn);
  //     option = 2;
  //     result();
  //   }
  // });
  var stop = function(event){
  var value = event.keyCode;
  if(value == 37) {
    value1 = true;
  }
  if(value == 39) {
    value2 = true;
  }
}


// -----------------------------------------result
  function result(){
    p1_loc = parseInt($('#P1').find('td.active').attr('id').slice(3));
    p3_loc = parseInt($('#P2').find('td.active').attr('id').slice(3));

    if (p1_loc == 61 && p2_loc == 61) {
      $("#score").text("LOOOOSERS - NO WINNER");
      $.post( '/stats', "data=0");
    };

// -----------------------------------------players status
    if (end == 2) {
      if (p1_loc == p2_loc) {
        $("#score").text("LOOOOOSERS - TIE!");
        $('#form_stats').append(form_stats(0));
      } else if (Math.abs(50 - p1_loc) > Math.abs(50 - p2_loc)) {
        $("#score").text("REDGHOST WIIIINS!!");
        $('#P2').addClass('active');
        $('#form_stats').append(form_stats(2));
      } else {
        $("#score").text("PACMAN WIIIINS!!");
        $('#P1').addClass('active');
        $('#form_stats').append(form_stats(1));
      };
    };
  };
});


function form_stats(data){
  var game_id = $('.game_id').attr('id');
  return '<form action="/stats" method="post"><input type="hidden" name="data" value="' + data + '"><input type="hidden" name="game_id" value="' + game_id + '"><input type="submit" value="Ver resultados"></form>';
}