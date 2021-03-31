#!/bin/bash

LOC=$(pwd)
TMP="/home/$(whoami)/.custom/templates"
PRO=$LOC/$2
MODES=(python django typescript c cfile rfunc rclass react)
DOC="$ new [ python django typescript c cfile rfunc rclass react ] NAME"

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
        react)
          rm -rf $PRO && yarn create react-app $PRO --template typescript
          cd $PRO && yarn add react-router-dom react-transition-group && yarn add -D @types/react-router-dom @types/react-transition-group
          mkdir $PRO/src/common && cp $TMP/react-typescript/common/* -r -t $PRO/src/common/
          rm $PRO/README.md $PRO/public/index.html $PRO/src/index.css $PRO/src/App.css $PRO/src/App.test.tsx $PRO/src/App.tsx $PRO/src/logo.svg 
          cp $TMP/shared/* -t $PRO/ && cp $TMP/react-typescript/conf/.prettierrc -t $PRO/
          cp $TMP/react-typescript/conf/index.html -t $PRO/public/ && cp $TMP/react-typescript/src/* -r -t $PRO/src/
          ;;
        c)
          cp $TMP/c/* $TMP/shared/* -t $PRO/
          mkdir $PRO/src && mv $PRO/main.c $PRO/src && mv $PRO/gitignore $PRO/.gitignore
          ;;
          
        *)
          echo "error: unknown mode '$1' - use 'help' for more info"
          rm -r $PRO
          exit 1
          ;;
    esac
}

create_cfile () {
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
    echo "error: c file must be made in a nested 'src' folder"
    exit 1
  fi

  TARGET=$PREFIX$DELIMIT$NAME$SUFFIX
  TARGET_FILE=${NAME,,}$EXT
  MAIN_FILE=${NAME,,}$M_EXT
  PATH="../$PATH/$TARGET_FILE"

  if [ -e $LOC/$TARGET_FILE -o -e $LOC/$MAIN_FILE ]
    then
      echo "error: c file '${NAME,,}' already exists"
      exit 1
  fi

  echo -e "#ifndef $TARGET\n#define $TARGET\n\nendif /* $TARGET */" > $TARGET_FILE
  echo -e "#include \"$PATH\"\n" > $MAIN_FILE
  echo "succesfully created c file '${NAME,,}.c|.h'"

}

create_react_file () {
  cp ./templates/react/$1.js ./templates/tmp
  sed -i -e "s/REPLACE/$2/g" ./templates/tmp/$1.js
  mv ./templates/tmp/$1.js "$LOC/$2.js"

  echo "succesfully created react file '$2.js'"
}

if [ -z $1 ] 
    then 
      echo "error: please specify a project mode" 
      exit 1
elif [ $1 == "help" ]
    then 
      echo -e $DOC
      exit 0
elif [ -z $2 ]
    then 
      echo "error: please specify a project name" 
      exit 1
elif [ -d $PRO ]
    then 
      echo "error: project folder already exits '$PRO'"
      exit 1
else
  for mode in ${MODES[@]}; do
    if [ $1 == $mode ]
      then
        if [ $1 == "cfile" ]
          then
            create_cfile $2
            exit 0 
        elif [ $1 == "rfunc" ]
          then
            create_react_file functional $2
            exit 0
        elif [ $1 == "rclass" ]
          then
            create_react_file classed $2
            exit 0
        else
          create_project $1 $2
          echo "succesfully created $1 project: '$PRO'"
          exit 0
        fi
    fi
  done
  echo "error: unknown mode '$1' - use 'help' for more info"
  exit 1
fi
