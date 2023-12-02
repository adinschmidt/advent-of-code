#!/usr/bin/env python3

from sys import argv

RED = 12
GREEN = 13
BLUE = 14


def solution1(file):
    input = open(file, 'r').read()

    sum = 0

    for line in input.split('\n'):
        if line == '':
            continue
        
        game_id = int(line.strip().split(' ')[1][:-1])
        games = [[y.strip() for y in x.split(',')]
                 for x in line.split(':')[1].split(';')]
        
        is_possible = 0
        for game in games:
            red = 0
            green = 0
            blue = 0
            for roll in game:
                if 'red' in roll:
                    red += int(roll.split(' ')[0])
                elif 'green' in roll:
                    green += int(roll.split(' ')[0])
                elif 'blue' in roll:
                    blue += int(roll.split(' ')[0])
            is_possible += int((red <= RED) and (green <= GREEN) and (blue <= BLUE))
        if is_possible == len(games):
            sum += game_id
    return sum

def solution2(file):
    input = open(file, 'r').read()

    sum = 0

    for line in input.split('\n'):
        if line == '':
            continue

        rolls = [[y.strip() for y in x.split(',')]
                 for x in line.split(':')[1].split(';')]
        min_red = 0
        min_green = 0
        min_blue = 0
        for roll in rolls:
            for color in roll:
                if 'red' in color:
                    min_red = max(min_red, int(color.split(' ')[0]))
                elif 'green' in color:
                    min_green = max(min_green, int(color.split(' ')[0]))
                elif 'blue' in color:
                    min_blue = max(min_blue, int(color.split(' ')[0]))
        sum += min_red * min_green * min_blue
        
    return sum


if __name__ == '__main__':
    print(solution1(argv[1]))
    print(solution2(argv[1]))
