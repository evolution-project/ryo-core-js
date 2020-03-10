// Copyright (c) 2019, Ryo-currency
// Copyright (c) 2014-2018, MyMonero.com
//
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without modification, are
// permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice, this list of
//	conditions and the following disclaimer.
//
// 2. Redistributions in binary form must reproduce the above copyright notice, this list
//	of conditions and the following disclaimer in the documentation and/or other
//	materials provided with the distribution.
//
// 3. Neither the name of the copyright holder nor the names of its contributors may be
//	used to endorse or promote products derived from this software without specific
//	prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL
// THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
// STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
// THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

"use strict"

export const network_type = {
    MAINNET: 0,
    TESTNET: 1,
    STAGENET: 2,
    FAKECHAIN: 3,
    UNDEFINED: 4
}

export function nettype_to_API_string(nettype) {
    switch(nettype) {
        case network_type.MAINNET:
            return "MAINNET"
        case network_type.TESTNET:
            return "TESTNET"
        case network_type.STAGENET:
            return "STAGENET"
        case network_type.FAKECHAIN:
            return "FAKECHAIN"
        case network_type.UNDEFINED:
            return "UNDEFINED"
    }
    throw "Unrecognized nettype"
}

const __MAINNET_CRYPTONOTE_PUBLIC_ADDRESS_BASE58_PREFIX = 0x636 // RYoL
const __MAINNET_CRYPTONOTE_PUBLIC_INTEGRATED_ADDRESS_BASE58_PREFIX = 0x60e2 // RYoN
const __MAINNET_CRYPTONOTE_PUBLIC_SUBADDRESS_BASE58_PREFIX = 0x5e62 // RYoS

const __TESTNET_CRYPTONOTE_PUBLIC_ADDRESS_BASE58_PREFIX = 3170706 // RYoT
const __TESTNET_CRYPTONOTE_PUBLIC_INTEGRATED_ADDRESS_BASE58_PREFIX = 2744722 // RYoE
const __TESTNET_CRYPTONOTE_PUBLIC_SUBADDRESS_BASE58_PREFIX = 3203474 // RYoU

const __STAGENET_CRYPTONOTE_PUBLIC_ADDRESS_BASE58_PREFIX = 219947410 // RYosT
const __STAGENET_CRYPTONOTE_PUBLIC_INTEGRATED_ADDRESS_BASE58_PREFIX = 532406674 // RYosE
const __STAGENET_CRYPTONOTE_PUBLIC_SUBADDRESS_BASE58_PREFIX = 238821778 // RYosU

export function cryptonoteBase58PrefixForStandardAddressOn(nettype) {
    if(nettype == null || typeof nettype === "undefined") {
        console.warn("Unexpected nil nettype")
    }
    if(nettype == network_type.MAINNET) {
        return __MAINNET_CRYPTONOTE_PUBLIC_ADDRESS_BASE58_PREFIX
    } else if(nettype == network_type.TESTNET) {
        return __TESTNET_CRYPTONOTE_PUBLIC_ADDRESS_BASE58_PREFIX
    } else if(nettype == network_type.STAGENET) {
        return __STAGENET_CRYPTONOTE_PUBLIC_ADDRESS_BASE58_PREFIX
    }
    throw "Illegal nettype"
}
export function cryptonoteBase58PrefixForIntegratedAddressOn(nettype) {
    if(nettype == null || typeof nettype === "undefined") {
        console.warn("Unexpected nil nettype")
    }
    if(nettype == network_type.MAINNET) {
        return __MAINNET_CRYPTONOTE_PUBLIC_INTEGRATED_ADDRESS_BASE58_PREFIX
    } else if(nettype == network_type.TESTNET) {
        return __TESTNET_CRYPTONOTE_PUBLIC_INTEGRATED_ADDRESS_BASE58_PREFIX
    } else if(nettype == network_type.STAGENET) {
        return __STAGENET_CRYPTONOTE_PUBLIC_INTEGRATED_ADDRESS_BASE58_PREFIX
    }
    throw "Illegal nettype"
}
export function cryptonoteBase58PrefixForSubAddressOn(nettype) {
    if(nettype == null || typeof nettype === "undefined") {
        console.warn("Unexpected nil nettype")
    }
    if(nettype == network_type.MAINNET) {
        return __MAINNET_CRYPTONOTE_PUBLIC_SUBADDRESS_BASE58_PREFIX
    } else if(nettype == network_type.TESTNET) {
        return __TESTNET_CRYPTONOTE_PUBLIC_SUBADDRESS_BASE58_PREFIX
    } else if(nettype == network_type.STAGENET) {
        return __STAGENET_CRYPTONOTE_PUBLIC_SUBADDRESS_BASE58_PREFIX
    }
    throw "Illegal nettype"
}
