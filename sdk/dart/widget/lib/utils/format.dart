import 'package:intl/intl.dart';

class Format {
  static String formatTimeFromMilliseconds(int milliseconds, [String pattern]) {
    if(milliseconds == null) return '--';
    DateTime dateTime = DateTime.fromMillisecondsSinceEpoch(milliseconds);
    return formatTime(dateTime, pattern);
//    pattern = pattern ?? 'yyyy-MM-dd HH:mm:ss';
//    return DateFormat(pattern).format(dateTime);
  }

  static String formatTime(DateTime dateTime, [String pattern]) {
    pattern = pattern ?? 'yyyy-MM-dd HH:mm:ss';
    return DateFormat(pattern).format(dateTime);
  }
}