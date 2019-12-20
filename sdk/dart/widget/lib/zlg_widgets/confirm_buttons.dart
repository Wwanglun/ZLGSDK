import 'package:flutter/material.dart';

import '../constant/styles.dart';

class ConfirmButtons extends StatelessWidget {
  final VoidCallback onConfirm;
  final VoidCallback onCancel;
  final String confirmText;
  final String cancelText;

  ConfirmButtons(
      {this.onConfirm,
      this.onCancel,
      this.confirmText = '确定',
      this.cancelText = '取消'});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: 20),
      child:
          Row(mainAxisAlignment: MainAxisAlignment.center, children: <Widget>[
        Expanded(
            child: RaisedButton(
                onPressed: onCancel,
                child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      Text(
                        cancelText,
                        style: TextStyle(
                            color: Colors.grey[500],
                            fontSize: 16,
                            letterSpacing: 15),
                      )
                    ]),
                color: Colors.white,
                shape: ShapeBorders.transparentRadius20)),
        SizedBox(
          width: 20,
        ),
        Expanded(
            child: RaisedButton(
                onPressed: onConfirm,
                child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      Text(
                        confirmText,
                        style: TextStyle(
                            color: Colors.white,
                            fontSize: 16,
                            letterSpacing: 15),
                      )
                    ]),
                color: Theme.of(context).accentColor,
                shape: ShapeBorders.transparentRadius20))
      ]),
    );
  }
}
