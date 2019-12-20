import 'package:flutter/material.dart';

class ZLGSwitchFormField extends FormField<bool> {
  ZLGSwitchFormField({
    Key key,
    @required bool value,
    @required this.onChanged,
    String label,
    FormFieldSetter<bool> onSaved,
    FormFieldValidator<bool> validator,
  }) : super(
            key: key,
            initialValue: value,
            onSaved: onSaved,
            validator: validator,
            builder: (FormFieldState<bool> field) {
              final InputDecoration effectiveDecoration =
                  const InputDecoration().applyDefaults(
                      Theme.of(field.context).inputDecorationTheme);
              var padding = effectiveDecoration.contentPadding;
              return InputDecorator(
                decoration: effectiveDecoration.copyWith(
                    errorText: field.errorText,
                    contentPadding:
                        padding.subtract(EdgeInsets.symmetric(vertical: 1.5))),
                isEmpty: value == null,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: <Widget>[
                    Text(
                      label,
                      style: Theme.of(field.context).textTheme.subhead,
                    ),
                    Switch(
                        value: value,
                        onChanged: field.didChange,
                        materialTapTargetSize: MaterialTapTargetSize.shrinkWrap)
                  ],
                ),
              );
            });

  final ValueChanged<bool> onChanged;

  @override
  FormFieldState<bool> createState() => _ZLGSwitchFormFieldState();
}

class _ZLGSwitchFormFieldState extends FormFieldState<bool> {
  @override
  ZLGSwitchFormField get widget => super.widget;

  @override
  void didChange(bool value) {
    super.didChange(value);
    if (widget.onChanged != null) widget.onChanged(value);
  }
}
