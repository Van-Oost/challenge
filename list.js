$( document ).ready(function(){
    retrieveList()
    updateCounter()
    dragNdrop()
});
    

function dragNdrop(){
    $( "#sortable" ).sortable({
        items:".sortable-item",
        containment: "parent",
        cursor: "move",
        animation: 150,
    });
    
}


$('#sortable').on('sortupdate',function(){
    saveList();
 });


function addItem(){ 
    
};

function editItem(){

};

function checkLength(){
    
};

function deleteItem(){

};


function updateCounter(){
    var itemCount = document.getElementById("sortable").getElementsByClassName("sortable-item").length;
    var counter = document.getElementById("counter");
    counter.innerHTML = itemCount+" ITEMS";
};


function saveList(){
        var listContents = [];
        $("#sortable").each(function(){
            $(".sortable-item").each(function(){
                 listContents.push(this.innerHTML);
            })       
        })
        localStorage.setItem("itemsList", JSON.stringify(listContents));
};


function retrieveList(){
    if (localStorage.getItem("itemsList") !== null){
        var obtainedList = JSON.parse(localStorage.getItem("itemsList"));
        $("#sortable").html("")
        obtainedList.forEach(e => {
            $("#sortable").append("<li class=\"sortable-item\">"+e+"</li>");
        });
    };
};




///////////////////////////////////////////

///$('ul').trigger('sortupdate'); // logs update called.