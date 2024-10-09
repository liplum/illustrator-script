/**
* Remixer: @herkulano (http://www.herkulano.com)
* Thanks to: Niels Bosma (niels.bosma@motorola.com)
*/

var allSize = {
  "1024x1024": 1024,
  "512x512": 512,
  "256x256": 256,
  "180x180": 180,
  "167x167": 167,
  "152x152": 152,
  "128x128": 128,
  "120x120": 120,
  "87x87": 87,
  "80x80": 80,
  "76x76": 76,
  "64x64": 64,
  "60x60": 60,
  "58x58": 58,
  "40x40": 40,
  "32x32": 32,
  "29x29": 29,
  "20x20": 20,
  "16x16": 16,
}

main()

function main() {
  var folder = Folder.selectDialog()
  var document = app.activeDocument
  if (!folder) return
  if (!document) {
    alert("Please open a docuement.", "Error")
    return
  }
  if (!folder.exists) {
    folder.create()
  }
  try {
    for (var size in allSize) {
      saveToRes(document, folder, allSize[size], size)
    }
  } catch (err) {
    alert(err, "Error")
    return
  }

  alert("All images are exported.", "Success")
}

function saveToRes(document, folder, scaleTo, fileName) {
  scaleTo = scaleTo / document.width * 100.0
  for (var i = document.layers.length - 1; i >= 0; i--) {
    var layer = document.layers[i]
    if (!layer.visible) continue;
    if (layer.name.indexOf("!") !== -1) continue;

    var file = new File(folder.fsName + "/" + fileName + ".png")

    var options = new ExportOptionsPNG24()
    options.antiAliasing = true
    options.transparency = true
    options.artBoardClipping = true
    options.verticalScale = scaleTo
    options.horizontalScale = scaleTo

    document.exportFile(file, ExportType.PNG24, options)
  }
}

