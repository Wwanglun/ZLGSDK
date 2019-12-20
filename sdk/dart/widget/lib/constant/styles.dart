import 'package:flutter/material.dart';

class TextStyles {
  static final white16 = TextStyle(color: Colors.white, fontSize: 16);
  static final lightWhite = TextStyle(color: Colors.white60);
  static final grey400 = TextStyle(color: Colors.grey[400]);
  static final listTitle = TextStyle(fontSize: 19, color: Colors.grey[700]);
}

class InputBorders {
  static final bottomWhiteBorder = UnderlineInputBorder(
      borderSide: BorderSide(width: 0.5, color: Colors.white));
  static final bottomRedBorder = UnderlineInputBorder(
      borderSide: BorderSide(width: 0.5, color: Colors.red[400]));
  static final bottomGreyBorder = UnderlineInputBorder(
      borderSide: BorderSide(width: 0.5, color: Colors.grey[400]));
  static final bottomCyanBorder = UnderlineInputBorder(
      borderSide: BorderSide(width: 0.5, color: Colors.cyan));
}

class InputDecorations {
  static final whiteDecoration = InputDecoration(
      contentPadding: EdgeInsets.only(left: 0, right: 0, top: 10, bottom: 5),
      labelStyle: TextStyles.lightWhite,
      border: InputBorders.bottomWhiteBorder,
      enabledBorder: InputBorders.bottomWhiteBorder,
      focusedBorder: InputBorders.bottomWhiteBorder,
      errorBorder: InputBorders.bottomRedBorder,
      focusedErrorBorder: InputBorders.bottomRedBorder);
}

class BorderSides {
  static final listBorder = BorderSide(color: Colors.grey[300], width: 0.5);
}

class ShapeBorders {
  static final whiteRadius20 = RoundedRectangleBorder(
      side: BorderSide(color: Colors.white, width: 1),
      borderRadius: BorderRadius.all(Radius.circular(20.0)));
  static final transparentRadius20 = RoundedRectangleBorder(
      side: BorderSide(color: Colors.transparent, width: 1),
      borderRadius: BorderRadius.all(Radius.circular(20.0)));
}
