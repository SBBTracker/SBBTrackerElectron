import sys
import threading
from queue import Queue
from sbblogparser import run

if __name__ == '__main__':
    run(export_func=lambda update: print(update.to_json()))
        