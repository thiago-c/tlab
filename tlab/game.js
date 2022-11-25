(function() {
  var pontuacao = 0;
  var pontuou = 0;
  const canvas = document.getElementById('playGround');
  const context = canvas.getContext('2d');
  window.addEventListener('resize', resizeCanvas, false);
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //onmousemove = function(e){drawCircle(e.x,e.y)}
    onclick = function(e){drawCircle(e.x,e.y); click(e.x,e.y);}
    drawFase1(1, 1, 0);
  }
  resizeCanvas();
  function playSound(sound){
    var audio = new Audio('/sound/' + sound);
    audio.play();
  }
  function drawCircle(x,y){
    var circle = canvas.getContext('2d');
    if(x < (canvas.width/2) && y < (canvas.height/2)){
      console.log("TOPO/ESQUERDA");
    } else if(x < (canvas.width/2) && y > (canvas.height/2)){
      console.log("BASE/ESQUERDA");
    } else if(x > (canvas.width/2) && y < (canvas.height/2)){
      console.log("TOPO/DIREITA");
    }  else if(x > (canvas.width/2) && y > (canvas.height/2)){
      console.log("BASE/DIREITA");
    }
    circle.fillStyle = "#FF0000";
    circle.beginPath();
    circle.arc(x, y, 10, 0, 2 * Math.PI);
    circle.fill();
  }
  function startFase3(passo){
      onclick = function(e){
        if(e.x < (canvas.width/2) && e.y < (canvas.height/2)){
          console.log("TOPO/ESQUERDA");
          var clickQuad = 1;
          playSound('kick.wav');
        } else if(e.x < (canvas.width/2) && e.y > (canvas.height/2)){
          console.log("BASE/ESQUERDA");
          var clickQuad = 3;
          playSound('snare.wav');
        } else if(e.x > (canvas.width/2) && e.y < (canvas.height/2)){
          console.log("TOPO/DIREITA");
          var clickQuad = 2;
          playSound('openhat.wav');
        }  else if(e.x > (canvas.width/2) && e.y > (canvas.height/2)){
          console.log("BASE/DIREITA");
          var clickQuad = 4;
          playSound('openhat.wav');
        }
        if(clickQuad == passo){
           pontuacao += 10;
        } else {
          pontuacao -= 10;
          e.preventDefault();
          drawCircle(e.x,e.y);
          click(e.x,e.y);
        }
        console.log("Pontuação: " + pontuacao);
      }
  }
  function startFase1(flag){
    if(flag == 0){
      onclick = function(){ if(pontuou == 0){ pontuacao += 10; pontuou = 1;} console.log("Pontuação: " + pontuacao);}
    } else {
      onclick = function(e){ pontuacao -= 10; e.preventDefault();drawCircle(e.x,e.y); click(e.x,e.y);}
      pontuou = 0;
    }
  }
  function drawFaseBonus(){
    var base = canvas.getContext('2d');
    base.clearRect(0, 0, canvas.width, canvas.height);
    base.fillStyle = "rgb(127,255,127)"; base.fillRect(0, 0, (canvas.width/2), (canvas.height/2));
    base.fillStyle = "rgb(255,127,127)"; base.fillRect((canvas.width/2), 0, (canvas.width/2), (canvas.height/2));
    base.fillStyle = "rgb(127,127,255)"; base.fillRect(0, (canvas.height/2), (canvas.width/2), (canvas.height/2));
    base.fillStyle = "rgb(127,127,127)"; base.fillRect((canvas.width/2), (canvas.height/2), (canvas.width/2), (canvas.height/2));
    onclick = function(e){
      if(e.x < (canvas.width/2) && e.y < (canvas.height/2)){
        playSound('kick.wav');
      } else if(e.x < (canvas.width/2) && e.y > (canvas.height/2)){
        playSound('snare.wav');
      } else if(e.x > (canvas.width/2) && e.y < (canvas.height/2)){
        playSound('openhat.wav');
      }  else if(e.x > (canvas.width/2) && e.y > (canvas.height/2)){
        playSound('perc.wav');
      }
    }
  }
  function drawFase3(passo, limite, intervalo = 750){
    console.log(intervalo);
    alert("1, 2, 3...");
    alert("JÁ!!");
    const intervalAnimation = setInterval(function () {
      startFase3(passo);
      var base = canvas.getContext('2d');
      base.clearRect(0, 0, canvas.width, canvas.height);
      base.fillStyle = "rgb(127,255,127)";
      if(passo == 1){ base.fillRect(0, 0, (canvas.width/2), (canvas.height/2));}
      else if(passo == 2){ base.fillRect((canvas.width/2), 0, (canvas.width/2), (canvas.height/2));}
      else if(passo == 3){ base.fillRect(0, (canvas.height/2), (canvas.width/2), (canvas.height/2));}
      else if(passo == 4){ base.fillRect((canvas.width/2), (canvas.height/2), (canvas.width/2), (canvas.height/2));}
      if(passo<4){
        passo++;
      } else {
        passo = 1;
      }
      if(limite < 10000000 && pontuacao < 100){
        limite++;
      } else {
        pontuacao = 0;
        clearInterval(intervalAnimation);
        base.clearRect(0, 0, canvas.width, canvas.height);
        alert("Parabéns, você passou de nível!");
        if(intervalo>=500){
          drawFase3(1, 0, intervalo - 50);
        } else {
          alert("Parabéns, você zerou o jogo!");
          drawFaseBonus();
        }
      }
    }, intervalo);
  }
  function drawFase2(tipo){
    alert("1, 2, 3...");
    alert("JÁ!!");
    if(tipo === 1){
      var min = 1;
      var max = 3;
      var group = 3;
    } else if(tipo === 2){
      var min = 1;
      var max = 7;
      var group = 7;
    }
    var circle = canvas.getContext('2d');
    var base = canvas.getContext('2d');
    circle.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 1; i <= group; i++) {
      var color = Math.floor(128/group) * i;
      var color_rgb = "rgb("+(color+70)+","+color+","+color+")";
      circle.fillStyle = color_rgb;
      circle.beginPath();
      circle.arc(((canvas.width/group)*i)-(canvas.width/group)/2, canvas.height/2, 60, 0, 2 * Math.PI);
      circle.fill();
    }
    base.fillStyle = "rgb(127,255,127)";
    base.fillRect(canvas.width-100, 60, 40, 40);
    var som = (Math.floor(Math.random() * max) + min);
    playSound(som + '_' +max + '.wav');
    console.log('Som selecionado: ' + som);
    onclick = function(e){
      if((e.x > (canvas.width-100)) && (e.x < (canvas.width-100)+40) && (e.y > 60) && (e.y < 100)){
        playSound(som + '_' + max + '.wav');
        console.log('Toca Som Novamente');
      } else{
        console.log('Área jogável');
        if((e.x < ((canvas.width/group)*som)) && (e.x > ((canvas.width/group)*(som-1)))){
          playSound(som + '_' + max + '.wav');
          if(pontuacao < 100){
            pontuacao+=10;
            console.log("Pontuação: " + pontuacao);
            drawFase2(tipo);
          }else{
            pontuacao = 0;
            alert("Parabéns, você passou para o próximo módulo!");
            if(tipo === 2){
              drawFase3(1, 0);
            } else{
              drawFase2(tipo+1);
            }
          }
          var som_errado = Math.round((canvas.width/group)/e.x-som);
          console.log(som_errado);
        } else {
          var som_errado = Math.round((e.x/(canvas.width/group))+0.5);
          playSound(som_errado + '_' + max + '.wav');
        }
      }
      console.log("Pontuação: " + pontuacao);
    }
  }
  function drawFase1(passo, flag, limite, intervalo = 500){
    console.log(intervalo);
    alert("1, 2, 3...");
    alert("JÁ!!");
    const intervalAnimation = setInterval(function () {
      startFase1(flag);
      var base = canvas.getContext('2d');
      base.clearRect(0, 0, canvas.width, canvas.height);
      var x = (((canvas.width/19)*passo)+((canvas.width/19)/2))
      var y = ((canvas.height-20)-(100*flag));
      var circle = canvas.getContext('2d');
      if(passo%2 !== 1){
        playSound('hihat.wav');
        base.fillStyle = "rgb(127,255,127)";
      } else {
        playSound('perc.wav');
        base.fillStyle = "rgb(255,127,127)";
      }
      base.fillRect(((canvas.width/19))*passo, (canvas.height-20), (canvas.width/19), 20);
      circle.fillStyle = "rgb(127,127,127)";
      circle.beginPath();
      circle.arc(x, y, 10, 0, 2 * Math.PI);
      circle.fill();
      if(passo<16){
        passo++;
      } else {
        passo = 1;
      }
      if(flag == 0){
        flag = 1;
      } else {
        flag = 0;
      }
      if(limite < 10000000 && pontuacao < 100){
        limite++;
      } else {
        pontuacao = 0;
        clearInterval(intervalAnimation);
        base.clearRect(0, 0, canvas.width, canvas.height);
        alert("Parabéns, você passou de nível!");
        if(intervalo>=250){
          drawFase1(1, 1, 0, intervalo - 50);
        } else {
          alert("Parabéns, você passou para o próximo módulo!");
          drawFase2(1);
        }
      }
    }, intervalo);
  }
  function click(x,y) {
    if(x < (canvas.width/2) && y < (canvas.height/2)){
      console.log("TOPO/ESQUERDA");
    } else if(x < (canvas.width/2) && y > (canvas.height/2)){
      console.log("BASE/ESQUERDA");
    } else if(x > (canvas.width/2) && y < (canvas.height/2)){
      console.log("TOPO/DIREITA");
    }  else if(x > (canvas.width/2) && y > (canvas.height/2)){
      console.log("BASE/DIREITA");
    }
  }
})();
