function setup-services {
    cd automation

    echo '···························'
    echo '·· starting up the microservices >>>>  ··'
    echo '···························'
    
    # we start all our microservices
    (bash < start-all-microservices.sh)

   cd ..
}

function main {
  setup-services
}

main
