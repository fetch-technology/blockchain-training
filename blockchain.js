const cluster = require('cluster')
const dgram = require('dgram')
const crypto = require('crypto')
const assert = require('assert')

const express = require('express')
const parser = require('body-parser')
const request = require('request')

const lastOf = list => list[list.length - 1]


class Block {

  constructor(index, previousHash, timestamp, data, nonce=0, hash='') {
    this.index = index
    this.previousHash = previousHash
    this.timestamp = timestamp
    this.data = data
    this.nonce = nonce
    this.hash = hash
  }

  calculateHash() {
    // TODO
  }

  static get GENESIS() {
    return new Block(
      0, '', 1522983367254, null, 0,
      'e063dac549f070b523b0cb724efb1d4f81de67ea790f78419f9527aa3450f64c'
    )
  }

  static fromPrevious({ index, hash }, data) {
    // Initialize next block using previous block and transaction data
    // assert(typeof hash === 'string' && hash.length === 64)
    return new Block(index + 1, hash, Date.now(), data, 0)
  }

  static fromJson({ index, previousHash, timestamp, data, nonce, hash }) {
    const block = new Block(index, previousHash, timestamp, data, nonce, hash)
    assert(block.calculateHash() === block.hash)
    return block
  }
}


class Server {

  constructor() {
    this.blocks = [Block.GENESIS]
    this.peers = {}

    this.peerServer = dgram.createSocket('udp4')
    this.peerServer.on('listening', this.onPeerServerListening.bind(this))
    this.peerServer.on('message', this.onPeerMessage.bind(this))

    this.httpServer = express()
    this.httpServer.use(parser.json())
    this.httpServer.get('/peers', this.showPeers.bind(this))
    this.httpServer.get('/blocks', this.showBlocks.bind(this))
    this.httpServer.post('/blocks', this.processBlocks.bind(this))
    this.httpServer.post('/transactions', this.processTransaction.bind(this))
  }

  start() {
    if (!cluster.isMaster) return
    cluster.fork().on('online', _ => this.peerServer.bind(2346))
    cluster.fork().on('online', _ => this.httpServer.listen(2345, _ => {
      console.info('RPC server started at port 2345.')
    }))
  }

  onPeerServerListening() {
    const address = this.peerServer.address()
    console.info(
      `Peer discovery server started at ${address.address}:${address.port}.`
    )

    // TODO: broadcast the message to all the peers
  }

  onPeerMessage(message, remote) {
    // TODO: handle message from peers
  }

  showPeers(req, resp) { resp.json(this.peers) }
  showBlocks(req, resp) { resp.json(this.blocks) }

  processTransaction(req, resp) {
    // TODO
  }

  processBlocks(req, resp) {
    // TODO
  }
}


exports.Block = Block
exports.Server = Server
