import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class ZLGInputFormField extends FormField<String> {
  ZLGInputFormField({
    Key key,
    this.controller,
    this.label,
    String initialValue,
    FocusNode focusNode,
    InputDecoration decoration = const InputDecoration(),
    TextInputType keyboardType,
    TextCapitalization textCapitalization = TextCapitalization.none,
    TextInputAction textInputAction,
    TextStyle style,
    StrutStyle strutStyle,
    TextDirection textDirection,
    TextAlign textAlign = TextAlign.start,
    bool autofocus = false,
    bool readOnly = false,
    ToolbarOptions toolbarOptions,
    bool showCursor,
    bool obscureText = false,
    bool autocorrect = true,
    bool autovalidate = false,
    bool maxLengthEnforced = true,
    int maxLines = 1,
    int minLines,
    bool expands = false,
    int maxLength,
    ValueChanged<String> onChanged,
    GestureTapCallback onTap,
    VoidCallback onEditingComplete,
    ValueChanged<String> onFieldSubmitted,
    FormFieldSetter<String> onSaved,
    FormFieldValidator<String> validator,
    List<TextInputFormatter> inputFormatters,
    bool enabled = true,
    double cursorWidth = 2.0,
    Radius cursorRadius,
    Color cursorColor,
    Brightness keyboardAppearance,
    EdgeInsets scrollPadding = const EdgeInsets.all(20.0),
    bool enableInteractiveSelection = true,
    InputCounterWidgetBuilder buildCounter,
  }) : super(
          key: key,
          initialValue:
              controller != null ? controller.text : (initialValue ?? ''),
          onSaved: onSaved,
          validator: validator,
          autovalidate: autovalidate,
          enabled: enabled,
          builder: (FormFieldState<String> field) {
            final _InputFormFieldState state = field;
            final InputDecoration effectiveDecoration = (decoration ??
                    const InputDecoration())
                .applyDefaults(Theme.of(field.context).inputDecorationTheme);
            void onChangedHandler(String value) {
              if (onChanged != null) {
                onChanged(value);
              }
              field.didChange(value);
            }

            return InputDecorator(
                decoration:
                    effectiveDecoration.copyWith(errorText: field.errorText),
                child: Row(children: <Widget>[
                  label == null
                      ? SizedBox()
                      : Text(
                          label,
                          style: Theme.of(field.context).textTheme.subhead,
                        ),
                  Expanded(
                      child: TextField(
                    controller: state._effectiveController,
                    decoration: null,
                    focusNode: focusNode,
                    keyboardType: keyboardType,
                    textInputAction: textInputAction,
                    style: style,
                    strutStyle: strutStyle,
                    textAlign: textAlign,
                    textDirection: textDirection,
                    textCapitalization: textCapitalization,
                    autofocus: autofocus,
                    toolbarOptions: toolbarOptions,
                    readOnly: readOnly,
                    showCursor: showCursor,
                    obscureText: obscureText,
                    autocorrect: autocorrect,
                    maxLengthEnforced: maxLengthEnforced,
                    maxLines: maxLines,
                    minLines: minLines,
                    expands: expands,
                    maxLength: maxLength,
                    onChanged: onChangedHandler,
                    onTap: onTap,
                    onEditingComplete: onEditingComplete,
                    onSubmitted: onFieldSubmitted,
                    inputFormatters: inputFormatters,
                    enabled: enabled,
                    cursorWidth: cursorWidth,
                    cursorRadius: cursorRadius,
                    cursorColor: cursorColor,
                    scrollPadding: scrollPadding,
                    keyboardAppearance: keyboardAppearance,
                    enableInteractiveSelection: enableInteractiveSelection,
                    buildCounter: buildCounter,
                  ))
                ]));
          },
        );

  final TextEditingController controller;
  final String label;

  @override
  _InputFormFieldState createState() => _InputFormFieldState();
}

class _InputFormFieldState extends FormFieldState<String> {
  TextEditingController _controller;

  TextEditingController get _effectiveController =>
      widget.controller ?? _controller;

  @override
  ZLGInputFormField get widget => super.widget;

  @override
  void initState() {
    super.initState();
    if (widget.controller == null) {
      _controller = TextEditingController(text: widget.initialValue);
    } else {
      widget.controller.addListener(_handleControllerChanged);
    }
  }

  @override
  void didUpdateWidget(ZLGInputFormField oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.controller != oldWidget.controller) {
      oldWidget.controller?.removeListener(_handleControllerChanged);
      widget.controller?.addListener(_handleControllerChanged);

      if (oldWidget.controller != null && widget.controller == null)
        _controller =
            TextEditingController.fromValue(oldWidget.controller.value);
      if (widget.controller != null) {
        setValue(widget.controller.text);
        if (oldWidget.controller == null) _controller = null;
      }
    }
  }

  @override
  void dispose() {
    widget.controller?.removeListener(_handleControllerChanged);
    super.dispose();
  }

  @override
  void reset() {
    super.reset();
    setState(() {
      _effectiveController.text = widget.initialValue;
    });
  }

  void _handleControllerChanged() {
    // Suppress changes that originated from within this class.
    //
    // In the case where a controller has been passed in to this widget, we
    // register this change listener. In these cases, we'll also receive change
    // notifications for changes originating from within this class -- for
    // example, the reset() method. In such cases, the FormField value will
    // already have been set.
    if (_effectiveController.text != value)
      didChange(_effectiveController.text);
  }
}
