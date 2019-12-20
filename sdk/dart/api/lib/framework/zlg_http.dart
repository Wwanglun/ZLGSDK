import 'dart:convert';

export 'package:dio/dio.dart';
export 'package:http_parser/http_parser.dart';
import 'package:dio/dio.dart';
import 'package:cookie_jar/cookie_jar.dart';
import 'package:dio_cookie_manager/dio_cookie_manager.dart';
import 'package:dio_http2_adapter/dio_http2_adapter.dart';
import 'package:dio/native_imp.dart';

import '../util/util.dart';

class Methods {
  static const get = 'get';
  static const post = 'post';
  static const delete = 'delete';
  static const head = 'head';
  static const put = 'put';
  static const patch = 'patch';
}

class ZlgHttp {
  static ZlgHttp instance;
  Dio dio;

  ZlgHttp([BaseOptions options]){
    dio = Dio(options);
    dio.interceptors.add(InterceptorsWrapper(
      onRequest: (RequestOptions options){
        print('Dio request method: ${options.method}, uri: ${Uri.decodeComponent(options.uri.toString())}');
      },
      onResponse: (Response r){
//        print('RequestOptions: $r');
      }
    ));
    dio.interceptors.add(CookieManager(CookieJar()));
  }

  static ZlgHttp getInstance(
      {String baseUrl = 'https://www.zlgcloud.com/v1', int timeout = 3000}) {
    if (instance == null) {
      instance = new ZlgHttp(BaseOptions(
          baseUrl: baseUrl, connectTimeout: timeout, receiveTimeout: timeout));
//      instance.interceptors.add(CookieManager(CookieJar()));
    }
    return instance;
  }

  Future<Response<T>> fetch<T>(
      {String url,
      String method = 'get',
      data,
      Map<String, dynamic> params}) async {
    if(params != null) {
      params = Util.deleteEmptyMapEntity(params);
      params = params.map((String key, dynamic value){
        if(value is Map || value is List) {
          return MapEntry(key, jsonEncode(value));
        } else {
          return MapEntry(key, value);
        }
      });
    }
    return dio.request<T>(url,
        data: data, queryParameters: params, options: Options(method: method));
  }
}
