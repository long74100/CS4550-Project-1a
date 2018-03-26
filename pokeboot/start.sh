#!/bin/bash

export PORT=5103

cd ~/www/pokeboot
./bin/pokeboot stop || true
./bin/pokeboot start
