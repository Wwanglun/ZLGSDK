import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';

void showZLGDatePicker(BuildContext context,
    {ValueChanged<DateTime> onSelected,
    String title,
    String cancelText = '取消',
    String confirmText = '确定',
    DateTime initialDateTime,
    CupertinoDatePickerMode mode = CupertinoDatePickerMode.dateAndTime}) {
  DateTime select = DateTime.now();
  final picker = CupertinoDatePicker(
    onDateTimeChanged: (date) {
      select = date;
    },
    use24hFormat: true,
    initialDateTime: initialDateTime,
    mode: mode,
  );

  var buttonTextStyle =
      TextStyle(color: Theme.of(context).accentColor, fontSize: 16);
  showCupertinoModalPopup(
      context: context,
      builder: (context) {
        return Container(
            height: 250,
            child: Column(children: <Widget>[
              Container(
                  color: Colors.grey[100],
                  padding: EdgeInsets.symmetric(horizontal: 5),
                  child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: <Widget>[
                        FlatButton(
                            onPressed: () {
                              Navigator.of(context).pop();
                            },
                            child: Text(cancelText, style: buttonTextStyle)),
                        Text(
                          title ?? '',
                          style: Theme.of(context).textTheme.subhead,
                        ),
                        FlatButton(
                            onPressed: () {
                              if (onSelected != null) {
                                onSelected(select);
                              }
                              Navigator.of(context).pop();
                            },
                            child: Text(confirmText, style: buttonTextStyle)),
                      ])),
              Expanded(child: picker)
            ]));
      });
}
