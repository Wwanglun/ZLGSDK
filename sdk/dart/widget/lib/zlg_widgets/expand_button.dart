import 'package:flutter/material.dart';

class ExpandButton extends StatelessWidget {
  final VoidCallback onPressed;
  final Widget child;
  final Color color;

  ExpandButton({this.onPressed, this.child, this.color});

  @override
  Widget build(BuildContext context) {
    return RaisedButton(
        color: color ?? Theme.of(context).accentColor,
        padding: EdgeInsets.symmetric(vertical: 8),
        shape: RoundedRectangleBorder(
            side: BorderSide(color: Colors.transparent, width: 0),
            borderRadius: BorderRadius.all(Radius.circular(20.0))),
        onPressed: onPressed,
        child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[child]));
  }
}
