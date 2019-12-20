import 'dart:io';

import 'package:meta/meta.dart';

import '../base/client_error_code.dart';
import '../base/zlg_base_module.dart';
import '../framework/zlg_http.dart';
import '../util/util.dart';

class ZLGUser extends ZLGBaseModule {
  static ZLGUser _instance;

  factory ZLGUser() {
    if (_instance == null) {
      _instance = ZLGUser._internal();
    }
    return _instance;
  }

  ZLGUser._internal();

  Future login({@required String username, @required String password}) async {
    return fetch(
        url: '/auth/login',
        method: Methods.post,
        data: {'username': username, 'password': password}).catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{
          400: ClientErrorCode.ZLG_LOGIN_PARAM_WRONG,
          401: ClientErrorCode.ZLG_LOGIN_SERVER_REFUSE,
          403: ClientErrorCode.ZLG_FREQUENT_OPERATION,
          404: ClientErrorCode.ZLG_LOGIN_NO_USER
        };
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future logout() async {
    return fetch(url: '/auth/logout', method: Methods.get).catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{};
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future modifyUserInfo(
      {@required String username,
      String code,
      @required Map<String, dynamic> info}) async {
    return fetch(
            url: '/users/$username',
            method: Methods.put,
            params: code == null ? null : {'code': code},
            data: info)
        .catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{
          400: ClientErrorCode.ZLG_MODIFY_USER_PARAM_WRONG
        };
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future changeAvatar({@required String username, @required File file}) async {
    var path = file.path;
    var name = path.substring(path.lastIndexOf("/") + 1, path.length);
    var suffix = name.substring(name.lastIndexOf(".") + 1, name.length);
    FormData formData = FormData.fromMap({
      'file': await MultipartFile.fromFile(path,
          filename: name, contentType: MediaType.parse("image/$suffix"))
    });
    return fetch(
            url: '/users/$username/avatar',
            method: Methods.post,
            data: formData)
        .catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{
          400: ClientErrorCode.ZLG_CHANGE_AVATAR_PARAM_WRONG
        };
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future<bool> isUsernameExist({@required String username}) async {
    try {
      await fetch(
          url: '/auth/user_exist',
          method: Methods.get,
          params: {'username': username});
      return true;
    } on DioError catch (err) {
      if (err.response != null && err.response.statusCode == 404) {
        return false;
      } else {
        var errorMap = <int, int>{
          400: ClientErrorCode.ZLG_USER_EXIST_PARAM_WRONG
        };
        handleError(errorMap, err.response);
        throw err;
      }
    }
  }

  Future<bool> isEmailExist({@required String email}) async {
    try {
      await fetch(
          url: '/auth/email_exist',
          method: Methods.get,
          params: {'email': email});
      return true;
    } on DioError catch (err) {
      if (err.response != null && err.response.statusCode == 404) {
        return false;
      } else {
        var errorMap = <int, int>{
          400: ClientErrorCode.ZLG_EMAIL_EXIST_PARAM_WRONG
        };
        handleError(errorMap, err.response);
        throw err;
      }
    }
  }

  Future<bool> isMobileExist({@required String mobile}) async {
    try {
      await fetch(
          url: '/auth/mobile_exist',
          method: Methods.get,
          params: {'mobile': mobile});
      return true;
    } on DioError catch (err) {
      print('isMobileExist error: ${err.toString()}');
      if (err.response != null && err.response.statusCode == 404) {
        return false;
      } else {
        var errorMap = <int, int>{
          400: ClientErrorCode.ZLG_MOBILE_EXIST_PARAM_WRONG
        };
        handleError(errorMap, err.response);
        throw err;
      }
    }
  }

  Future getRegisterMobileVerifyCode({@required String mobile}) {
    assert(mobile != null);
    return ZlgHttp.getInstance().fetch(
        url: '/auth/smscode',
        method: Methods.get,
        params: {'mobile': mobile}).catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{
          400: ClientErrorCode.ZLG_SMSCODE_PARAM_WRONG,
          403: ClientErrorCode.ZLG_FREQUENT_OPERATION
        };
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future getResetPasswordVerifyCode(
      {@required String username, @required String type}) {
    return fetch(
        url: '/auth/recover_password',
        method: Methods.get,
        params: {'username': username, 'type': type}).catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{
          400: ClientErrorCode.ZLG_GET_RECOVER_PWD_CODE_PARAM_WRONG,
          403: ClientErrorCode.ZLG_FORBIDDEN,
          404: ClientErrorCode.ZLG_GET_RECOVER_PWD_CODE_NOT_EXIST
        };
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future resetPassword(
      {@required String code,
      @required String username,
      @required String password}) {
    var data = {'code': code, 'username': username, 'password': password};
    print('resetPassword params: $data');
    return fetch(url: '/auth/reset_password', method: Methods.post, data: data)
        .catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{
          400: ClientErrorCode.ZLG_RESET_PWD_PARAM_WRONG,
          404: ClientErrorCode.ZLG_RESET_PWD_NOT_EXIST
        };
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future changePassword(
      {@required String oldPassword, @required String newPassword}) {
    var data = {'oldpassword': oldPassword, 'password': newPassword};
    return fetch(url: '/auth/change_password', method: Methods.post, data: data)
        .catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{
          400: ClientErrorCode.ZLG_CHANGE_PWD_PARAM_WRONG
        };
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future getModifyMobileVerifyCode({String mobile}) {
    return fetch(
        url: '/auth/change_mobile_verify_code',
        method: Methods.get,
        params: {'mobile': mobile}).catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{
          400: ClientErrorCode.ZLG_GET_MOBILE_CODE_PARAM_WRONG
        };
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future getModifyEmailVerifyCode({String email}) {
    return fetch(
        url: '/auth/change_email_verify_code',
        method: Methods.get,
        params: {'email': email}).catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{
          400: ClientErrorCode.ZLG_GET_EMAIL_CODE_PARAM_WRONG
        };
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }

  Future register(
      {@required String username,
      @required String password,
      @required String mobile,
      @required String code,
      bool isagent = false,
      String email}) {
    var data = Util.deleteEmptyMapEntity(<String, dynamic>{
      'username': username,
      'password': password,
      'mobile': mobile,
      'code': code,
      'isagent': isagent,
      'email': email
    });
    return fetch(url: '/users', method: Methods.post, data: data)
        .catchError((err) {
      if (err is DioError) {
        var errorMap = <int, int>{
          400: ClientErrorCode.ZLG_REGISTER_PARAM_WRONG,
          402: ClientErrorCode.ZLG_REGISTER_USER_EXIST
        };
        handleError(errorMap, err.response);
      }
      throw err;
    });
  }
}
