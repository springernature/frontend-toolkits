#!/bin/bash

if [[ $TRAVIS_PULL_REQUEST_BRANCH =~ ^dependabot.+ ]]; then
  # dependabot does not include validation step
  # as it does not update component packages
  npm run bootstrap && npm run build:dependabot
else
  npm run bootstrap && npm run build:ci
fi