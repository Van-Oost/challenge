$( document ).ready(function(){
    retrieveList()
    updateCounter()
    dragNdrop()

    $(".delete").click(function(){
        $(this).parent().remove();
        //saveList();
        updateCounter();
     });
});
    

function dragNdrop(){
    $( "#sortable" ).sortable({
        items:".sortable-item",
        containment: "parent",
        cursor: "move",
        animation: 150,
    });
}


$("#clear").click(function() {
    $("#inputText").val(null);
    $("#inputImage").val(null);
    clearPeview()
});

// Saves the list in local storage after it is dragged and dropped
$('#sortable').on('sortupdate',function(){
    saveList();
 });





function addItem(){ 
    
};

function editItem(){

};

function checkLength(){
    
};


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

//variables to store the data for the new item on the list
var uploadedImage;
var uploadedText;


// uploads the image and generates the preview
$("#inputImage").change(function(){

    var previewContainer = document.getElementById("imagePreview");
    var preview = previewContainer.querySelector(".imagePreview_img");
    var defText = previewContainer.querySelector(".defaultText");
    var file = this.files[0]

    console.log(file)    
    if(file){
        if(checkImageType(file)){

            var reader = new FileReader();
        
            showPreview()

            reader.addEventListener("load", function() {
                var image = new Image();
                image.src = this.result
                preview.setAttribute("src", this.result);

                image.onload = function() {
                    checkImageSize(image, defText, preview)
                    };

                uploadedImage = image;
                console.log(uploadedImage)

            });
            
            reader.readAsDataURL(file);
            
        };
    }
    else {
        clearPeview()  
    };
});


// shows the preview image
function showPreview(){
    var previewContainer = document.getElementById("imagePreview");
    var preview = previewContainer.querySelector(".imagePreview_img");
    var defText = previewContainer.querySelector(".defaultText");
    defText.style.display = "none";
    preview.style.display = "block";
}

// clears the preview image
function clearPeview(){
    var previewContainer = document.getElementById("imagePreview");
    var preview = previewContainer.querySelector(".imagePreview_img");
    var defText = previewContainer.querySelector(".defaultText");
    defText.style.display = null;
    preview.style.display = null;
}


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


// ches the dimensions of the image
function checkImageSize(image, defText, preview){
    if(!(image.width===320 || image.height===320)){
        alert("Image size must be 320 X 320 pixels")
        clearPeview()
        $("#inputImage").val(null);
}};

