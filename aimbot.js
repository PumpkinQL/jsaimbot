const robot = require("robotjs")
const { getAsyncKeyState } = require("asynckeystate")

const canvas = document.getElementById("overlay")

const width = 570
const height = 480
const screen = robot.getScreenSize()
const tl = screen.width / 2 - width / 2
const tt = screen.height / 2 - height / 2

canvas.width = width
canvas.height = height

const ctx = canvas.getContext("2d")
ctx.strokeStyle = "purple"
ctx.lineWidth = 3

const { R, G, B } = { R: 0, G: 128, B: 0 }

function find_colour(arr)
{
    for (var y = 0; y < height; y+= 5)
    {   
        for (var x = 0; x < width; x+= 1)
        {
            if (arr[y*width + x].B === B && arr[y*width + x + 1].G === G && arr[y*width + x + 2].R === R)
            {
                var x_pos = x
                var y_pos = y
                while (arr[y*width + x_pos].B === B && arr[y*width + x_pos + 1].G === G && arr[y*width + x_pos + 2].R === R)
                {
                    x_pos += 1
                }
                while (arr[y_pos*width + x].B === B && arr[y_pos*width + x + 1].G === G && arr[y_pos*width + x + 2].R === R)
                {
                    y_pos += 1
                }

                return { x: (x + x_pos) / 2, y: (y + y_pos) / 2, px: x, py: y + 18, w: x_pos - x, h: y_pos - y }
            }
        }
    }
}

setInterval(() => 
{
    // https://docs.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes list of codes
    if (getAsyncKeyState(0x41)) // A
    { 
        const capture = robot.screen.capture(tl, tt, width, height).image
        const arr = []

        var i = 0, len = capture.length
        while (i < len)
        {   
            arr.push({ B: capture[i], G: capture[i+1], R: capture[i+2] })
            i+=4
        }

        const coords = find_colour(arr)

        if (coords)
        {
            const x_move = Math.floor(tl + coords.x)
            const y_move = Math.floor(tt + coords.y)

            ctx.clearRect(0, 0, width, height)
            ctx.beginPath()
            ctx.rect(coords.px - 5, coords.py -5, coords.w + 5, coords.h + 5)
            ctx.stroke()

            robot.moveMouse(x_move, y_move)
            robot.mouseClick()
        }
    }
}, 100)