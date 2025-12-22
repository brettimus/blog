#!/bin/bash
#
# fp-migrate.sh - Migrate .fp directory to new format via export/import
#
# This script exports your existing .fp data and reimports it using the
# latest fp CLI format. Useful when upgrading fp or migrating projects.
#
# Prerequisites:
#   - fp CLI v0.8.0+ installed
#   - Authenticated: run `fp auth login` first
#   - Run from your project root (where .fp directory lives)
#
# Usage:
#   ./fp-migrate.sh
#

set -e

echo "=== FP Data Migration ==="
echo ""

# Check fp is installed
if ! command -v fp &> /dev/null; then
    echo "Error: fp CLI not found. Install it first."
    exit 1
fi

echo "Using fp version: $(fp --version)"
echo ""

# Check .fp exists
if [ ! -d ".fp" ]; then
    echo "Error: No .fp directory found in current directory."
    exit 1
fi

# Step 1: Backup
echo "Step 1: Creating backup..."
if [ -d ".fp.bak" ]; then
    echo "  Removing existing .fp.bak..."
    rm -rf .fp.bak
fi
cp -r .fp .fp.bak
echo "  ✓ Backup created at .fp.bak"
echo ""

# Step 2: Export from backup
echo "Step 2: Exporting data..."
# Temporarily swap directories so fp can read the backup
mv .fp.bak .fp.tmp
mv .fp .fp.bak 2>/dev/null || true
mv .fp.tmp .fp
fp project export -o fp-export.jsonl
mv .fp .fp.bak.new
mv .fp.bak .fp 2>/dev/null || true
mv .fp.bak.new .fp.bak
echo "  ✓ Exported to fp-export.jsonl"
echo ""

# Step 3: Remove old .fp
echo "Step 3: Removing old .fp directory..."
rm -rf .fp
echo "  ✓ Removed .fp"
echo ""

# Step 4: Import
echo "Step 4: Importing data..."
fp project import fp-export.jsonl
echo "  ✓ Imported successfully"
echo ""

# Step 5: Link and sync
echo "Step 5: Linking to remote..."
fp project link
echo ""

echo "Step 6: Syncing..."
fp sync
echo ""

# Cleanup
echo "Step 7: Cleaning up..."
rm -f fp-export.jsonl
echo "  ✓ Removed export file"
echo ""

echo "=== Migration Complete ==="
echo ""
echo "Your .fp directory has been migrated to the new format."
echo "Backup is preserved at .fp.bak - delete it when you're satisfied:"
echo "  rm -rf .fp.bak"
echo ""
echo "Verify with: fp tree"
