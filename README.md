# Version moded to arqma-electron needs

Big Thanks to ArQmA team for support.

# Ryo Core JS

### Info

1. Legal
2. What's in This Repo?
3. Usage

### Contributing

1. QA
2. Pull Requests
3. Building RyoCoreCpp from Scratch
4. Contributors


# Info

## Legal

See `LICENSE.txt` for license.

Copyright © 2019 Ryo-currency
Copyright © 2014-2018 by MyMonero

## What's in This Repo?

This repository holds the Javascript source code for the Ryo/CryptoNote cryptography and protocols, plus lightwallet functions.

There is also a chain of build scripts which is capable of building a JS module by transpiling a subset of the Ryo source code via emscripten, which relies upon static boost libs, for which there is also a script for building from source.

### Contents

`ryo_utils` contains Ryo-specific implementations, wrappers, and declarations, and the wasm implementations for the underlying cryptography behind Ryo.

`ryo_utils/RyoCoreCpp.(js,wasm)` are produced by transpiling Ryo core C++ code to JS via Emscripten (See *Building RyoCoreCpp*). A Module instance is managed by `ryo_utils/RyoCoreBridge.js`.

A ready-made entrypoint for interacting with `RyoCoreBridge` is located at `ryo_utils/ryo_utils.js` with usage `require("./ryo_utils/ryo_utils").then(function(ryo_utils) { })`

This readme is located at `README.md`, and the license is located at `LICENSE.txt`.


## Usage

### `ryo_utils/mnemonic_languages`

It's not generally at all necessary to interact with this module unless you want to, e.g., construct a GUI that needs a list of support mnemonics.

In other words, if your app only needs to generate a mnemonic, you can avoid using this code module entirely by simply passing a language code (of "en", "en-US", "ja", "zh" etc) to the below `ryo_utils` function which generates wallets.

-----
### `ryo_utils/nettype`

You'll need this module to construct the `nettype` argument for passing to various other functions.

#### Examples

`const nettype = require('ryo_utils/nettype').network_type.MAINNET`

-----
### `ryo_utils/ryo_amount_format_utils`

```
const ryo_amount_format_utils = require("ryo_utils/ryo_amount_format_utils");
const formatted_string = ryo_amount_format_utils.formatMoney(a BigInt)
```

Functions: `formatMoneyFull`, `formatMoneyFullSymbol`, `formatMoney`, `formatMoneySymbol`, `parseMoney(str) -> BigInt`

-----
### `ryo_utils/monero_txParsing_utils`

Use these functions to derive additional state from transaction rows which were returned by a server.

* `IsTransactionConfirmed(tx, blockchain_height)`
* `IsTransactionUnlocked(tx, blockchain_height)`
* `TransactionLockedReason(tx, blockchain_height)`

-----
### `ryo_utils/ryo_keyImage_cache_utils`

Use these functions to directly interact with the key image cache.

* `Lazy_KeyImage(…)` Generate a key image directly and cache it. Returns cached values.
* `DeleteManagedKeyImagesForWalletWith(address)` Call this to avoid leaking keys if you use any of the response parsing methods (above) which are suffixed with `__keyImageManaged`.

-----
### `ryo_utils/ryo_paymentID_utils`

Contains functions to validating payment ID formats. To generate payment IDs, see `ryo_utils`.

-----
### `ryo_utils/ryo_requestURI_utils`

Functions for generating and parsing ryo request URIs. Supports multiple currencies and formats.

----
### `ryo_utils/ryo_utils`

#### Examples

```
const ryo = require("ryo_core_js/index");
// or just "ryo_core_js/ryo_utils/ryo_utils"
async function foo()
{
	const ryo_utils = await ryo.ryo_utils;
	const nettype = ryo.nettype_utils.network_type.MAINNET;
	const decoded = ryo_utils.address_and_keys_from_seed("…", nettype);
	// read decoded.address_string
	//
}
foo()
```

```
var decoded = ryo_utils.decode_address("…", nettype);
```

#### Available functions

Each of these functions is implemented<sup>*</sup> in `ryo_utils/RyoCoreBridge.js`, which you access through `ryo_utils/ryo_utils.js`<sup>\*\*</sup>.

The arguments and return values for these functions are very explicitly called out by [RyoCoreBridge.js](https://github.com/ryo-currency/ryo-core-js/blob/develop/ryo_utils/RyoCoreBridge.js), so that will be the most complete documentation for the moment. Return values are all embedded within a JS dictionary unless they're singular values. Errors are thrown when functions are called via `ryo_utils`.

<sup>* The functions' actual implementations are in WebAssembly which is produced via emscripten from exactly matching C++ functions in [ryo-core-cpp](https://github.com/ryo-currency/ryo-core-cpp). This allows core implementation to be shared across all platforms.</sup>

<sup>** for proper exception handling given that `RyoCoreBridge` functions return `{ err_msg: }` rather than throwing</sup>

```
is_subaddress
```
```
is_integrated_address
```
```
new_payment_id
```
```
new_int_addr_from_addr_and_short_pid
```
```
decode_address
```
```
newly_created_wallet
```
```
are_equal_mnemonics
```
```
mnemonic_from_seed
```
```
seed_and_keys_from_mnemonic
```
```
validate_components_for_login
```
```
address_and_keys_from_seed
```
* This function was known as `create_address` in the previous ryo-core-js API.


```
generate_key_image
```
```
generate_key_derivation
```
```
derive_public_key
```
```
derive_subaddress_public_key
```
```
decodeRct
```
```
estimate_rct_tx_size
```

```
calculate_fee
```

##### Creating Transactions

These functions support Bulletproofs under the hood but don't take `bulletproof` as a parameter because that behavior is controlled by a hardcoded [`use_fork_rules` function](https://github.com/ryo-currency/ryo-core-cpp/blob/master/src/ryo_fork_rules.cpp#L49).

```
create_signed_transaction
```
* Takes JSBigInt rather than string args.





# Contributing

## Building RyoCoreCpp from Scratch

There's no need to build ryo_utils/RyoCoreCpp as a build is provided, but if you were for example interested in adding a C++ function, you could use the information in this section to transpile it to JS.

### Repository Setup

* Execute `bin/update_submodules`


### Install Emscripten SDK

Ensure you've [properly installed Emscripten](http://kripken.github.io/emscripten-site/docs/getting_started/downloads.html) and exposed the Emscripten executables in your PATH, e.g.:

	source ./emsdk_env.sh


### Boost for Emscripten

*Depends upon:* Emscripten SDK

Download a copy of the contents of the Boost source into `./contrib/boost-sdk/`.

* Execute `bin/build-boost-emscripten.sh`



### Emscripten Module

*Depends upon:* Repository Setup, Emscripten SDK, Boost for Emscripten

* Execute `bin/build-emcpp.sh`

Or if you want to copy the build products to their distribution locations,

* Execute `bin/archive-emcpp.sh`



## Contributors

* 🌀 `mosu-forge` port to Ryo-currency

* 💿 `endogenic` ([Paul Shapiro](https://github.com/paulshapiro)) Maintainer

* 🍄 `luigi` Major contiributor of original JS core crypto and Monero-specific routines; Advisor

* 🏄‍♂️ `paullinator` ([Paul Puey](https://github.com/paullinator)) API design

* 🔒 `cryptochangement` Subaddress send & decode support; Initial tests

* 💩 `henrynguyen5` Tests; Ledger support research
