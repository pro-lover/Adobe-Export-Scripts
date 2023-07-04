// Export Layer Coordinates - Adobe Photoshop Script
// Description: Export x and y coordinates to comma seperated .txt file
// Requirements: Adobe Photoshop CS5 (have not tested on CS4)
// Version: 1.0-beta1.1, 8/31/2011
// Author: Chris DeLuca
// Company: Playmatics
// ===============================================================================
// Installation:
// 1. Place script in
//        Mac: '~/Applications/Adobe Photoshop CS#/Presets/Scripts/'
//        Win: 'C:\Program Files\Adobe\Adobe Photoshop CS#\Presets\Scripts\'
// 2. Restart Photoshop
// 3. Choose File > Scripts > Export Layer Coordinates Photoshop
// ===============================================================================

// Enables double-click launching from the Mac Finder or Windows Explorer
#target photoshop

// Bring application forward
app.bringToFront();

// Set active Document variable and decode name for output
var docRef = app.activeDocument;
var docName = decodeURI(activeDocument.name);

(function() {
  var artboards = docRef.layers;

var visibleArtboards = [];
for (var i=0; i< artboards.length; i++)
{
    if(artboards[i].visible)
    {
      visibleArtboards.push(artboards[i].name);
    }
}
  var  f;
  var fileType;
  var win = new Window("dialog", "CMDBANNER.IO EXPORT OPTIONS", [150, 150, 460, 650]);
   
  //Changing text
  var visibleArtboard = docRef.layerSets.getByName(visibleArtboards[0]);
  var titleGroup = visibleArtboard.layers.getByName("copy");

  var titleLayer = titleGroup.layers[0];
  var copyContent = titleLayer.textItem.contents;

  // Add a panel
	win.radioPanel = win.add("panel", [25, 105, 285, 230], "Export Options");
	win.statictextPanel = win.add("panel", [25, 250, 285, 395], "Edit Text Group");
 

	// Add checkboxes.contents
	win.statictextPanel.statictextOne = win.statictextPanel.add("statictext", [10, 15, 300, 35], "Edit copy");
  win.statictextPanel.edittextOne = win.statictextPanel.add('edittext {properties: {name: "edittextOne"}}', [10, 45, 300, 65] ); 
  win.statictextPanel.edittextOne.text = copyContent; 


	win.statictextPanel.statictextFour = win.statictextPanel.add("statictext", [10, 75, 300, 95], "Rasterize Layers");


	// Add radio buttons
	win.radioPanel.radOne = win.radioPanel.add("radiobutton", [10, 15, 300, 35], "PNG");
	win.radioPanel.radTwo = win.radioPanel.add("radiobutton", [10, 45, 300, 65], "GIF");
	win.radioPanel.radThree = win.radioPanel.add("radiobutton", [10, 75, 300, 95], "JPG");

  win.folderPanel = win.add("panel", [25, 15, 285, 90], "Save to");
  win.folderPanel.orientation = "row";
    // select folder
    win.folderPanel.btnFolderInput = win.folderPanel.add("button",[10, 15, 100, 35], "folder...");
    win.folderPanel.txtFolderInput = win.folderPanel.add("statictext",[100, 15, 220, 35], "", {
      truncate: "middle"
    });

	// bounds = [left, top, right, bottom]
  win.btnPanel = win.add("panel", [25, 430, 285, 480], );
	win.btnPanel.orientation = "row";
	// Add the components, two buttons
	win.btnPanel.okBtn = win.btnPanel.add("button", [10, 15, 100, 35], "CONTINUE");
	win.btnPanel.cancelBtn = win.btnPanel.add("button", [150, 15, 220, 35], "CANCEL");
	// Register event listeners that define the button behavior
  	// Event listener for the radio buttons
	win.radioPanel.radOne.onClick = win.radioPanel.radTwo.onClick = win.radioPanel.radThree.onClick = function () {
		var selected = "";

		if(win.radioPanel.radOne.value) {
			selected = "PNG";
			fileType = ".png";
		}
		else if(win.radioPanel.radTwo.value) {
			selected = "GIF";
			fileType = ".gif";
		}
		else if(win.radioPanel.radThree.value) {
			selected = "JPG";
			fileType = ".jpg";
		}
		//win.radioPanel.radTxtOne.text = selected;
	};
  win.folderPanel.btnFolderInput.onClick = function () {
    f = Folder.selectDialog();
    if (f) {
      win.folderPanel.txtFolderInput.text = f.fullName;
    }
  };

  win.btnPanel.okBtn.onClick = function () {
    win.close(1);
  }

  win.btnPanel.cancelBtn.onClick = function () {
    win.close(0);
  }

	if(win.show() == 1) {
    Process(docName,visibleArtboards);
  }

  function Process(docName,visibleArtboards) {
    
    for(var i=0;i<visibleArtboards.length;i++)
    {
      alert(visibleArtboards[i]);
    }

    titleLayer.textItem.contents = win.statictextPanel.edittextOne.text;
  }

  // Output
  function exportOutput(docName) {
    if(fileType != undefined){
      if(fileType == ".jpg"){
        var file = new File(f.fullName + '/' + docName + fileType);
        var opts = new JPEGSaveOptions();
        opts.quality = 10;
        docRef.saveAs(file, opts,true);
      }else if( fileType == ".png" ){
        alert("png file not found");
      }else if( fileType == ".gif"){
        alert("gif file not found");
      }
  }
}

})();









