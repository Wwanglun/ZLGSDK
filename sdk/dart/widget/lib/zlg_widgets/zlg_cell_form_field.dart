import 'package:flutter/material.dart';

import 'zlg_cell.dart';

typedef Future<T> FutureCallback<T>();

class ZLGCellFormField extends FormField<String> {
  ZLGCellFormField(
      {Key key,
      @required String title,
      @required String value,
      String placeHolder,
      FormFieldSetter<String> onSaved,
      FormFieldValidator<String> validator,
      FutureCallback<String> onTap})
      : super(
            key: key,
            initialValue: value,
            onSaved: onSaved,
            validator: validator,
            builder: (FormFieldState<String> field) {
              final InputDecoration effectiveDecoration =
                  const InputDecoration().applyDefaults(
                      Theme.of(field.context).inputDecorationTheme);
              var padding = effectiveDecoration.contentPadding;
              var errorText;
              if (field.errorText != null) {
                errorText = '   ${field.errorText}';
              }
              return InputDecorator(
                decoration: effectiveDecoration.copyWith(
                    errorText: errorText, contentPadding: EdgeInsets.all(0)
//                    padding.subtract(EdgeInsets.symmetric(vertical: 1.5))
                    ),
                isEmpty: value == null,
                child: ZLGCell(
                    title: title,
                    value: value ?? placeHolder ?? '',
                    fill: false,
                    hasBottomBorder: false,
                    onTap: () async {
                      if (onTap != null) {
                        var value = await onTap();
                        field.didChange(value);
                      }
                    }),
              );
            });
}
