import 'package:flutter/material.dart';

import '../constant/styles.dart';

class ZLGCell extends StatelessWidget {
  final String title;
  final String value;
  final VoidCallback onTap;
  final bool hasBottomBorder;
  final bool fill;

  ZLGCell({this.title, this.value, this.onTap, this.hasBottomBorder = true, this.fill = true});

  @override
  Widget build(BuildContext context) {
    return Ink(
        decoration: BoxDecoration(
            color: fill ? Colors.white : Colors.transparent,
            border: hasBottomBorder
                ? BorderDirectional(bottom: BorderSides.listBorder)
                : null),
        child: InkWell(
            onTap: onTap,
            child: Padding(
                padding: EdgeInsets.symmetric(vertical: 17, horizontal: 16),
                child: Row(
                  children: <Widget>[
                    Text(title, style: Theme.of(context).textTheme.subhead),
                    SizedBox(width: 10),
                    Expanded(
                        child: Text(
                      value ?? '--',
                      style: TextStyle(color: Colors.grey[500], fontSize: 15),
                      overflow: TextOverflow.ellipsis,
                      textAlign: TextAlign.right,
                    )),
                    Container(width: 5),
                    Icon(Icons.arrow_forward_ios,
                        size: 15,
                        color: onTap == null ? Colors.white : Colors.grey[400])
                  ],
                ))));
  }
}
