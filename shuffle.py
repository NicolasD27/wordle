import random
import sys

with open(sys.argv[1]) as f:
	lines = f.readlines()
	random.shuffle(lines)
	print(''.join(lines))
