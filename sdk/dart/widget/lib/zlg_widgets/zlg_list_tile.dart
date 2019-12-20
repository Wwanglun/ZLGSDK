import 'package:flutter/material.dart';

import '../constant/styles.dart';

class ZLGListTile extends ListTile {
  final bool hasBottomBorder;
  final Color backgroundColor;

  ZLGListTile(
      {this.hasBottomBorder = true,
      this.backgroundColor = Colors.white,
      Key key,
      Widget leading,
      Widget title,
      Widget subtitle,
      Widget trailing,
      bool isThreeLine = false,
      bool dense,
      EdgeInsetsGeometry contentPadding,
      bool enabled = true,
      VoidCallback onTap,
      GestureLongPressCallback onLongPress,
      bool selected = false})
      : super(
            key: key,
            leading: leading,
            title: title,
            subtitle: subtitle,
            trailing: trailing,
            isThreeLine: isThreeLine,
            dense: dense,
            contentPadding: contentPadding,
            enabled: enabled,
            onTap: onTap,
            onLongPress: onLongPress,
            selected: selected);

  @override
  Widget build(BuildContext context) {
    return Ink(
        decoration: BoxDecoration(
            color: backgroundColor,
            border: hasBottomBorder
                ? BorderDirectional(bottom: BorderSides.listBorder)
                : null),
        child: super.build(context));
  }
}
