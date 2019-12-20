import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';

import 'zlg_text_form_field.dart';

showLoadingDialog(BuildContext context, {String message = ''}) {
  showTransparentDialog(
      context: context,
      builder: (BuildContext context) {
        return Center(
            child: Container(
                padding: EdgeInsets.symmetric(vertical: 15, horizontal: 20),
                decoration: BoxDecoration(
                    color: Color(0xFF3A3A3A),
                    borderRadius: BorderRadius.all(Radius.circular(10))),
                child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    mainAxisSize: MainAxisSize.min,
                    children: <Widget>[
                      SizedBox(
                        width: 50,
                        child: SpinKitFadingCircle(
                          color: Colors.white,
                          size: 40.0,
                        ),
                      ),
                      SizedBox(height: message.isEmpty ? 0 : 15, width: 1),
                      message.isEmpty
                          ? SizedBox()
                          : Text(
                              message,
                              style: TextStyle(
                                  fontSize: 15,
                                  color: Colors.white,
                                  fontWeight: FontWeight.w500,
                                  decoration: TextDecoration.none),
                            )
                    ])));
      });
}

Future<T> showTransparentDialog<T>({
  @required BuildContext context,
  bool barrierDismissible = false,
  WidgetBuilder builder,
}) {
  final ThemeData theme = Theme.of(context, shadowThemeOnly: true);
  return showGeneralDialog(
    context: context,
    pageBuilder: (BuildContext buildContext, Animation<double> animation,
        Animation<double> secondaryAnimation) {
      final Widget pageChild = Builder(builder: builder);
      return SafeArea(
        child: Builder(builder: (BuildContext context) {
          return theme != null
              ? Theme(data: theme, child: pageChild)
              : pageChild;
        }),
      );
    },
    barrierDismissible: barrierDismissible,
    barrierLabel: MaterialLocalizations.of(context).modalBarrierDismissLabel,
    barrierColor: const Color(0x00FFFFFF),
    transitionDuration: const Duration(milliseconds: 150),
    transitionBuilder: _buildMaterialDialogTransitions,
  );
}

Widget _buildMaterialDialogTransitions(
    BuildContext context,
    Animation<double> animation,
    Animation<double> secondaryAnimation,
    Widget child) {
  return FadeTransition(
    opacity: CurvedAnimation(
      parent: animation,
      curve: Curves.easeOut,
    ),
    child: child,
  );
}

typedef StringCallback = void Function(String value);

class InputDialog extends StatefulWidget {
  final StringCallback onConfirm;
  final VoidCallback onCancel;
  final FormFieldValidator<String> validator;
  final String title;
  final String hint;
  final bool obscureText;
  final Widget suffixIcon;
  final String value;
  final int maxLength;
  final bool showCounter;
  final TextInputType keyboardType;

  InputDialog(
      {this.onConfirm,
      this.onCancel,
      this.validator,
      this.title,
      this.hint,
      this.obscureText = false,
      this.suffixIcon,
      this.value,
      this.maxLength,
      this.showCounter = false,
      this.keyboardType});

  @override
  _InputDialogState createState() => _InputDialogState();
}

class _InputDialogState extends State<InputDialog> {
  TextEditingController controller;
  GlobalKey<FormFieldState> inputKey;

  bool autoValidate;
  bool showText;

  @override
  void initState() {
    super.initState();
    var value = widget.value ?? '';
    controller = TextEditingController.fromValue(TextEditingValue(
        text: value,
        selection: TextSelection.fromPosition(TextPosition(
            affinity: TextAffinity.downstream, offset: value.length))));
    inputKey = GlobalKey<FormFieldState>();

    autoValidate = false;
    showText = false;
  }

  @override
  void dispose() {
    super.dispose();
    controller.dispose();
  }

  @override
  Widget build(BuildContext context) {
    var theme = Theme.of(context);
    return AlertDialog(
      title: Text(widget.title),
      contentPadding: EdgeInsets.only(left: 16, right: 16, bottom: 0, top: 10),
      content: Theme(
        data: theme.copyWith(
            inputDecorationTheme: theme.inputDecorationTheme.copyWith(
                contentPadding:
                    EdgeInsets.only(left: 10, right: 0, top: 14, bottom: 14))),
        child: ZLGTextFormField(
          fieldKey: inputKey,
          controller: controller,
          hintText: widget.hint,
          autovalidate: autoValidate,
          validator: widget.validator,
          obscureText: widget.obscureText && !showText ? true : false,
          autofocus: true,
          maxLength: widget.maxLength,
          showCounter: widget.showCounter,
          keyboardType: widget.keyboardType,
          textInputAction: TextInputAction.done,
          onChanged: (val) {
            setState(() {});
          },
          suffixIcon: widget.obscureText
              ? InkResponse(
                  radius: 16,
                  splashColor: Colors.white70,
                  onTap: () {
                    setState(() {
                      showText = !showText;
                    });
                  },
                  child: Icon(
                      showText ? Icons.visibility_off : Icons.visibility,
                      size: 24))
              : null,
        ),
      ),
      actions: <Widget>[
        FlatButton(onPressed: () {
          Navigator.of(context).pop();
          if(widget.onCancel != null) {
            widget.onCancel();
          }
        }, child: Text('取消')),
        FlatButton(
            onPressed: () {
              if (inputKey.currentState.validate()) {
                if (widget.onConfirm != null) {
                  widget.onConfirm(controller.text);
                }
              }
              setState(() {
                autoValidate = true;
              });
            },
            child: Text('确定'))
      ],
    );
  }
}
