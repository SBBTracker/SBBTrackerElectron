import sys
import threading
from queue import Queue
from sbblogparser import run

if __name__ == '__main__':
    queue = Queue()
    threading.Thread(target=run, args=(queue,), daemon=True).start()
    while True:
        sys.stdout.write(queue.get().to_json())
        