const game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
})

function preload () {
    game.load.image('sky', './assets/sky.png')
    game.load.image('ground', './assets/platform.png')
    game.load.image('diamond', './assets/diamond.png')
    game.load.image('woof', './assets/woof.png', 32, 32)
}



function create () {
    game.physics.StartSystem(Phaser.Physics.ARCADE)

    game.add.sprite(0, 0, 'sky')
}

function update () {}