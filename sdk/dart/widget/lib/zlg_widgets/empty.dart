import 'package:flutter/material.dart';

class Empty extends StatelessWidget {
  final String title;
  final String actionTitle;
  final VoidCallback onActionTap;

  Empty({@required this.title, this.actionTitle = '返回', this.onActionTap});

  @override
  Widget build(BuildContext context) {
    return Container(
        color: Colors.white,
        padding: EdgeInsets.symmetric(vertical: 30),
        child: Center(
            child: Column(
          mainAxisSize: MainAxisSize.min,
          children: <Widget>[
            Icon(
              Icons.highlight_off,
              size: 80,
              color: Colors.grey[400],
            ),
            SizedBox(height: 15),
            Text(
              title,
              style: TextStyle(color: Colors.grey[800]),
            ),
            SizedBox(height: 15),
            RaisedButton(
              color: Theme.of(context).accentColor,
              onPressed: onActionTap ??
                  () {
                    Navigator.of(context).pop();
                  },
              child: Text(
                actionTitle,
                style: TextStyle(color: Colors.white),
              ),
            )
          ],
        )));
  }
}
