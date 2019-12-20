import 'package:flutter/cupertino.dart';

import '../base/client_error_code.dart';
import '../base/zlg_base_module.dart';
import '../framework/zlg_http.dart';
import '../util/util.dart';

class ZLGDeviceType extends ZLGBaseModule {
  static ZLGDeviceType _instance;

  factory ZLGDeviceType() {
    if (_instance == null) {
      _instance = ZLGDeviceType._internal();
    }
    return _instance;
  }

  ZLGDeviceType._internal();

  Future getDeviceTypesInfo(
      {Map filter,
      int skip,
      int limit,
      String aggregation,
      bool descend = false}) {
    Map params = Util.deleteEmptyMapEntity(<String, dynamic>{
      'filter': filter,
      'skip': skip,
      'limit': limit,
      'aggregation': aggregation,
      'descend': descend
    });
    return fetch(url: '/devtype', method: Methods.get, params: params).catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{};
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future addDeviceType(
      {String deviceType,
      String baseType,
      bool enableSecret,
      String deviceTypeSecret,
      String comment}) {
    Map data = Util.deleteEmptyMapEntity(<String, dynamic>{
      'devtype': deviceType,
      'basetype': baseType,
      'enable_secret': enableSecret,
      'dtype_secret': deviceTypeSecret,
      'comment': comment
    });
    return fetch(url: '/devtype', method: Methods.post, data: data).catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{};
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future deleteDeviceTypeByType({@required String deviceType}) async {
    return fetch(url: '/devtype/$deviceType', method: Methods.delete).catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{};
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future modifyDeviceTypeCommonInfo(
      {String deviceType,
      String comment,
      bool enableSecret,
      String deviceTypeSecret}) async {
    Map data = Util.deleteEmptyMapEntity({
      'comment': comment,
      'enable_secret': enableSecret,
      'dtype_secret': deviceTypeSecret
    });
    return fetch(url: '/devtype/$deviceType', method: Methods.put, data: data).catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{
          404: ClientErrorCode.ZLG_DEVICE_TYPE_NOT_EXIST
        };
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future modifyDeviceTypeCommandsInfo(
      {String deviceType, Map<String, dynamic> data}) async {
    data = Util.deleteEmptyMapEntity(data);
    return fetch(
        url: '/devtype/$deviceType/commands', method: Methods.put, data: data).catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{
          404: ClientErrorCode.ZLG_DEVICE_TYPE_NOT_EXIST
        };
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future modifyDeviceTypeDataInfo(
      {String deviceType, Map<String, dynamic> data}) {
    data = Util.deleteEmptyMapEntity(data);
    return fetch(
        url: '/devtype/$deviceType/data', method: Methods.put, data: data).catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{
          404: ClientErrorCode.ZLG_DEVICE_TYPE_NOT_EXIST
        };
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future modifyDeviceTypeStatusInfo(
      {String deviceType, Map<String, dynamic> data}) async {
    data = Util.deleteEmptyMapEntity(data);
    return fetch(
        url: '/devtype/$deviceType/status', method: Methods.put, data: data).catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{
          404: ClientErrorCode.ZLG_DEVICE_TYPE_NOT_EXIST
        };
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future modifyDeviceTypeLogsInfo(
      {String deviceType, Map<String, dynamic> data}) {
    data = Util.deleteEmptyMapEntity(data);
    return fetch(
        url: '/devtype/$deviceType/logs', method: Methods.put, data: data).catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{
          404: ClientErrorCode.ZLG_DEVICE_TYPE_NOT_EXIST
        };
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }
}
