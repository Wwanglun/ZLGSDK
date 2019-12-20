import 'package:flutter/material.dart';

class ActionButton extends StatelessWidget {
  final VoidCallback onPressed;
  final String title;

  ActionButton(this.title, {this.onPressed});

  @override
  Widget build(BuildContext context) {
    return Center(
        child: Padding(
            padding: EdgeInsets.only(right: 10),
            child: ButtonTheme(
                minWidth: 54,
                height: 32,
                child: RaisedButton(
                    padding: EdgeInsets.symmetric(horizontal: 0),
                    color: Colors.green,
                    textColor: Colors.white,
                    child: Text(title, style: TextStyle(fontSize: 16)),
                    onPressed: onPressed))));
  }
}
