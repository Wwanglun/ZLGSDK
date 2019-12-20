import 'dart:async';
import 'dart:convert' as convert;
import 'package:meta/meta.dart';

import 'package:web_socket_channel/io.dart';
import 'package:flutter/material.dart';

class ZLGSocket {
  IOWebSocketChannel _socket;
  Stream<Map> stream;

  ZLGSocket.connect({@required String url, @required String token}) {
    _socket =
        IOWebSocketChannel.connect(url, pingInterval: Duration(minutes: 2));
    stream = _socket.stream.map<Map>(_translateMessage);
    _loginCloud(token);
  }

  Map _translateMessage(dynamic msg) {
    Map message = convert.jsonDecode(msg);
    if (message['action'] == 'notify') {
      List infoList = message['data']['topic'].toString().split('/');
      String deviceType = infoList[3];
      String deviceId = infoList[4];
      String eventType = infoList[5];
      Map data = message['data']['payload'];
      return {
        'deviceType': deviceType,
        'deviceId': deviceId,
        'eventType': eventType,
        'data': data
      };
    } else if (message['action'] == 'close') {
      return {'message': message['data']['message']};
    }
    return null;
  }

  void _loginCloud(String token) {
    var login = {
      'action': 'login',
      'data': {'token': token}
    };
    send(convert.jsonEncode(login));
  }

  void addCloudDevicesDataListener(
      List<SimpleDevice> devices, EventType event) {
    var data = {
      'action': 'addListener',
      'data': {
        'event': event.toString().split('.').last,
        'devices': devices.map((device) => device.toJson()).toList()
      }
    };
    send(convert.jsonEncode(data));
  }

  void removeCloudDevicesDataListener(
      List<SimpleDevice> devices, EventType event) {
    var data = {
      'action': 'removeListener',
      'data': {
        'event': event.toString().split('.').last,
        'devices': devices.map((device) => device.toJson()).toList()
      }
    };
    send(convert.jsonEncode(data));
  }

  void send(String message) async {
    _socket.sink.add(message);
  }

  void close() {
    _socket.sink.close();
  }
}

class SimpleDevice {
  String deviceType;
  String deviceId;

  SimpleDevice({this.deviceType, this.deviceId});

  SimpleDevice.fromJson(Map<String, dynamic> json) {
    deviceId = json['devid'];
    deviceType = json['devtype'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['devid'] = this.deviceId;
    data['devtype'] = this.deviceType;
    return data;
  }
}

enum EventType { offline, online, status, raw, data, log, error, warning }
