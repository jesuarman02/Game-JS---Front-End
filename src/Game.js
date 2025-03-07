class Game {
  #vida = 100;
  #ki = 80;
  #energia = 90;
  #semilla = 3;
  #user_name = "";

  constructor(user_name) {
    this.#user_name = user_name;
  }
  getVida() {
    return this.#vida;
  }
  getKi() {
    return this.#ki;
  }
  getSemilla() {
    return this.#semilla;
  }
  getEnergia() {
    return this.#energia;
  }
  getUsername() {
    return this.#user_name;
  }
  setVida(decremento) {
    this.#vida -= decremento;
  }
  atk_basico(jugador) {
    this.#ki -= this.#ki < 5 ? 0 : 5;
    this.#energia -= this.#energia < 10 ? 0 : 10;
    jugador.setVida(15);
  }
  atk_especial(jugador) {
    this.#ki -= this.#ki < 30 ? 0 : 30;
    this.#energia -= this.#energia < 40 ? 0 : 40;
    jugador.setVida(30);
  }
  semilla_ermi() {
    if (this.#semilla > 0) {
      this.#semilla -= 1;
      let vida_actual = this.#vida;
      let ki_actual = this.#ki;
      let energia_actual = this.#energia;
      this.#vida = Math.min(vida_actual + 50, 100);
      this.#ki = Math.min(ki_actual + 40, 80);
      this.#energia = Math.min(energia_actual + 50, 90);
    }
  }
  aumentar_ki() {
    this.#ki += 8;
  }
}

export default Game;
