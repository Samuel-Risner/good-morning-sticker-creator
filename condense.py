stuff = """#fdf2f8
100
#fce7f3
200
#fbcfe8
300
#f9a8d4
400
#f472b6
500
#ec4899
600
#db2777
700
#be185d
800
#9d174d
900
#831843
950
#500724
"""

lines = stuff.split("\n")

stuff_2 = []

for line in lines:
    if line.startswith("#"):
        stuff_2.append(line)

result = ""
for thing in stuff_2:
    result += f'"{thing}", '

print(result[:-2])
