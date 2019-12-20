import 'dart:async';

import 'package:flutter/cupertino.dart';
import 'package:zlg_api/framework/zlg_http.dart';

import '../base/client_error_code.dart';
import '../base/zlg_base_module.dart';
import '../util/util.dart';

class ZLGProject extends ZLGBaseModule {
  static ZLGProject _instance;

  factory ZLGProject() {
    if (_instance == null) {
      _instance = ZLGProject._internal();
    }
    return _instance;
  }

  ZLGProject._internal();

  Future getProjectsInfo(
      {Map<String, dynamic> filter,
      int skip,
      int limit,
      String aggregation,
      bool descend = true}) async {
    Map params = Util.deleteEmptyMapEntity(<String, dynamic>{
      'filter': filter,
      'skip': skip,
      'limit': limit,
      'aggregation': aggregation,
      'descend': descend
    });
    return fetch(url: '/projects', method: Methods.get, params: params)
        .catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{};
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future deleteProjects({List<String> ids}) {
    return fetch(url: '/projects/batch/delete', method: Methods.post, data: ids)
        .catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{404: ClientErrorCode.ZLG_PROJECT_NOT_EXIST};
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future deleteProjectById({String id}) {
    return fetch(url: '/projects/$id', method: Methods.delete)
        .catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{404: ClientErrorCode.ZLG_PROJECT_NOT_EXIST};
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future addProject(
      {String projectName,
      String desc,
      List<Map<String, dynamic>> devices,
      List<Map<String, dynamic>> relations}) {
    Map data = {
      'projectname': projectName,
      'desc': desc,
      'device': devices,
      'relation': relations
    };
    return fetch(url: '/projects', method: Methods.post, data: data)
        .catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{
          409: ClientErrorCode.ZLG_DUPLICATE_PROJECT_NAME
        };
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future modifyProject(
      {@required String projectId,
      String projectName,
      String desc,
      List<Map<String, dynamic>> devices,
      List<Map<String, dynamic>> relations}) {
    Map data = {
      'projectname': projectName,
      'desc': desc,
      'device': devices,
      'relation': relations
    };
    return fetch(url: '/projects/$projectId', method: Methods.put, data: data)
        .catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{
          404: ClientErrorCode.ZLG_PROJECT_NOT_EXIST,
          409: ClientErrorCode.ZLG_DUPLICATE_PROJECT_NAME
        };
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }
}
