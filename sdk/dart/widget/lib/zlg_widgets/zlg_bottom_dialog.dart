import 'package:flutter/material.dart';

class ZLGBottomDialog extends StatelessWidget {
  final Widget child;
  final String title;

  ZLGBottomDialog({@required this.child, @required this.title});

  @override
  Widget build(BuildContext context) {
    return Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          Container(
              width: double.infinity,
              alignment: Alignment.center,
              color: Colors.grey[100],
              padding: EdgeInsets.symmetric(vertical: 12, horizontal: 10),
              child: Text(title ?? '',
                  style: TextStyle(color: Colors.grey[600], fontSize: 16))),
          Expanded(child: child)
        ]);
  }
}
