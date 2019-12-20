import 'package:flutter/material.dart';

// 解决 PopupMenuButton 中文对齐问题
class PopupMenuButtonTheme extends StatelessWidget {
  final PopupMenuButton child;

  PopupMenuButtonTheme({@required this.child});

  @override
  Widget build(BuildContext context) {
    return Theme(
        data: Theme.of(context).copyWith(
            textTheme: TextTheme(
                subhead: TextStyle(
                    color: Colors.grey[700],
                    textBaseline: TextBaseline.alphabetic))),
        child: child);
  }
}
