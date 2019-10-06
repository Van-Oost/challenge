///initializes de document and rebuilds the list
$( document ).ready(function(){

    retrieveList();
    updateCounter();
    dragNdrop();
    startButtons();

});

//global variable Initialization
var uploadedImage = null;
var uploadedText;
var listEntry;
var previewContainer = document.getElementById("imagePreview");
var preview = previewContainer.querySelector(".imagePreview_img");
var defText = previewContainer.querySelector(".defaultText");


    
// implements the drag and drop sorting
function dragNdrop(){
    $( "#sortable" ).sortable({
        items:".sortable-item",
        containment: "parent",
        cursor: "move",
        animation: 150,
    });
}


// starts or updates buttons functionalities after the list is built or re-built
function startButtons(){

    //deletes the list entry
    $(".delete").click(function(){
        $(this).parent().remove();
        saveList();
        updateCounter();
     });

     //loads the list entry into the input fields to be edited
     $(".edit").click(function() {
        listEntry = ($(this).parent().html());
        children = ($(this).parent().children());
        uploadedImage = children[0];
        uploadedText = children[1].innerHTML;
        $("#inputText").val(uploadedText);
        showPreview()
        loadEditedimage()
        $(this).parent().remove(); 
        updateCounter();

    });
    
};


// saves the input fields
$("#save").click(function() {

    if(checkInputFields()){
        
        var imgSrc = uploadedImage.getAttribute('src');
        uploadedText = $("#inputText").val()
        $("#sortable").prepend(
            "<li class=\"sortable-item\"> <img class=\"picture\"src=\""+imgSrc+"\"/> <p class=\"description\">"+uploadedText+"</p> <button class=\"edit\">EDIT</button> <button class=\"delete\">DELETE</button> </li>"
        );
        uploadedImage = null;
        $("#sortable").sortable( "refresh" );
        startButtons();
        alert("item saved")
        clearInputs();
        clearPeview()
        saveList();
        updateCounter();
  
    };
});
    


$("#clear").click(function() {
    clearInputs()
    clearPeview()
    updateCounter();
    uploadedImage = null;
});

$("#undo").click(function() {
    clearInputs()
    clearPeview()
    if(listEntry!=null){
        $("#sortable").prepend("<li class=\"sortable-item\">"+listEntry+"</li>");
        $("#sortable").sortable( "refresh" );
        startButtons();
        updateCounter();
        listEntry = null;
        uploadedImage = null;
    }
});






// Saves the list in local storage after it is dragged and dropped
$('#sortable').on('sortupdate',function(){
    saveList();
 });



// Updates the counter after changes are made to the list
function updateCounter(){
    var itemCount = document.getElementById("sortable").getElementsByClassName("sortable-item").length;
    var counter = document.getElementById("counter");
    counter.innerHTML = itemCount+" ITEMS";
};


// saves the list in local storage
function saveList(){
        var listContents = [];
        $("#sortable").each(function(){
            $(".sortable-item").each(function(){
                 listContents.push(this.innerHTML);
            })       
        })
        localStorage.setItem("itemsList", JSON.stringify(listContents));
};


//gets the list from local storage and rebuilds it
function retrieveList(){
    if (localStorage.getItem("itemsList") !== null){
        var obtainedList = JSON.parse(localStorage.getItem("itemsList"));
        $("#sortable").html("")
        obtainedList.forEach(e => {
            $("#sortable").append("<li class=\"sortable-item\">"+e+"</li>");
        });
    };
};



// uploads the image and generates the preview
$("#inputImage").change(function(){

    var file = this.files[0]   
    if(file){
        if(checkImageType(file)){
            
            showPreview();
            getImgURL(file);
        };
    }
    else {
        clearPeview()  
    };
});


// shows the preview image
function showPreview(){
    defText.style.display = "none";
    preview.style.display = "block";
}

// clears all input fields
function clearInputs(){
    $("#inputText").val(null);
    $("#inputImage").val(null);
}

// clears the preview image
function clearPeview(){
    defText.style.display = null;
    preview.style.display = null;
}



//loads a custom image in the preview box
function loadEditedimage(){

    var image = new Image();
    var imgSource = uploadedImage.getAttribute("src");
    image.src = imgSource;
    image.alt = uploadedImage.getAttribute("alt");
    preview.setAttribute("src", imgSource);
    uploadedImage = image;
};

//gets the image as url
function getImgURL(file){

    var reader = new FileReader();
    reader.addEventListener("load", function() {
        var image = new Image();
        image.src = this.result
        preview.setAttribute("src", this.result);

        image.onload = function() {
            checkImageSize(image, defText, preview)
            };

        uploadedImage = image;

    });
    
    reader.readAsDataURL(file);
    return 
};


// checks if the image is of the appropiate type
function checkImageType(file){
    if((file.type==="image/jpeg")|(file.type==="image/png")|(file.type==="image/x-png")|(file.type==="image/gif")){
       return true;
    } else {
        alert("The image must be JPG, GIF, or PNG");
        $("#inputImage").val(null);
        return false;
    };
};


// checks the dimensions of the image
function checkImageSize(image){
    if(!(image.width===320 || image.height===320)){
        alert("Image size must be 320 X 320 pixels")
        clearPeview()
        $("#inputImage").val(null);
}};

// checks if an image is base64
function isBase64(str) {
    try {
        return btoa(atob(str)) == str;
    } catch (err) {
        return false;
    }
}

// checks that the input fields are filled
function checkInputFields(){

    var txt = $("#inputText").val();
    var img = uploadedImage
    

    if(( txt === "" )&&( img === null )){

        alert("nothing to save");
        return false;

    } else if( txt === "" ){

        alert("Text must be between 1 and 300 chars");
        return false;

    } else if( img === null){

        alert( "the item must have an image" );
        return false;

    } else  return true;
};