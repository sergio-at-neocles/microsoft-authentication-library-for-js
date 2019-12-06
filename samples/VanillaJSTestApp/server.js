/*
*  Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license.
*  See LICENSE in the source repository root for complete license information.
*/

// Initialize variables.
const app = require("./app");
const PORT = 30662;

// Start the server.
app.listen(PORT, function() {
    console.log('Listening on port ' + PORT + '...');
});
