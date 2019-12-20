export function setLineColor (themeClass, index = 0, vindex = 0) {
  let themeColor = ''
  switch (themeClass) {
    case 'themea':
      themeColor = '#43a9f8'
      break
    case 'themeb':
      themeColor = '#00afcf'
      break
    case 'themec':
      themeColor = '#22adf6'
      break
    case 'themed':
      themeColor = '#2196f3'
      break
  }
  let color = [
    [
      themeColor, "#3ed943", "#fd5e9d", "#9fe140", "#ababab",
      "#ff5a7c", "#6e56fb", "#3cdfcb", "#bfe540",
      "#b55cf9", "#3ccff3", "#7edf46", "#ff7446",
      "#3cdb87", "#4e52fd", "#3cdfab", "#8f58ff",
      "#d75ef9", "#3eb7f5", "#5adb44", "#ff8f42",
      "#ff62c1", "#3c68f9", "#3ce1eb", "#f7dd40",
      "#f966f9", "#409ff9", "#e3e940", "#fba942",
      "#fd62e5", "#3885f9", "#36d764", "#fdc33a"
    ],
    [
      '#fdc33a', '#36d764', '#3885f9', '#fd62e5', '#fba942'
    ]
  ]
  return color[vindex][index]
}
