#!/bin/bash

if [[ $TRAVIS_PULL_REQUEST_BRANCH =~ ^dependabot.+ ]]; then
  npm run test:ci
else
  npm run bootstrap && npm run build:ci
fi