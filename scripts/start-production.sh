#!/usr/bin/env bash

set -euo pipefail

# The deployment keeps configuration outside the checked-out code and symlinks
# it here. Waku does not load it into the server process on production start.
if [[ -f .env ]]; then
  set -a
  source ./.env
  set +a
fi

exec waku start --port "${PORT:-8080}" --host "${HOST:-127.0.0.1}"
