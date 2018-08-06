var serialNumberId, numberOfCells;

function removeElement(parentDiv, childDiv){
    if (childDiv == parentDiv){
        alert("The parent div cannot be removed.");
    }
    else if (document.getElementById(childDiv)){
        var child = document.getElementById(childDiv);
        var parent = document.getElementById(parentDiv);
        parent.removeChild(child);
    }
    else{
        alert("Child div has already been removed or does not exist.");
        return false;
    }
}

function zeroVars(){
    serialNumber = "";
    numberOfCells = "";
}

function cellButtonClicked(val){
    // numberOfCells = val;
    // var ccForm = document.getElementById('chooseCellsForm');
    // console.log(`value: ${val}`);
    // document.ccForm.submit();
    console.log('entered');
}

function renderReadingsTextBoxes(){
    var placeHolder = document.getElementById("placeHolder");
    placeHolder.innerHTML = '';
}



