module.exports = class Tile {
  constructor(y, x, type, directions) {
    this.x = x
    this.y = y
    this.type = type
    this.directions = directions
    this.up    = directions[0]
    this.right = directions[1]
    this.down  = directions[2]
    this.left  = directions[3]

    switch(type) {
      case 0:
        this.type = 'home'
        break
      case 1:
        this.type = 'star'
        break
      case 2:
        this.type = 'battle'
        break
      case 3:
        this.type = 'drop'
        break
      case 4:
        this.type = 'minigame'
        break
      case 5:
        this.type = 'empty'
        break
    }
  }
}
