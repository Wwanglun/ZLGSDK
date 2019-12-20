import 'package:flutter/cupertino.dart';

import '../base/client_error_code.dart';
import '../base/zlg_base_module.dart';
import '../framework/zlg_http.dart';
import '../util/util.dart';

class ZLGRule extends ZLGBaseModule {
  static ZLGRule _instance;

  factory ZLGRule() {
    if (_instance == null) {
      _instance = ZLGRule._internal();
    }
    return _instance;
  }

  ZLGRule._internal();

  Future getRules({int skip, int limit, Map<String, dynamic> filter}) async {
    Map params = <String, dynamic>{
      'filter': filter,
      'skip': skip,
      'limit': limit
    };
    return fetch(url: '/rules', method: Methods.get, params: params)
        .catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{};
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future addRule(
      {String name,
      String desc,
      String dataType,
      String select,
      String from,
      String where,
      String status,
      bool record}) async {
    Map data = <String, dynamic>{
      "name": name,
      "desc": desc,
      "data_type": dataType,
      "select": select,
      "from": from,
      "where": where,
      "status": status,
      "record": record
    };
    return fetch(url: '/rules', method: Methods.post, data: data)
        .catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{};
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future modifyRule(
      {String id, String desc, String select, String where}) async {
    Map data = <String, dynamic>{
      "desc": desc,
      "select": select,
      "where": where
    };
    return fetch(url: '/rules/$id', method: Methods.put, data: data)
        .catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{};
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future deleteRuleById({@required String id}) {
    return fetch(url: '/rules/$id', method: Methods.delete).catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{};
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future changeRuleStatus({String id, String status}) async {
    Map data = <String, dynamic>{"status": status};
    return fetch(url: '/rules/status/$id', method: Methods.patch, data: data)
        .catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{};
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future getRuleActions(
      {int skip, int limit, Map<String, dynamic> filter}) async {
    Map params = <String, dynamic>{
      'filter': filter,
      'skip': skip,
      'limit': limit
    };
    return fetch(url: '/rule_actions', method: Methods.get, params: params)
        .catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{};
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future<Response> addRuleAction(
      {@required String ruleId,
      @required String kind,
      @required Map<String, dynamic> config}) async {
    Map data = <String, dynamic>{
      'rule_id': ruleId,
      'kind': kind,
      'config': config
    };
    return fetch(url: '/rule_actions', method: Methods.post, data: data)
        .catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{};
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future<Response> deleteRuleActionById({@required String id}) async {
    return fetch(url: '/rule_actions/$id', method: Methods.delete)
        .catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{};
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future<Response> modifyRuleAction(
      {@required String id, @required Map<String, dynamic> config}) async {
    return fetch(
        url: '/rule_actions/$id',
        method: Methods.put,
        data: {'config': config}).catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{};
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }
}
