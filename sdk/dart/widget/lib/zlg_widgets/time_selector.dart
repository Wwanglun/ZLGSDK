import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import '../utils/format.dart';

import 'zlg_date_picker.dart';

typedef TimeCallback = void Function(DateTime startTime, DateTime endTime);

class TimeSelector extends StatefulWidget {
  final TimeCallback onTimeSelected;
  final DateTime startTime;
  final DateTime endTime;

  TimeSelector({this.onTimeSelected, this.startTime, this.endTime}) {
//    print('TimeSelector startTime: $startTime, endTime: $endTime');
  }

  @override
  State createState() => _TimeSelectorState();
}

class _TimeSelectorState extends State<TimeSelector> {
  DateTime startTime;
  DateTime endTime;

  final _textStyle = TextStyle(color: Colors.grey[600]);

  @override
  void initState() {
    super.initState();
    startTime = widget.startTime;
    endTime = widget.endTime;
  }

  @override
  Widget build(BuildContext context) {
    return Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: <Widget>[
          RaisedButton(
            onPressed: () {
              showZLGDatePicker(context,
                  title: '开始时间',
                  initialDateTime: startTime, onSelected: (date) {
                if (endTime != null && date.isAfter(endTime)) {
                  Fluttertoast.showToast(msg: '开始时间不能大于结束时间');
                  return;
                }
                setState(() {
                  startTime = date;
                });
                if (widget.onTimeSelected != null) {
                  widget.onTimeSelected(startTime, endTime);
                }
              });
            },
            color: Colors.white,
            child: Text(
              startTime == null
                  ? '  请选择开始时间  '
                  : Format.formatTimeFromMilliseconds(
                      startTime.millisecondsSinceEpoch, 'yyyy-MM-dd HH:mm'),
              style: _textStyle,
            ),
          ),
          Text('至'),
          RaisedButton(
            onPressed: () {
              showZLGDatePicker(context,
                  title: '结束时间', initialDateTime: endTime, onSelected: (date) {
                if (startTime != null && date.isBefore(startTime)) {
                  Fluttertoast.showToast(msg: '结束时间不能小于开始时间');
                  return;
                }
                setState(() {
                  endTime = date;
                });
                if (widget.onTimeSelected != null) {
                  widget.onTimeSelected(startTime, endTime);
                }
              });
            },
            color: Colors.white,
            child: Text(
              endTime == null
                  ? '  请选择结束时间  '
                  : Format.formatTimeFromMilliseconds(
                      endTime.millisecondsSinceEpoch, 'yyyy-MM-dd HH:mm'),
              style: _textStyle,
            ),
          )
        ]);
  }
}
