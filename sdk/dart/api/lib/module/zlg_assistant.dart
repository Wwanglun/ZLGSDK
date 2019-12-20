import '../base/client_error_code.dart';
import '../base/zlg_base_module.dart';
import '../framework/zlg_http.dart';

class ZLGAssistant extends ZLGBaseModule {
  static ZLGAssistant _instance;

  factory ZLGAssistant() {
    if (_instance == null) {
      _instance = ZLGAssistant._internal();
    }
    return _instance;
  }

  ZLGAssistant._internal();

  Future getDeviceSchema() async {
    return fetch(url: '/dev/device_schema', method: Methods.get)
        .catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{};
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }
}
