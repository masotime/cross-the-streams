# cross-the-streams
Mucking around with Node streams and lzma-native

I wanted to test if I could have asynchronous internet streams (mocked as setTimeout readstreams from files) combined into a single compressed output stream.

The `lzma-native` library appears buggy though - once a stream is created the Node application refuses to shut down.
