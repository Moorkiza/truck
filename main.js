const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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
let cursors;
let checkpoints;
let score = 0;
let scoreText;

function preload() {
    this.load.image('truck', 'assets/truck.png');
    this.load.image('checkpoint', 'assets/checkpoint.png');
}

function create() {
    player = this.physics.add.sprite(400, 500, 'truck').setScale(0.5);
    player.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();

    checkpoints = this.physics.add.group({
        key: 'checkpoint',
        repeat: 5,
        setXY: { x: 12, y: 100, stepX: 150 }
    });

    checkpoints.children.iterate(function (child) {
        child.setVelocity(Phaser.Math.Between(-200, 200), 20);
        child.setBounce(1);
        child.setCollideWorldBounds(true);
    });

    this.physics.add.collider(player, checkpoints, hitCheckpoint, null, this);

    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });
}

function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
    } else {
        player.setVelocityX(0);
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
    checkpoint.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);
}
