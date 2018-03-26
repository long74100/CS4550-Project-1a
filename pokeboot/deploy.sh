#!/bin/bash

export PORT=5103
export MIX_ENV=prod
export GIT_PATH=/home/pokeboot/src/pokeboot

PWD=`pwd`
if [ $PWD != $GIT_PATH ]; then
	echo "Error: Must check out git repo to $GIT_PATH"
	echo "  Current directory is $PWD"
	exit 1
fi

if [ $USER != "pokeboot" ]; then
	echo "Error: must run as user 'pokeboot'"
	echo "  Current user is $USER"
	exit 2
fi

mix deps.get
(cd assets && npm install)
(cd assets && ./node_modules/brunch/bin/brunch b -p)
mix phx.digest
mix release --env=prod

mkdir -p ~/www
mkdir -p ~/old

NOW=`date +%s`
if [ -d ~/www/pokeboot ]; then
	echo mv ~/www/pokeboot ~/old/$NOW
	mv ~/www/pokeboot ~/old/$NOW
fi

mkdir -p ~/www/pokeboot
REL_TAR=~/src/pokeboot/_build/prod/rel/pokeboot/releases/0.0.1/pokeboot.tar.gz
(cd ~/www/pokeboot && tar xzvf $REL_TAR)

crontab - <<CRONTAB
@reboot bash /home/pokeboot/src/pokeboot/start.sh
CRONTAB

#. start.sh
