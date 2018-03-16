module.exports = class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.tile = 'home'
  }

  draw() {
    let x = parseInt($('#game-board').offset().left) + this.x * 50
    let y = parseInt($('#game-board').offset().top)  + this.y * 50
    $('#player').css({left: x, top: y})
  }
}
