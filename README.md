# blockchain-training

DIY blockchain from Fetch's blockchain training program.

# Usage

Start blockchain nodes:

    docker-compose up --build --scale node=4

Cleanup:

    docker-compose down

Display node status:

    docker ps
    # example result
    CONTAINER ID        IMAGE                 COMMAND                  CREATED             STATUS              PORTS                    NAMES
    2ade9509f3b8        blockchainbase_node   "/bin/sh -c 'cd /blo…"   28 seconds ago      Up 28 seconds       0.0.0.0:2219->2345/tcp   blockchaintraining_node_2
    ff544707ec6f        blockchainbase_node   "/bin/sh -c 'cd /blo…"   28 seconds ago      Up 27 seconds       0.0.0.0:2218->2345/tcp   blockchaintraining_node_4
    01d785dbd6ad        blockchainbase_node   "/bin/sh -c 'cd /blo…"   28 seconds ago      Up 28 seconds       0.0.0.0:2217->2345/tcp   blockchaintraining_node_3
    10d87da8ff36        blockchainbase_node   "/bin/sh -c 'cd /blo…"   28 seconds ago      Up 28 seconds       0.0.0.0:2216->2345/tcp   blockchaintraining_node_1

To call one node RPC API (replace port with the port map to your target node):

    curl -v 0.0.0.0:2216/peers
    curl -v 0.0.0.0:2216/blocks

# License

Copyright 2018 Fetch Technology Pte Ltd.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed
under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
CONDITIONS OF ANY KIND, either express or implied. See the License for the
specific language governing permissions and limitations under the License.
