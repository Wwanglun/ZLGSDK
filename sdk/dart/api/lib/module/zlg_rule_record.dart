import 'dart:convert';

import '../base/client_error_code.dart';
import '../base/zlg_base_module.dart';
import '../framework/zlg_http.dart';
import '../util/util.dart';

class ZLGRuleRecord extends ZLGBaseModule {
  static ZLGRuleRecord _instance;

  factory ZLGRuleRecord() {
    if (_instance == null) {
      _instance = ZLGRuleRecord._internal();
    }
    return _instance;
  }

  ZLGRuleRecord._internal();

  Future getRecords(
      {String owner,
      bool descend,
      Map<String, dynamic> filter,
      int skip,
      int limit}) {
    Map params = Util.deleteEmptyMapEntity(<String, dynamic>{
      'filter': filter,
      'skip': skip,
      'limit': limit,
      'descend': descend
    });
    print('params: $params');
    return fetch(url: '/records/$owner', method: Methods.get, params: params)
        .catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{};
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future deleteRecords({String owner}) {
    return fetch(url: '/records/$owner', method: Methods.delete)
        .catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{};
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }
}
