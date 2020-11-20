#!/bin/bash

if [[ $AUTHOR_NAME = dependabot ]]; then
  # dependabot does not include validation step
  # as it does not update component packages
  npm run bootstrap && npm run build:dependabot
else
  npm run bootstrap && npm run build:ci
fi