const path = require('path');
const Ecrequest = require('ecrequest');
const { URL } = require('url');
const { assert } = require('console');
const Codes = require('../constants/Codes');

const Bot = require(path.resolve(__dirname, 'Bot.js'));
const SmartContract = require(path.resolve(__dirname, '../libs/smartContract.js'));
const ResponseFormat = require(path.resolve(__dirname, '../libs/ResponseFormat.js'));

class MockApis extends Bot {
  constructor() {
    super();
    this.name = 'MockApis';
  }

  init({ config, database, logger, i18n }) {
    return super.init({ config, database, logger, i18n })
      .then(() => this);
  }

  async start() {
    await super.start();
    return this;
  }

  async mintNFT({ body = {} }) {
    let result;
    if(!SmartContract.isEthereumAddress(body.address)) {
      result = new ResponseFormat({
        code: Codes.INVALID_ADDRESS,
        message: `Invalid Address: ${body.address}`,
        payload: body
      });
    }
    else {
      result = new ResponseFormat({
        message: "Mint NFT",
        payload: {
          jID: "1f7018f81b09ef027ff2abad58ba129fd41a61ea91d1c418478322c26d6eae3a",
          txHash: "0x0a69348e33b0f38275b48459f4aada15b8fa33dda0765e72b9d6a7f982e770eb",
          contract: "0x7802386e565561E7b0a13A029beb026D9546305a",
          status: "processing",
          success: true,
          finish: false,
          data: body
        }
      });
    }
    return result;
  }
}

module.exports = MockApis;
