namespace SpriteKind {
    export const Orbiter = SpriteKind.create()
    export const PowerUp = SpriteKind.create()
}
/**
 * x = cos(angle) * distance + playerX
 * 
 * y = sin(angle) * distance + playerY
 * 
 * angle += 10?
 * 
 * orbiterAngleOffset = 2*PI/(# of orbiters)
 */
sprites.onOverlap(SpriteKind.Orbiter, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(1)
    sprites.changeDataNumberBy(sprite, "health", -1)
    if (sprites.readDataNumber(sprite, "health") == 0) {
        sprite.destroy()
    }
})
function createOrbiter () {
    orbiter = sprites.create(img`
9 9 9 9 9 9 
9 9 9 9 9 9 
9 9 9 9 9 9 
9 9 9 9 9 9 
9 9 9 9 9 9 
9 9 9 9 9 9 
`, SpriteKind.Orbiter)
    sprites.setDataNumber(orbiter, "health", 25)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.PowerUp, function (sprite, otherSprite) {
    otherSprite.destroy()
    createOrbiter()
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    targetOrbitDistance = 50
    targetOrbitSpeed = 0.1
})
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    if (Math.percentChance(5)) {
        newOrbiterPU = sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . 5 . . 5 . . . . . . 
. . . . . . . 5 5 . . . . . . . 
. . . . . . . 5 5 . . . . . . . 
. . . . . . 5 . . 5 . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, SpriteKind.PowerUp)
        newOrbiterPU.x = sprite.x
        newOrbiterPU.y = sprite.y
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    otherSprite.destroy()
})
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    targetOrbitDistance = 20
    targetOrbitSpeed = 0.2
})
sprites.onDestroyed(SpriteKind.Orbiter, function (sprite) {
    if (0 == sprites.allOfKind(SpriteKind.Orbiter).length) {
        createOrbiter()
    }
})
let Evilyn: Sprite = null
let orbitDistance = 0
let thisAngle = 0
let angleSpacing = 0
let orbiterList: Sprite[] = []
let orbitSpeed = 0
let orbiterAngle = 0
let newOrbiterPU: Sprite = null
let orbiter: Sprite = null
let targetOrbitSpeed = 0
let targetOrbitDistance = 0
let Evelyn = sprites.create(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . 6 6 6 6 6 6 6 6 . . . . 
. . . . 6 6 6 6 6 6 6 6 . . . . 
. . . . 6 6 6 6 6 6 6 6 . . . . 
. . . . 6 6 6 6 6 6 6 6 . . . . 
. . . . 6 6 6 6 6 6 6 6 . . . . 
. . . . 6 6 6 6 6 6 6 6 . . . . 
. . . . 6 6 6 6 6 6 6 6 . . . . 
. . . . 6 6 6 6 6 6 6 6 . . . . 
. . . . 6 6 6 6 6 6 6 6 . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, SpriteKind.Player)
controller.moveSprite(Evelyn)
Evelyn.setFlag(SpriteFlag.StayInScreen, true)
info.setLife(3)
createOrbiter()
targetOrbitDistance = 20
targetOrbitSpeed = 0.2
let nextSpawnMs = 100
let spawnIntervalMs = 100
game.onUpdateInterval(100, function () {
	
})
game.onUpdate(function () {
    orbiterAngle += orbitSpeed
    orbiterList = sprites.allOfKind(SpriteKind.Orbiter)
    angleSpacing = 3.14159 * 2 / orbiterList.length
    for (let index = 0; index <= orbiterList.length - 1; index++) {
        thisAngle = index * angleSpacing + orbiterAngle
        orbiter = orbiterList[index]
        orbiter.x = Math.cos(thisAngle) * orbitDistance + Evelyn.x
        orbiter.y = Math.sin(thisAngle) * orbitDistance + Evelyn.y
    }
})
game.onUpdate(function () {
    if (orbitDistance < targetOrbitDistance) {
        orbitDistance += 1
    } else {
        orbitDistance += -1
    }
    if (orbitSpeed < targetOrbitSpeed) {
        orbitSpeed += 0.005
    } else {
        orbitSpeed += -0.005
    }
})
game.onUpdate(function () {
    if (nextSpawnMs < game.runtime()) {
        Evilyn = sprites.createProjectileFromSide(img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . 4 4 4 4 4 4 . . . . . 
. . . . . 4 . . . . 4 . . . . . 
. . . . . 4 . . . . 4 . . . . . 
. . . . . 4 . . . . 4 . . . . . 
. . . . . 4 . . . . 4 . . . . . 
. . . . . 4 . . . . 4 . . . . . 
. . . . . 4 . . . . 4 . . . . . 
. . . . . 4 . . . . 4 . . . . . 
. . . . . 4 . . . . 4 . . . . . 
. . . . . 4 4 4 4 4 4 . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`, 0, 50)
        Evilyn.setKind(SpriteKind.Enemy)
        Evilyn.x = Math.randomRange(0, scene.screenWidth())
        nextSpawnMs += spawnIntervalMs
    }
})
game.onUpdateInterval(1000, function () {
    spawnIntervalMs += -1
})
