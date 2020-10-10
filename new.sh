#!/bin/bash

LOC=$(pwd)
TMP="/home/$(whoami)/.custom/templates"
PRO=$LOC/$2
MODES=(python django typescript c cfile)
DOC="$ new [ python django typescript c cfile] NAME"

create_project () {
    mkdir $PRO && git init $PRO
    case $1 in
        python)
          virtualenv $PRO/env
          cp $TMP/shared/* $TMP/py/* -t $PRO/
          mv $PRO/gitignore $PRO/.gitignore
          $PRO/env/bin/python -m pip install mypy
          $PRO/env/bin/python -m pip freeze > $PRO/requirements.txt
          ;;
        django)
          create_project python $2
          cp $TMP/dj/* $PRO/
          $PRO/env/bin/python -m pip install django djangorestframework
          $PRO/env/bin/python -m pip freeze > $PRO/requirements.txt
          cd $PRO && source env/bin/activate && django-admin startproject $2
          mv $PRO/$2 $PRO/src
          ;;
        typescript)
          cp $TMP/ts/* $TMP/js-shared/* $TMP/shared/* -t $PRO/
          cd $PRO && yarn
          mkdir $PRO/src $PRO/public $PRO/dist
          mv $PRO/gitignore-main $PRO/.gitignore && mv $PRO/gitignore-dist $PRO/dist/.gitignore
          mv $PRO/index.html $PRO/public/ && mv $PRO/index.ts $PRO/src/
          cd $PRO && yarn add typescript prettier browserify node-minify javascript-obfuscator @node-minify/cli @node-minify/uglify-js
          ;;
        c)
          cp $TMP/c/* $TMP/shared/* -t $PRO/
          mkdir $PRO/src && mv $PRO/main.c $PRO/src && mv $PRO/gitignore $PRO/.gitignore
          ;;
        *)
          echo "error: unknown mode '$1' - use 'help' for more info"
          rm -r $PRO
          exit 0
          ;;
    esac
}

create_cheader () {
  PATH=""
  PREFIX=""
  TARGET=""
  TARGET_FILE=""
  DELIMIT="_"
  NAME=${1^^}
  SUFFIX="_H"
  EXT=".h"
  M_EXT=".c"
  
  [[ $LOC =~ ^.*\/src\/(.+)$ ]] &&
    PATH=${BASH_REMATCH[1]}
    
  if [ ! -z $PATH ]
    then
		  PREFIX=${PATH/\//"_"}
		  PREFIX=${PATH^^}
  else
    echo "error: header file must be made in a nested 'src' folder"
    exit 0
  fi

  TARGET=$PREFIX$DELIMIT$NAME$SUFFIX
  TARGET_FILE=${NAME,,}$EXT
  MAIN_FILE=${NAME,,}$M_EXT
  PATH="../$PATH/$TARGET_FILE"

  if [ -e $LOC/$TARGET_FILE -o -e $LOC/$MAIN_FILE ]
    then
      echo "error: file '${NAME,,}' already exists"
      exit 0
  fi

  echo -e "#ifndef $TARGET\n#define $TARGET\n\nendif /* $TARGET */" > $TARGET_FILE
  echo -e "#include \"$PATH\"\n" > $MAIN_FILE
  echo "succesfully created c file '${NAME,,}.c|.h'"
  exit 1 

}

if [ -z $1 ] 
    then 
      echo "error: please specify a project mode" 
      exit 0
elif [ $1 == "help" ]
    then 
      echo -e $DOC
      exit 1
elif [ -z $2 ]
    then 
      echo "error: please specify a project name" 
      exit 0
elif [ -d $PRO ]
    then 
      echo "error: project folder already exits '$PRO'"
      exit 0
else
  for mode in ${MODES[@]}; do
    if [ $1 == $mode ]
      then
        if [ $1 == "cheader" ]
          then
            create_cheader $2
        else
          create_project $1 $2
          echo "succesfully created $1 project: '$PRO'"
          exit 1
        fi
    fi
  done
  echo "error: unknown mode '$1' - use 'help' for more info"
  exit 0
fi
