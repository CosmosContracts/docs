---
description: >-
  A general introduction to gRPC Web UI.
cover: ../.gitbook/assets/Discord Invite (29).png
coverY: 258
---

## Introduction

## gRPC Web UI - BETA <a href="gRPC-Web-Ui" id="grpc-web-ui"></a>

The **gRPC Web UI** is a tool for querying gRPC. Currently in **BETA**, this web-based user interface allows you to interact with gRPC servers directly from browser. Similar to Postman, but specifically designed for gRPC APIs instead of REST.

This tool can be considered an extension to [grpcurl](https://github.com/fullstorydev/grpcurl). While `grpcurl` is a command-line interface, `grpcui` provides a web/browser-based GUI, allowing you to interactively construct requests to send to a gRPC server.

With this tool, you can also browse the schema for gRPC services, presented as a list of available endpoints. This is enabled either by querying a server that supports [server reflection](https://github.com/grpc/grpc/blob/master/src/proto/grpc/reflection/v1/reflection.proto), by reading proto source files, or by loading compiled "protoset" files (files that contain encoded file [descriptor protos](https://github.com/google/protobuf/blob/master/src/google/protobuf/descriptor.proto)). The tool uses this schema to transform JSON request data into binary encoded protobufs. Therefore, if the server you interact with does not support reflection, you will need the proto source files that define the service or the protoset files that `grpcui` can use.

![gRPC Web UI](../.gitbook/assets/grpc-web-ui.jpeg)

## What is gRPCui?

gRPCui is a command-line tool that provides a web-based user interface for gRPC. It allows to:
- Query gRPC servers
- Interact with gRPC APIs
- Visualize responses in a user-friendly format

## Features

`grpcui` supports all RPC methods, including streaming. However, you must construct the entire stream of request messages at once, and it renders the entire response stream at once, unlike `grpcurl` which allows bidirectional interaction.

- `grpcui` supports plain-text and TLS servers, with various TLS configuration options, including mutual TLS with client certificates.

- `grpcui` works seamlessly with servers that support reflection. If not, you can supply .proto source files or protoset files (compiled descriptors from protoc).

- The web UI lets you set request metadata and define request messages using a dynamic HTML form, supporting all protobuf message types, including well-known types, one ofs, and maps. You can also enter data in JSON format.

- Upon issuing an RPC, the web UI displays all gRPC response metadata, including headers and trailers, and presents the response body in a human-readable HTML table.

![gRPC Web UI](../.gitbook/assets/grpc-web-ui-2.jpeg)

## How to Use gRPCui

1. Access the tool at [https://juno.grpcui.chaintools.host/](https://juno.grpcui.chaintools.host/) or install the tool from [grpcui](https://github.com/fullstorydev/grpcui/).

To be an example, let's query tokenfactory module params. For this, choose osmosis.tokenfactory.v1beta1.Query service name.
![Service Name](./service_name.png)

Then, choose Params method name:

![Method Name](../.gitbook/assets/grpc-web-ui-method_name.png)

2. Use the interface to query the server and visualize the responses.

![Request](../.gitbook/assets/grpc-web-ui-request.png)

And, the response:

![Response](../.gitbook/assets/grpc-web-ui-response.png)


## Credits

[ChainTools](https://chaintools.tech).

- **@fullstorydev**: For the base code.
- **@sascha1337**: For their work in getting this tool up and running.
- **@qf3l3k_tech**: For connecting to servers.
