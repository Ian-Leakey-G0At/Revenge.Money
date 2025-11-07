#!/bin/bash
# Usage: ./scripts/backup.sh <file_to_backup>
# This will create a timestamped backup in the /backups directory.

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <file_to_backup>"
    exit 1
fi

FILE_TO_BACKUP=$1
TIMESTAMP=$(date +%Y%m%d%H%M%S)
BASENAME=$(basename "$FILE_TO_BACKUP")
BACKUP_PATH="backups/${BASENAME}.${TIMESTAMP}.bak"

if [ ! -f "$FILE_TO_BACKUP" ]; then
    echo "Error: File not found at $FILE_TO_BACKUP" >&2
    exit 1
fi

echo "Backing up $FILE_TO_BACKUP to $BACKUP_PATH..."
cp "$FILE_TO_BACKUP" "$BACKUP_PATH"
echo "Backup complete. Path: $BACKUP_PATH"