let simon_state = 0
let simon_speed = 0
let simon_sequence: number[]
let simon_inputlevel = 0
let simon_inputindex = 0

function simon_start(elements: number[], count: number, speed: number) {
    simon_state = 0
    game_state(simon_state)
    simon_sequence = []
    for (let i = 0; i < count; i++) {
        let x = Math.randomRange(0, elements.length - 1)
        simon_sequence.push(elements[x])
    }
    simon_inputlevel = 0
    simon_inputindex = 0
    simon_speed = speed
    simon_show()
}

function simon_show() {
    simon_state = 1
    game_state(simon_state)
    for (let i = 0; i <= simon_inputlevel; i++) {
        game_output(simon_sequence[i], simon_speed)
    }
    simon_state = 2
    game_state(simon_state)
}

function simon_input(element: number) {
    if (simon_state != 2) {
        return
    }
    game_output(element, simon_speed)
    if (element != simon_sequence[simon_inputindex]) {
        simon_state = 3
        game_state(simon_state)
        game_loose()
        return
    }
    if (simon_inputindex == simon_inputlevel) {
        simon_inputindex = 0
        simon_inputlevel = simon_inputlevel + 1
        if (simon_inputlevel == simon_sequence.length) {
            simon_state = 4
            game_state(simon_state)
            game_win()
            return
        }
        basic.pause(500)
        simon_show()
        return
    }
    simon_inputindex = simon_inputindex + 1
}



function game_state(state: number) {
    return
    led.unplot(0, 4)
    led.unplot(1, 4)
    led.unplot(2, 4)
    led.unplot(3, 4)
    led.unplot(4, 4)
    led.plot(state, 4)
}

function game_output(element: number, speed: number) {
    if (element == 1) {
        for (let y = 0; y < 5; y++) led.plot(0, y)
        music.playTone(262, music.beat(BeatFraction.Half))
        for (let y = 0; y < 5; y++) led.unplot(0, y)
    }
    if (element == 2) {
        for (let y = 0; y < 5; y++) led.plot(4, y)
        music.playTone(330, music.beat(BeatFraction.Half))
        for (let y = 0; y < 5; y++) led.unplot(4, y)
    }
    basic.pause(100)
}

function game_win() {
    music.playTone(698, music.beat(BeatFraction.Whole))
}

function game_loose() {
    music.playTone(175, music.beat(BeatFraction.Whole))
}



basic.forever(function () {

})

input.onButtonPressed(Button.A, function () {
    simon_input(1)
})

input.onButtonPressed(Button.B, function () {
    simon_input(2)
})

let game_elements = [1, 2]
simon_start(game_elements, 4, 1)
