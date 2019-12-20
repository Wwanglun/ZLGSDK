import 'package:flutter/material.dart';

import 'client_error_code.dart';
import '../framework/zlg_http.dart';

class ZLGBaseModule {
  ValueChanged<int> errorHandler;

  void init({String baseUrl, int timeout}) {
    ZlgHttp.getInstance(baseUrl: baseUrl, timeout: timeout);
  }

  Future<Response<T>> fetch<T>(
      {String url,
      String method = 'get',
      data,
      Map<String, dynamic> params}) async {
    return ZlgHttp.getInstance()
        .fetch<T>(url: url, method: method, data: data, params: params);
  }

  void setErrorHandler(ValueChanged<int> handler) {
    errorHandler = handler;
  }

  void handleError(Map<int, int> errorMap, Response errResponse) {
    print('handleError err: $errResponse');
    int status, code;
    if(errResponse == null) {
      status = 1000;
    } else {
      status = errResponse.statusCode;
      code = errResponse.data['code'];
    }
    var commonErrorMap = {
      400: ClientErrorCode.ZLG_PARAM_WRONG,
      401: ClientErrorCode.ZLG_NOT_LOGIN,
      403: ClientErrorCode.ZLG_FORBIDDEN,
      408: ClientErrorCode.ZLG_REQUEST_TIMEOUT,
      500: ClientErrorCode.ZLG_SERVER_ERROR,
      1000: ClientErrorCode.ZLG_NO_NETWORK
    };
    var errorCode = code ??
        errorMap[status] ??
        commonErrorMap[status] ??
        ClientErrorCode.ZLG_UNKNOW;
    if (errorHandler != null) {
      errorHandler(errorCode);
    } else {
      throw {'errorCode': errorCode};
    }
  }
}
