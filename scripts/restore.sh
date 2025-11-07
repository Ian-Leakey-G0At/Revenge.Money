#!/bin/bash
# Usage: ./scripts/restore.sh <backup_file> <target_path>

if [ "$#" -ne 2 ]; then
    echo "Usage: $0 <backup_file> <target_path>" >&2
    exit 1
fi

BACKUP_FILE=$1
TARGET_PATH=$2

if [ ! -f "$BACKUP_FILE" ]; then
    echo "Error: Backup file not found at $BACKUP_FILE" >&2
    exit 1
fi

echo "Restoring $TARGET_PATH from $BACKUP_FILE..."
cp "$BACKUP_FILE" "$TARGET_PATH"
echo "Restore complete."