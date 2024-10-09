/**
* Remixer: @herkulano (http://www.herkulano.com)
* Thanks to: Niels Bosma (niels.bosma@motorola.com)
*/

var all = {
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

var folder = Folder.selectDialog()
var document = app.activeDocument

if (document && folder) {
  if (!folder.exists) {
    folder.create()
  }
  for (var fileName in all) {
    saveToRes(all[fileName], fileName)
  }
}

function saveToRes(scaleTo, fileName) {
  scaleTo = scaleTo / document.width * 100.0
  var i
  var layer
  var file
  var options

  for (i = document.layers.length - 1; i >= 0; i--) {
    layer = document.layers[i]
    if (!layer.locked && layer.name.indexOf("!") === -1) {
      hideAllLayers()
      layer.visible = true

      file = new File(folder.fsName + "/" + fileName + ".png")

      options = new ExportOptionsPNG24()
      options.antiAliasing = true
      options.transparency = true
      options.artBoardClipping = true
      options.verticalScale = scaleTo
      options.horizontalScale = scaleTo

      document.exportFile(file, ExportType.PNG24, options)
    }
  }
}

function hideAllLayers() {
  var i
  var layer

  for (i = document.layers.length - 1; i >= 0; i--) {
    layer = document.layers[i]
    if (!layer.locked && layer.name.indexOf("!") === -1) {
      layer.visible = false
    }
  }
}
