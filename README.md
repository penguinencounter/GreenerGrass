# GreenerGrass
> The grass is always greener on the other side

Deployment status:
[![Deploy](https://github.com/penguinencounter/GreenerGrass/actions/workflows/pages.yml/badge.svg)](https://github.com/penguinencounter/GreenerGrass/actions/workflows/pages.yml)
### a game about being able to tell between different shades of green
meme submission for GameOff 2022

## How to play
Click the color that is "greener".

## Technical details
The "green" percentage is actually two factors:
* `purity` - the percentage of the color that is green; that is, `green / (red + green + blue)`
* `clarity` - the actual green value as a percentage, multiplied by two; `max((green / 255) * 2, 1)`

The final percentage is then `purity * clarity`.

The effect this has is that
1. `rgb(0, 255, 0)` is 100%
2. `rgb(0, 128, 0)` is 100%
3. `rgb(0, 64, 0)` is *50%*
4. `rgb(0, 32, 0)` is *25%*
5. `rgb(0, 1, 0)` is like 0.5% or something
