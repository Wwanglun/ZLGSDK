import '../base/client_error_code.dart';
import '../base/zlg_base_module.dart';
import '../framework/zlg_http.dart';

class ZLGCustomData extends ZLGBaseModule {
  static ZLGCustomData _instance;

  factory ZLGCustomData() {
    if (_instance == null) {
      _instance = ZLGCustomData._internal();
    }
    return _instance;
  }

  ZLGCustomData._internal();

  Future getCustomData(
      {Map<String, dynamic> filter,
      int skip,
      int limit,
      String aggregation,
      Map<String, dynamic> order}) async {
    return fetch(url: '/project_datas', method: Methods.get, params: {
      'filter': filter,
      'skip': skip,
      'limit': limit,
      'aggregation': aggregation,
      'order': order
    }).catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{};
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }
}
