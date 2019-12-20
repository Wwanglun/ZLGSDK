import 'package:meta/meta.dart';

import '../base/client_error_code.dart';
import '../base/zlg_base_module.dart';
import '../framework/zlg_http.dart';
import '../util/util.dart';

class ZLGDeviceCommand extends ZLGBaseModule {
  static ZLGDeviceCommand _instance;

  factory ZLGDeviceCommand() {
    if (_instance == null) {
      _instance = ZLGDeviceCommand._internal();
    }
    return _instance;
  }

  ZLGDeviceCommand._internal();

  Future getDeviceCommands(
      {@required String deviceType, @required String deviceId}) {
    assert(deviceType != null && deviceId != null);
    return fetch(
        url: '/devices/$deviceId/commands',
        method: Methods.get,
        params: {'devtype': deviceType}).catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{404: ClientErrorCode.ZLG_DEVICE_NOT_EXIST};
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future sendCommandToDevice(
      {@required String deviceType,
      @required String deviceId,
      num timeout,
      @required String cmdType,
      @required String cmd,
      @required Map<String, dynamic> args}) {
    assert(
        deviceType != null && deviceId != null && cmd != null && args != null);
    assert(cmdType == 'confirmed' || cmdType == 'unconfirmed');
    return fetch(
            url: '/devices/$deviceId/commands/$cmd',
            method: Methods.put,
            params: Util.deleteEmptyMapEntity({
              'devtype': deviceType,
              'timeout': timeout,
              'cmdtype': cmdType
            }),
            data: Util.deleteEmptyMapEntity(args))
        .catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{404: ClientErrorCode.ZLG_COMMAND_NOT_EXIST};
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future sendRawCommandToDevice(
      {@required String deviceType,
      @required String deviceId,
      @required String dataType,
      @required String raw}) {
    assert(deviceType != null &&
        deviceId != null &&
        dataType != null &&
        raw != null);
    assert(dataType == 'hex' || dataType == 'ascii' || dataType == 'base64');
    return fetch(
        url: '/devices/$deviceId/command/raw',
        method: Methods.put,
        params: Util.deleteEmptyMapEntity(
            {'devtype': deviceType, 'datatype': dataType}),
        data: Util.deleteEmptyMapEntity({'raw': raw})).catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{};
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future sendStatusCommandToDevice(
      {@required String deviceType,
      @required String deviceId,
      int timeout,
      @required String cmdType,
      @required Map<String, dynamic> args}) {
    assert(deviceType != null &&
        deviceId != null &&
        cmdType != null &&
        args != null);
    print('sendStatusCommandToDevice args: $args');
    return fetch(
            url: '/devices/$deviceId/commands/set_config',
            method: Methods.put,
            params: Util.deleteEmptyMapEntity({
              'devtype': deviceType,
              'timeout': timeout,
              'cmdtype': cmdType
            }),
            data: Util.deleteEmptyMapEntity(args))
        .catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{
          404: ClientErrorCode.ZLG_COMMAND_NOT_EXIST,
          408: ClientErrorCode.ZLG_SEND_COMMAND_NO_RSP
        };
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }
}
