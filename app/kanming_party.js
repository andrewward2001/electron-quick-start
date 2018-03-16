const $ = jQuery = require('jquery')
const path = require('path')
const Tile = require('./Tile.js')
const Player = require('./Player.js')

let tiles = [],
    player,
    roll

$(document).ready(() => {
  load()
})

async function load() {
  await makeFor()
  await loadJSON()
  player = new Player(0, 0)
  player.draw()
  $('#rollModal').modal('show')
  $(document).on('click', '#roll-btn', () => {
    roll = Math.floor(Math.random() * 5) + 1
    $('#roll-result').html(roll)
    setTimeout(() => { $('#rollModal').modal('hide'), move() }, 1000)
  })
}

function makeFor() {
  for(let i = 0; i < 10; i++) {
    $('#game-board').append(`<tr data-row=${i}></tr>`)
    for(let j = 0; j < 10; j++) {
      $(`[data-row='${i}']`).append(`<td class="tile" data-col="${j}"></td>`)
    }
  }
}

function loadJSON() {
  $.getJSON(path.join(__dirname, 'res/board.json'), (data) => {
    console.log(data)
    for(let i = 0; i < 10; i++) {
      for(let j = 0; j < 10; j++) {
        tiles[`${i}${j}`] = new Tile(i, j, data[`tile${i}${j}`].type, data[`tile${i}${j}`].directions)
        $(`[data-row='${i}'] > [data-col="${j}"]`).toggleClass(tiles[`${i}${j}`].type)
      }
    }
  })
}

function move() {
  if(roll > 0) {
    let dirsAvail = [],
        i = player.y
        j = player.x

    console.log(`moves left ${roll}`)
    console.log(tiles[`${i}${j}`])

    if(tiles[`${i}${j}`].up) dirsAvail.push('up')
    if(tiles[`${i}${j}`].right) dirsAvail.push('right')
    if(tiles[`${i}${j}`].down) dirsAvail.push('down')
    if(tiles[`${i}${j}`].left) dirsAvail.push('left')

    if(dirsAvail.length > 1) {
      // hashoosty badoosty shanetty menetty
      // ~ wanguage
    } else {
      if(dirsAvail[0] == 'up')    player.y--
      if(dirsAvail[0] == 'right') player.y++
      if(dirsAvail[0] == 'down')  player.y++
      if(dirsAvail[0] == 'left')  player.x--
      player.draw()
      roll--
      move()
    }
  } else {
    $('#roll-result').html('')
    $('#rollModal').modal('show')
  }
}
