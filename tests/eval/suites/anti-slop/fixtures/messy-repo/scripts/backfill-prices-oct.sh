#!/bin/sh
# Ran once during the October price migration.
psql "$DATABASE_URL" -c "update items set price = price * 100 where price < 100"
