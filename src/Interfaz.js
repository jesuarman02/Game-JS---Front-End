import Swal from "sweetalert2";
import Game from "./Game.js";

let btn_player1 = document.getElementById("btn_player1");
let btn_player2 = document.getElementById("btn_player2");
let player1,
  player2,
  pj1 = "",
  pj2 = "",
  aceptar = 0;
const iniciar_player1 = () => {
  document.getElementById("player1").classList.add("d-none");
  aceptar++;
  if (aceptar == 2) {
    document.getElementById("iniciar_juego").classList.remove("d-none");
    let timerInterval;
    Swal.fire({
      title: "INICIAR COMABTE",
      html: "EN <b>3</b> segundos",
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        let timeLeft = Swal.getTimerLeft();
        let secondsLeft = Math.floor(timeLeft / 1000);
        timer.textContent = secondsLeft;

        timerInterval = setInterval(() => {
          timeLeft = Swal.getTimerLeft();
          secondsLeft = Math.floor(timeLeft / 1000);
          if (timer) {
            timer.textContent = secondsLeft;
          }
        }, 1000);
      },
      willClose: () => {
        clearInterval(timerInterval);
        Swal.fire({
          title: "Inicia el Jugador 1",
          text: "El Jugador 2 no podrá hacer nada hasta que el Jugador 1 haga un movimiento.",
          icon: "success",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      },
    });
  }
};
const iniciar_player2 = () => {
  document.getElementById("player2").classList.add("d-none");
  aceptar++;
  if (aceptar == 2) {
    document.getElementById("iniciar_juego").classList.remove("d-none");
    let timerInterval;
    Swal.fire({
      title: "INICIAR COMABTE",
      html: "EN <b>3</b> segundos",
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        let timeLeft = Swal.getTimerLeft();
        let secondsLeft = Math.floor(timeLeft / 1000);
        timer.textContent = secondsLeft;

        timerInterval = setInterval(() => {
          timeLeft = Swal.getTimerLeft();
          secondsLeft = Math.floor(timeLeft / 1000);
          if (timer) {
            timer.textContent = secondsLeft;
          }
        }, 1000);
      },
      willClose: () => {
        clearInterval(timerInterval);
        Swal.fire({
          title: "Inicia el Jugador 1",
          text: "El Jugador 2 no podrá hacer nada hasta que el Jugador 1 haga un movimiento.",
          icon: "success",
          timer: 1000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      },
    });
  }
};
let seleccion1 = document.getElementById("player1_seleccion");
seleccion1.addEventListener("click", (event) => {
  pj1 = event.target.alt == undefined ? "" : event.target.alt;

  seleccion1.querySelectorAll("img").forEach((temp_img) => {
    temp_img.classList.remove("btn-warning");
    temp_img.classList.add("btn-danger");
  });
  event.target.classList.remove("btn-danger");
  event.target.classList.add("btn-warning");
});
let seleccion2 = document.getElementById("player2_seleccion");
seleccion2.addEventListener("click", (event) => {
  pj2 = event.target.alt == undefined ? "" : event.target.alt;

  seleccion2.querySelectorAll("img").forEach((temp_img) => {
    temp_img.classList.remove("btn-warning");
    temp_img.classList.add("btn-danger");
  });
  event.target.classList.remove("btn-danger");
  event.target.classList.add("btn-warning");
});

btn_player1.addEventListener("click", () => {
  let user_name1 = document.getElementById("user_name1").value;
  if (user_name1 == "") {
    Swal.fire({
      title: "Advertencia Jugador 1",
      text: "Ingresa el nombre de tu jugador y/o Selecciona tu personaje",
      icon: "warning",
    });
  } else {
    player1 = new Game(user_name1);
    if (pj1 == "") {
      Swal.fire({
        title: "Advertencia Jugador 1",
        text: "Ingresa el nombre de tu jugador y/o Selecciona tu personaje",
        icon: "warning",
      });
    } else {
      document.getElementById("p1").innerText = user_name1.toUpperCase();
      document.getElementById("avatar1").src = `./public/img/${pj1}/base.png`;
      iniciar_player1();
    }
  }
});
btn_player2.addEventListener("click", () => {
  let user_name2 = document.getElementById("user_name2").value;
  if (user_name2 == "") {
    Swal.fire({
      title: "Advertencia Jugador 2",
      text: "Ingresa el nombre de tu jugador y/o Selecciona tu personaje",
      icon: "warning",
    });
  } else {
    player2 = new Game(user_name2);
    if (pj2 == "") {
      Swal.fire({
        title: "Advertencia Jugador 2",
        text: "Ingresa el nombre de tu jugador y/o Selecciona tu personaje",
        icon: "warning",
      });
    } else {
      document.getElementById("p2").innerText = user_name2.toUpperCase();
      document.getElementById("avatar2").src = `./public/img/${pj2}/base.png`;
      iniciar_player2();
    }
  }
});


let turnoJugador1 = true;

document.getElementById("btn_atk_py1").addEventListener("click", () => {

  if (!turnoJugador1) {
    return;
  }

  if (player2.getVida() <= 0) {
    Swal.fire({
      title: "¡K.O.!",
      text: "El Jugador 2 ha sido derrotado. No puedes seguir atacando.",
      icon: "error",
      backdrop: `rgba(255, 0, 0, 0.5)`,
    });
    return;
  }

  if (player1.getEnergia() <= 0) {
    Swal.fire({
      title: "¡Energía Agotada!",
      text: "No puedes atacar, recarga tu energía.",
      icon: "error",
      backdrop: `rgba(255, 215, 0, 0.5)`,
    });
    return;
  }

  if (player1.getKi() <= 0) {
    Swal.fire({
      title: "¡Ki Agotado!",
      text: "No puedes atacar, tu ki se ha agotado.",
      icon: "error",
      backdrop: `rgba(255, 215, 0, 0.5)`,
    });
    return;
  }

  player1.atk_basico(player2);
  let porcentaje = parseInt((parseInt(player1.getKi()) * 100) / 80);
  document.getElementById("ki_py1").style.width = `${porcentaje}%`;
  document.getElementById("ki_py1").innerText = `${porcentaje}%`;

  porcentaje = parseInt((parseInt(player1.getEnergia()) * 100) / 90);
  document.getElementById("energia_py1").style.width = `${porcentaje}%`;
  document.getElementById("energia_py1").innerText = `${porcentaje}%`;

  porcentaje = parseInt((parseInt(player2.getVida()) * 100) / 100);
  porcentaje = porcentaje < 0 ? 0 : porcentaje;
  document.getElementById("vida_py2").style.width = `${porcentaje}%`;
  document.getElementById("vida_py2").innerText = `${porcentaje}%`;

  Swal.fire({
    title: "Ki no Tsurugi",
    text: "AHHHH! GOKUUUUUUUUUU",
    width: 600,
    color: "#ffffff",
    background: "linear-gradient(135deg, #FFD700, #FFA500, #FF4500)",
    imageUrl: `./public/img/${pj1}/basico.png`,
    imageWidth: 300,
    imageHeight: 300,
    imageAlt: "Ataque básico",
    backdrop: `rgba(255, 215, 0, 0.5)`,
  });

  turnoJugador1 = false;
  document.getElementById("btn_atk_py1").disabled = true;
  document.getElementById("btn_esp_py1").disabled = true;
  document.getElementById("btn_ermi_py1").disabled = true;
  document.getElementById("btn_ki_py1").disabled = true;

  document.getElementById("btn_atk_py2").disabled = false;
  document.getElementById("btn_esp_py2").disabled = false;
  document.getElementById("btn_ermi_py2").disabled = false;
  document.getElementById("btn_ki_py2").disabled = false;

});

document.getElementById("btn_esp_py1").addEventListener("click", () => {

  if (!turnoJugador1) {
    return;
  }

  if (player2.getVida() <= 0) {
    Swal.fire({
      title: "¡K.O.!",
      text: "El Jugador 2 ha sido derrotado. No puedes seguir atacando.",
      icon: "error",
      backdrop: `rgba(255, 0, 0, 0.5)`,
    });
    return;
  }

  if (player1.getEnergia() <= 0) {
    Swal.fire({
      title: "¡Energía Agotada!",
      text: "No puedes atacar, recarga tu energía.",
      icon: "error",
      backdrop: `rgba(255, 215, 0, 0.5)`,
    });
    return;
  }

  if (player1.getKi() <= 0) {
    Swal.fire({
      title: "¡Ki Agotado!",
      text: "No puedes atacar, tu ki se ha agotado.",
      icon: "error",
      backdrop: `rgba(255, 215, 0, 0.5)`,
    });
    return;
  }

  player1.atk_especial(player2);
  let porcentaje = parseInt((parseInt(player1.getKi()) * 100) / 80);
  document.getElementById("ki_py1").style.width = `${porcentaje}%`;
  document.getElementById("ki_py1").innerText = `${porcentaje}%`;

  porcentaje = parseInt((parseInt(player1.getEnergia()) * 100) / 90);
  document.getElementById("energia_py1").style.width = `${porcentaje}%`;
  document.getElementById("energia_py1").innerText = `${porcentaje}%`;

  porcentaje = parseInt((parseInt(player2.getVida()) * 100) / 100);
  porcentaje = porcentaje < 0 ? 0 : porcentaje;
  document.getElementById("vida_py2").style.width = `${porcentaje}%`;
  document.getElementById("vida_py2").innerText = `${porcentaje}%`;

  Swal.fire({
    title: "Ataque del Big Bang",
    text: "¡Golpe definitivo!",
    width: 600,
    color: "#ffffff",
    background: "linear-gradient(135deg, #FFD700, #FFA500, #FF4500)",
    imageUrl: `./public/img/${pj1}/especial.png`,
    imageWidth: 300,
    imageHeight: 300,
    imageAlt: "Ataque especial",
    backdrop: `rgba(255, 215, 0, 0.5)`,
  });
  turnoJugador1 = false;
  document.getElementById("btn_atk_py1").disabled = true;
  document.getElementById("btn_esp_py1").disabled = true;
  document.getElementById("btn_ermi_py1").disabled = true;
  document.getElementById("btn_ki_py1").disabled = true;

  document.getElementById("btn_atk_py2").disabled = false;
  document.getElementById("btn_esp_py2").disabled = false;
  document.getElementById("btn_ermi_py2").disabled = false;
  document.getElementById("btn_ki_py2").disabled = false;
});

document.getElementById("btn_ermi_py1").addEventListener("click", () => {

  if (!turnoJugador1) {
    return;
  }

  player1.semilla_ermi();

  let vida_actual = player1.getVida();
  let porcentaje = parseInt((vida_actual * 100) / 100);
  document.getElementById("vida_py1").style.width = `${porcentaje}%`;
  document.getElementById("vida_py1").innerText = `${porcentaje}%`;

  let ki_actual = player1.getKi();
  porcentaje = parseInt((ki_actual * 100) / 80);
  document.getElementById("ki_py1").style.width = `${porcentaje}%`;
  document.getElementById("ki_py1").innerText = `${porcentaje}%`;

  let energia_actual = player1.getEnergia();
  porcentaje = parseInt((energia_actual * 100) / 90);
  document.getElementById("energia_py1").style.width = `${porcentaje}%`;
  document.getElementById("energia_py1").innerText = `${porcentaje}%`;

  let semillas_actuales = player1.getSemilla();
  semillas_actuales = semillas_actuales < 0 ? 0 : semillas_actuales;
  document.getElementById("semillas_py1").innerText = `${semillas_actuales}`;

  Swal.fire({
    title: "Semilla del Ermitaño",
    text: "¡Tu energía ha sido restaurada!",
    width: 600,
    color: "#ffffff",
    background: "linear-gradient(135deg, #32CD32, #008000, #004d00)",
    imageUrl: `./public/img/${pj1}/curar.png`,
    imageWidth: 300,
    imageHeight: 300,
    imageAlt: "Recuperación con semilla del ermitaño",
    backdrop: `rgba(50, 205, 50, 0.5)`,
  });

  if (player1.getSemilla() <= 0) {
    Swal.fire({
      title: "¡Semillas Agotadas!",
      text: "Has agotado todas tus semillas del ermitaño.",
      icon: "error",
      backdrop: `rgba(50, 205, 50, 0.5)`,
    });
    document.getElementById("btn_ermi_py1").disabled = true;
  }
  turnoJugador1 = false;
  document.getElementById("btn_atk_py1").disabled = true;
  document.getElementById("btn_esp_py1").disabled = true;
  document.getElementById("btn_ermi_py1").disabled = true;
  document.getElementById("btn_ki_py1").disabled = true;

  document.getElementById("btn_atk_py2").disabled = false;
  document.getElementById("btn_esp_py2").disabled = false;
  document.getElementById("btn_ermi_py2").disabled = false;
  document.getElementById("btn_ki_py2").disabled = false;
});

document.getElementById("btn_ki_py1").addEventListener("click", () => {
  if (!turnoJugador1) {
    return; 
  }
  if (player1.getKi() >= 80) {
    Swal.fire({
      title: "¡Ki al Máximo!",
      text: "Tu ki ya está al 100%, no puedes cargar más. Es momento de Atacar!!",
      icon: "warning",
      backdrop: `rgba(255, 215, 0, 0.5)`,
    });
    return;
  }
  player1.aumentar_ki();
  let porcentaje = parseInt((parseInt(player1.getKi()) * 100) / 80);
  document.getElementById("ki_py1").style.width = `${porcentaje}%`;
  document.getElementById("ki_py1").innerText = `${porcentaje}%`;
  Swal.fire({
    title: "Kaiokeeen",
    text: "Kaiokeeeeeeeeeeeeeeeeeeeeen",
    width: 600,
    color: "#ffffff",
    background: "linear-gradient(135deg, #FFD700, #FFA500, #FF4500)",
    imageUrl: `./public/img/${pj1}/energia.png`,
    imageWidth: 300,
    imageHeight: 300,
    imageAlt: "Ataque especial",
    backdrop: `rgba(255, 215, 0, 0.5)`,
  });
  turnoJugador1 = false;
  document.getElementById("btn_atk_py1").disabled = true;
  document.getElementById("btn_esp_py1").disabled = true;
  document.getElementById("btn_ermi_py1").disabled = true;
  document.getElementById("btn_ki_py1").disabled = true;

  document.getElementById("btn_atk_py2").disabled = false;
  document.getElementById("btn_esp_py2").disabled = false;
  document.getElementById("btn_ermi_py2").disabled = false;
  document.getElementById("btn_ki_py2").disabled = false;
});

document.getElementById("btn_atk_py2").addEventListener("click", () => {

  if (turnoJugador1) {
    return; 
  }
  if (player1.getVida() <= 0) {
    Swal.fire({
      title: "¡K.O.!",
      text: "El Jugador 2 ha sido derrotado. No puedes seguir atacando.",
      icon: "error",
      backdrop: `rgba(255, 0, 0, 0.5)`,
    });
    return;
  }

  if (player2.getEnergia() <= 0) {
    Swal.fire({
      title: "¡Energía Agotada!",
      text: "No puedes atacar, recarga tu energía.",
      icon: "error",
      backdrop: `rgba(255, 215, 0, 0.5)`,
    });
    return;
  }

  if (player2.getKi() <= 0) {
    Swal.fire({
      title: "¡Ki Agotado!",
      text: "No puedes atacar, tu ki se ha agotado.",
      icon: "error",
      backdrop: `rgba(255, 215, 0, 0.5)`,
    });
    return;
  }

  player2.atk_basico(player1);
  let porcentaje = parseInt((parseInt(player2.getKi()) * 100) / 80);
  document.getElementById("ki_py2").style.width = `${porcentaje}%`;
  document.getElementById("ki_py2").innerText = `${porcentaje}%`;

  porcentaje = parseInt((parseInt(player2.getEnergia()) * 100) / 90);
  document.getElementById("energia_py2").style.width = `${porcentaje}%`;
  document.getElementById("energia_py2").innerText = `${porcentaje}%`;

  porcentaje = parseInt((parseInt(player1.getVida()) * 100) / 100);
  porcentaje = porcentaje < 0 ? 0 : porcentaje;
  document.getElementById("vida_py1").style.width = `${porcentaje}%`;
  document.getElementById("vida_py1").innerText = `${porcentaje}%`;

  Swal.fire({
    title: "Ki no Tsurugi",
    text: "AHHHH! GOKUUUUUUUUUU",
    width: 600,
    color: "#ffffff",
    background: "linear-gradient(135deg, #FFD700, #FFA500, #FF4500)",
    imageUrl: `./public/img/${pj2}/basico.png`,
    imageWidth: 300,
    imageHeight: 300,
    imageAlt: "Ataque básico",
    backdrop: `rgba(255, 215, 0, 0.5)`,
  });
  turnoJugador1 = true;
  document.getElementById("btn_atk_py2").disabled = true;
  document.getElementById("btn_esp_py2").disabled = true;
  document.getElementById("btn_ermi_py2").disabled = true;
  document.getElementById("btn_ki_py2").disabled = true;

  document.getElementById("btn_atk_py1").disabled = false;
  document.getElementById("btn_esp_py1").disabled = false;
  document.getElementById("btn_ermi_py1").disabled = false;
  document.getElementById("btn_ki_py1").disabled = false;

});

document.getElementById("btn_esp_py2").addEventListener("click", () => {

  if (turnoJugador1) {
    return; 
  }
  if (player1.getVida() <= 0) {
    Swal.fire({
      title: "¡K.O.!",
      text: "El Jugador 2 ha sido derrotado. No puedes seguir atacando.",
      icon: "error",
      backdrop: `rgba(255, 0, 0, 0.5)`,
    });
    return;
  }

  if (player2.getEnergia() <= 0) {
    Swal.fire({
      title: "¡Energía Agotada!",
      text: "No puedes atacar, recarga tu energía.",
      icon: "error",
      backdrop: `rgba(255, 215, 0, 0.5)`,
    });
    return;
  }

  if (player2.getKi() <= 0) {
    Swal.fire({
      title: "¡Ki Agotado!",
      text: "No puedes atacar, tu ki se ha agotado.",
      icon: "error",
      backdrop: `rgba(255, 215, 0, 0.5)`,
    });
    return;
  }

  player2.atk_especial(player1);
  let porcentaje = parseInt((parseInt(player2.getKi()) * 100) / 80);
  document.getElementById("ki_py2").style.width = `${porcentaje}%`;
  document.getElementById("ki_py2").innerText = `${porcentaje}%`;

  porcentaje = parseInt((parseInt(player2.getEnergia()) * 100) / 90);
  document.getElementById("energia_py2").style.width = `${porcentaje}%`;
  document.getElementById("energia_py2").innerText = `${porcentaje}%`;

  porcentaje = parseInt((parseInt(player1.getVida()) * 100) / 100);
  porcentaje = porcentaje < 0 ? 0 : porcentaje;
  document.getElementById("vida_py1").style.width = `${porcentaje}%`;
  document.getElementById("vida_py1").innerText = `${porcentaje}%`;

  Swal.fire({
    title: "Ataque del Big Bang",
    text: "¡Golpe definitivo!",
    width: 600,
    color: "#ffffff",
    background: "linear-gradient(135deg, #FFD700, #FFA500, #FF4500)",
    imageUrl: `./public/img/${pj2}/especial.png`,
    imageWidth: 300,
    imageHeight: 300,
    imageAlt: "Ataque especial",
    backdrop: `rgba(255, 215, 0, 0.5)`,
  });

  turnoJugador1 = true;
  document.getElementById("btn_atk_py2").disabled = true;
  document.getElementById("btn_esp_py2").disabled = true;
  document.getElementById("btn_ermi_py2").disabled = true;
  document.getElementById("btn_ki_py2").disabled = true;

  document.getElementById("btn_atk_py1").disabled = false;
  document.getElementById("btn_esp_py1").disabled = false;
  document.getElementById("btn_ermi_py1").disabled = false;
  document.getElementById("btn_ki_py1").disabled = false;

});

document.getElementById("btn_ermi_py2").addEventListener("click", () => {
  if (turnoJugador1) {
    return; 
  }
  player2.semilla_ermi();

  let vida_actual = player2.getVida();
  let porcentaje = parseInt((vida_actual * 100) / 100);
  document.getElementById("vida_py2").style.width = `${porcentaje}%`;
  document.getElementById("vida_py2").innerText = `${porcentaje}%`;

  let ki_actual = player2.getKi();
  porcentaje = parseInt((ki_actual * 100) / 80);
  document.getElementById("ki_py2").style.width = `${porcentaje}%`;
  document.getElementById("ki_py2").innerText = `${porcentaje}%`;

  let energia_actual = player2.getEnergia();
  porcentaje = parseInt((energia_actual * 100) / 90);
  document.getElementById("energia_py2").style.width = `${porcentaje}%`;
  document.getElementById("energia_py2").innerText = `${porcentaje}%`;

  let semillas_actuales = player2.getSemilla();
  semillas_actuales = semillas_actuales < 0 ? 0 : semillas_actuales;
  document.getElementById("semillas_py2").innerText = `${semillas_actuales}`;

  Swal.fire({
    title: "Semilla del Ermitaño",
    text: "¡Tu energía ha sido restaurada!",
    width: 600,
    color: "#ffffff",
    background: "linear-gradient(135deg, #32CD32, #008000, #004d00)",
    imageUrl: `./public/img/${pj2}/curar.png`,
    imageWidth: 300,
    imageHeight: 300,
    imageAlt: "Recuperación con semilla del ermitaño",
    backdrop: `rgba(50, 205, 50, 0.5)`,
  });

  if (player2.getSemilla() <= 0) {
    Swal.fire({
      title: "¡Semillas Agotadas!",
      text: "Has agotado todas tus semillas del ermitaño.",
      icon: "error",
      backdrop: `rgba(50, 205, 50, 0.5)`,
    });
    document.getElementById("btn_ermi_py2").disabled = true;
  }
  turnoJugador1 = true;
  document.getElementById("btn_atk_py2").disabled = true;
  document.getElementById("btn_esp_py2").disabled = true;
  document.getElementById("btn_ermi_py2").disabled = true;
  document.getElementById("btn_ki_py2").disabled = true;

  document.getElementById("btn_atk_py1").disabled = false;
  document.getElementById("btn_esp_py1").disabled = false;
  document.getElementById("btn_ermi_py1").disabled = false;
  document.getElementById("btn_ki_py1").disabled = false;
});

document.getElementById("btn_ki_py2").addEventListener("click", () => {
  if (turnoJugador1) {
    return;
  }
  if (player2.getKi() >= 80) {
    Swal.fire({
      title: "¡Ki al Máximo!",
      text: "Tu ki ya está al 100%, no puedes cargar más. Es momento de Atacar!!",
      icon: "warning",
      backdrop: `rgba(255, 215, 0, 0.5)`,
    });
    return;
  }
  player2.aumentar_ki();
  let porcentaje = parseInt((parseInt(player2.getKi()) * 100) / 80);
  document.getElementById("ki_py2").style.width = `${porcentaje}%`;
  document.getElementById("ki_py2").innerText = `${porcentaje}%`;
  Swal.fire({
    title: "Kaiokeeen",
    text: "Kaiokeeeeeeeeeeeeeeeeeeeeen",
    width: 600,
    color: "#ffffff",
    background: "linear-gradient(135deg, #FFD700, #FFA500, #FF4500)",
    imageUrl: `./public/img/${pj2}/energia.png`,
    imageWidth: 300,
    imageHeight: 300,
    imageAlt: "Ataque especial",
    backdrop: `rgba(255, 215, 0, 0.5)`,
  });
  turnoJugador1 = true;
  document.getElementById("btn_atk_py2").disabled = true;
  document.getElementById("btn_esp_py2").disabled = true;
  document.getElementById("btn_ermi_py2").disabled = true;
  document.getElementById("btn_ki_py2").disabled = true;

  document.getElementById("btn_atk_py1").disabled = false;
  document.getElementById("btn_esp_py1").disabled = false;
  document.getElementById("btn_ermi_py1").disabled = false;
  document.getElementById("btn_ki_py1").disabled = false;
});
