const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 320,
    backgroundColor: 'rgba(0,0,0,0)',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let player;
let checkpoint;
let cursors;
let score = 0;
let scoreText;
let passCode = prompt("Введите цифру для проверки:");

function preload() {
    this.load.image('truck', 'assets/truck.png');
    this.load.image('checkpoint', 'assets/checkpoint.png');
    this.load.image('fireworks', 'assets/fireworks.png');
}

function create() {
    player = this.physics.add.sprite(100, 160, 'truck').setScale(0.5);
    checkpoint = this.physics.add.sprite(500, 160, 'checkpoint').setScale(0.5);

    player.setCollideWorldBounds(true);
    checkpoint.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();

    this.physics.add.collider(player, checkpoint, hitCheckpoint, null, this);
}

function update() {
    player.setVelocity(100, 0); // Грузовик движется вперед

    if (cursors.left.isDown) {
        player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
    } else {
        player.setVelocityX(100);
    }

    if (cursors.up.isDown) {
        player.setVelocityY(-160);
    } else if (cursors.down.isDown) {
        player.setVelocityY(160);
    } else {
        player.setVelocityY(0);
    }
}

function hitCheckpoint(player, checkpoint) {
    if (passCode === "10") {
        // Грузовик проезжает блокпост и появляется салют
        this.add.sprite(player.x, player.y, 'fireworks').setScale(0.5);
        player.setVelocityX(100);
    } else {
        // Грузовик разворачивается и едет в другую сторону
        player.setVelocityX(-100);
    }
}
