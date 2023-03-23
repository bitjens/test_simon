let simon_state: number
let simon_speed: number
let simon_sequence: number[]
let simon_inputlevel: number
let simon_inputindex: number

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
    simon_output()
}

function simon_output() {
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
        simon_output()
        return
    }
    simon_inputindex = simon_inputindex + 1
}




function game_state(state: number) {
    if (true)
        return
    for (let x = 0; x < 5; x++)
        led.unplot(x, 4)
    led.plot(state, 4)
}

function game_start() {
    let elements = [1, 2]
    let count = 4
    let speed = 1
    input.onButtonPressed(Button.A, function () {
        simon_input(1)
    })
    input.onButtonPressed(Button.B, function () {
        simon_input(2)
    })
    simon_start(elements, count, speed)
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




game_start()