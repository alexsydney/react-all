/*
 * Copyright (c) 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * AppDispatcher
 *
 * A singleton that operates as the central hub for application updates.
 */

var Dispatcher = require('flux').Dispatcher;

/**
 *  Return singleton instance of Flux Dispatcher that holds list of callbacks.
 *  Actions are dispatched using this Flux Dispatcher.
 *  Stores register with this Flux Dispatcher to be informed when Actions occur
 */
module.exports = new Dispatcher();