# Invoice rendering

## What it does

`render()` turns an invoice record into the customer-facing string. It is called
once per invoice at send time, and nowhere else.

## Performance

Rendering runs at p99 of 12ms against a 40ms budget, measured over the January
send window. The budget comes from the send worker's own timeout, not from a
preference.

## Constraints

Currency formatting follows the locale on the customer record. Where that field
is empty the renderer falls back to the account locale, and records which one it
used so a support agent can tell them apart.

## Operations

Cache entries expire after seven days. The retry window is five minutes.
