 #!/bin/bash 

SOURCE_DIR="app/python"
DIST_DIR="app/dist-python"
LOG_PARSER="log_parser"
BATTLE_SIMULATOR="battle_simulator"

python3 -m PyInstaller $SOURCE_DIR/$LOG_PARSER.py --distpath $DIST_DIR -y
python3 -m PyInstaller $SOURCE_DIR/$BATTLE_SIMULATOR.py --distpath $DIST_DIR -y

rm -rf build/
rm -rf $LOG_PARSER.spec
rm -rf $BATTLE_SIMULATOR.spec