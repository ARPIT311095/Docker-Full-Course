a = float(input("Number 1: "))
op = input("Operation (+, -, *, /) chunye: ")
b = float(input("Number 2: "))

if op == "+":
    print("Result:", a + b)
elif op == "-":
    print("Result:", a - b)
elif op == "*":
    print("Result:", a * b)
elif op == "/":
    if b != 0:
        print("Result:", a / b)
    else:
        print("Error: 0 se divide nahi kar sakte!")
else:
    print("Galat operation!")