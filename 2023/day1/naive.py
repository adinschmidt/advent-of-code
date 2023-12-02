#!/usr/bin/env python3

from sys import argv


def solution1(file):
    sum = 0
    for line in open(file, 'r'):
        first, last = 0, 0
        for i, char in enumerate(line):
            if char.isdigit():
                first = i
                break
        for i, char in enumerate(line[::-1]):
            if char.isdigit():
                last = len(line) - i
                break
        sum += int(line[first]+line[last-1])

    print(sum)



def solution2(file):
    numbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    def get_first_number(line):
        for i in range(len(line)):
            for number in numbers:
                if line[i:i+len(number)] == number:
                    return i, numbers.index(number) + 1
        return None, None

    def get_last_number(line):
        for i in range(len(line)-1, -1, -1):
            for number in numbers:
                if line[i-len(number):i] == number:
                    return i, numbers.index(number) + 1
        return None, None

    sum = 0
    for line in open(file, 'r'):
        first_number_index, first_number = get_first_number(line)
        last_number_index, last_number = get_last_number(line)
        first_digit_index, first_digit = None, 0
        last_digit_index, last_digit = None, 0
        for i, char in enumerate(line):
            if char.isdigit():
                first_digit_index = i
                first_digit = int(char)
                break
        for i, char in enumerate(line[::-1]):
            if char.isdigit():
                last_digit_index = len(line) - i
                last_digit = int(char)
                break
        if first_number is not None and first_number_index < first_digit_index:
            sum += first_number * 10
        else:
            sum += first_digit * 10
        if last_number is not None and last_number_index > last_digit_index:
            sum += last_number
        else:
            sum += last_digit
    print(sum)

if __name__ == '__main__':
    solution1(argv[1])
    solution2(argv[1])
