import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class ZLGTextFormField extends StatefulWidget {
  final TextEditingController controller;
  final Key fieldKey;
  final FocusNode focusNode;
  final TextInputType keyboardType;
  final TextInputAction textInputAction;
  final TextStyle style;
  final bool autofocus;
  final bool readOnly;
  final bool obscureText;
  final bool autocorrect;
  final bool autovalidate;
  final int maxLength;
  final ValueChanged<String> onChanged;
  final GestureTapCallback onTap;
  final VoidCallback onEditingComplete;
  final ValueChanged<String> onFieldSubmitted;
  final FormFieldSetter<String> onSaved;
  final FormFieldValidator<String> validator;
  final List<TextInputFormatter> inputFormatters;
  final bool enabled;
  final Color cursorColor;
  final int maxLines;
  final int minLines;

  final Widget suffixIcon;
  final Widget prefixIcon;
  final Widget suffixButton;
  final double suffixButtonWidth;
  final String labelText;
  final String hintText;
  final String helperText;
  final TextStyle labelStyle;
  final InputBorder enabledBorder;
  final InputBorder focusedBorder;
  final InputBorder errorBorder;
  final InputBorder focusedErrorBorder;
  final bool showCounter;

  final Color clearIconColor;

  ZLGTextFormField(
      {this.fieldKey,
      @required this.controller,
      this.focusNode,
      this.keyboardType,
      this.textInputAction,
      this.style,
      this.autofocus = false,
      this.readOnly = false,
      this.obscureText = false,
      this.autocorrect = true,
      this.autovalidate = false,
      this.maxLength,
      this.onChanged,
      this.onTap,
      this.onEditingComplete,
      this.onFieldSubmitted,
      this.onSaved,
      this.validator,
      this.inputFormatters,
      this.enabled = true,
      this.cursorColor,
      this.suffixIcon,
      this.prefixIcon,
      this.labelText,
      this.hintText,
      this.helperText,
      this.labelStyle,
      this.suffixButton,
      this.suffixButtonWidth = 100,
      this.enabledBorder,
      this.focusedBorder,
      this.errorBorder,
      this.focusedErrorBorder,
      this.clearIconColor,
      this.maxLines = 1,
      this.minLines,
      this.showCounter = false})
      : assert(controller != null);

  @override
  _ZLGTextFormFieldState createState() => _ZLGTextFormFieldState();
}

class _ZLGTextFormFieldState extends State<ZLGTextFormField> {
  FocusNode _focusNode;
  bool showClear = false;

  void _clear() {
    widget.controller.clear();
    widget.controller.selection = TextSelection.fromPosition(
        TextPosition(offset: 0, affinity: TextAffinity.downstream));
  }

  void _isShowClear() {
    showClear = _focusNode.hasFocus && widget.controller.text.isNotEmpty;
  }

  void _update() {
    setState(() {
      _isShowClear();
    });
  }

  void _nextFocus(String value) {
    FocusScope.of(context).focusInDirection(TraversalDirection.down);
  }

  Widget get suffixIcon {
    var icons = <Widget>[];
    if (widget.suffixIcon != null) {
      icons.add(widget.suffixIcon);
    }
    if (showClear) {
      if (widget.suffixIcon != null) {
        icons.insert(
            0,
            SizedBox(
              width: 10,
            ));
        icons.add(SizedBox(
          width: 12,
        ));
      }
      icons.insert(
          0,
          InkResponse(
              onTap: _clear,
              child: Icon(
                Icons.cancel,
                color: widget.clearIconColor ?? Theme.of(context).accentColor,
              )));
    }
    return icons.length > 0
        ? Padding(
            padding: EdgeInsets.only(
                right: widget.suffixButton == null
                    ? 0
                    : widget.suffixButtonWidth + 6),
            child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                mainAxisSize: MainAxisSize.min,
                children: icons))
        : null;
  }

  @override
  void initState() {
    super.initState();
    _focusNode = widget.focusNode ?? FocusNode();
    _focusNode.addListener(_isShowClear);
    widget.controller.addListener(_update);
  }

  @override
  void dispose() {
    super.dispose();
    _focusNode.removeListener(_isShowClear);
    widget.controller.removeListener(_update);
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget>[
        TextFormField(
          key: widget.fieldKey,
          controller: widget.controller,
          focusNode: _focusNode,
          keyboardType: widget.keyboardType,
          textInputAction: widget.textInputAction ?? TextInputAction.next,
          style: widget.style,
          autofocus: widget.autofocus,
          readOnly: widget.readOnly,
          obscureText: widget.obscureText,
          autocorrect: widget.autocorrect,
          autovalidate: widget.autovalidate,
          maxLength: widget.maxLength,
          onChanged: widget.onChanged,
          onTap: widget.onTap,
          cursorColor: widget.cursorColor,
          onEditingComplete: widget.onEditingComplete,
          maxLines: widget.maxLines,
          minLines: widget.minLines,
          onFieldSubmitted: (String value) {
            if (widget.onFieldSubmitted != null) {
              widget.onFieldSubmitted(value);
            } else {
              if (widget.textInputAction == TextInputAction.next ||
                  widget.textInputAction == null) {
                _nextFocus(value);
              }
            }
          },
          onSaved: widget.onSaved,
          validator: widget.validator,
          inputFormatters: widget.inputFormatters,
          enabled: widget.enabled,
          decoration: InputDecoration(
            prefixIcon: widget.prefixIcon,
            suffixIcon: suffixIcon,
            labelText: widget.labelText,
            labelStyle: widget.labelStyle ?? TextStyle(fontSize: 16),
            hintText: widget.hintText,
//              hintStyle: TextStyle(textBaseline: TextBaseline.alphabetic),
            helperText: widget.helperText,
//              alignLabelWithHint: true,
            enabledBorder: widget.enabledBorder,
            focusedBorder: widget.focusedBorder,
            errorBorder: widget.errorBorder,
            focusedErrorBorder: widget.focusedErrorBorder,
            counterText: widget.showCounter ? null : '',
          ),
        ),
        widget.suffixButton != null
            ? Positioned(
                right: 0,
                top: 5,
                child: Row(
                  children: <Widget>[
                    Container(
                      width: 1,
                      height: 36,
                      color: Colors.grey[400],
                    ),
                    SizedBox(
                        width: widget.suffixButtonWidth,
                        child: widget.suffixButton)
                  ],
                ))
            : SizedBox()
      ],
    );
  }
}
