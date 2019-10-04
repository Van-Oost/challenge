$( document ).ready(function(){
    updateCounter()
    $( "#mainlist" ).sortable({
        items:".listItem",
        axis: "x",
        containment: "parent",
        cursor: "move"
    });
});
    




function editItem(){

};

function checkLength(){
    
}

function deleteItem(){

};


function updateCounter(){
    var itemCount = document.getElementById("mainList").getElementsByClassName("listItem").length;
    var counter= document.getElementById("counter");
    counter.innerHTML = itemCount+" ITEMS";
};


function saveList(){

};


function retrieveList(){

};


