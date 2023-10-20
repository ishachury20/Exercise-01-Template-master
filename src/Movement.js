class Movement extends Phaser.Scene {
    constructor() {
        super('movementScene')
    }

    preload() {
        this.load.spritesheet('character','./assets/spritesheets/Character_002.png', {
            frameWidth: 48,
            frameHeight: 48
        })
    }

    create() {
        this.cameras.main.setBackgroundColor(0xDDDDDD)
        this.player = this.physics.add.sprite(width/2, height/2, 'character', 1).setScale(2)
        this.player.body.setCollideWorldBounds(true)
        this.player.body.setSize(32,32).setOffset(8,16)
        //console.log('now in movement scene 👍')
        this.PLAYER_VELOCITY = 350

        cursors = this.input.keyboard.createCursorKeys()

        this.anims.create({
            key: 'idle-down',
            frameRate: 0,
            repeat: -1, //infinately 
            frames: this.anims.generateFrameNumbers('character', {
                start: 1, //standing frame 
                end: 1 //static 
            })
        })

        this.anims.create({
            key: 'walk-down',
            frameRate: 5,
            repeat: -1, //infinately 
            frames: this.anims.generateFrameNumbers('character', {
                start: 0, //standing frame 
                end: 2 //static 
            })
        })

        this.anims.create({
            key: 'walk-up',
            frameRate: 5,
            repeat: -1, //infinately 
            frames: this.anims.generateFrameNumbers('character', {
                start: 9, //standing frame 
                end: 11 //static 
            })
        })

        this.anims.create({
            key: 'walk-left',
            frameRate: 5,
            repeat: -1, //infinately 
            frames: this.anims.generateFrameNumbers('character', {
                start: 3, //standing frame 
                end: 5 //static 
            })
        })

        this.anims.create({
            key: 'idle-left',
            frameRate: 5,
            repeat: 0, //infinately 
            frames: this.anims.generateFrameNumbers('character', {
                start: 4, //standing frame 
                end: 4 //static 
            })
        })

        this.anims.create({
            key: 'idle-right',
            frameRate: 5,
            repeat: 0, //infinately 
            frames: this.anims.generateFrameNumbers('character', {
                start: 7, //standing frame 
                end: 7 //static 
            })
        })

        this.anims.create({
            key: 'walk-right',
            frameRate: 5,
            repeat: -1, //infinately 
            frames: this.anims.generateFrameNumbers('character', {
                start: 6, //standing frame 
                end: 8 //static 
            })
        })




        //testing 
        //this.player.play('walk-down')
    }

    update() {
        let playerVector = new Phaser.Math.Vector2(0, 0)
        
        
        if(cursors.left.isDown){
            //this.player.x -= this.PLAYER_VELOCITY
            playerVector.x = -1 
            playerDirection = 'left'
        } else if(cursors.right.isDown) {
            //this.player.x += this.PLAYER_VELOCITY
            playerVector.x = 1
            playerDirection = 'right'
        }
        
        if(cursors.up.isDown){
            //this.player.y -= this.PLAYER_VELOCITY
            playerVector.y = -1
            playerDirection = 'up'
        } else if(cursors.down.isDown) {
            //this.player.y += this.PLAYER_VELOCITY
            playerVector.y = 1; 
            playerDirection = 'down'
        }

        playerVector.normalize()
        // this.player.x += playerVector.x * this.PLAYER_VELOCITY
        // this.player.y += playerVector.y * this.PLAYER_VELOCITY
        this.player.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y)

        let playerMovement //stores string to call animation 
        playerVector.length() ? playerMovement = 'walk' : playerMovement = 'idle'
        this.player.play(playerMovement + '-' + playerDirection, true)
    }
}